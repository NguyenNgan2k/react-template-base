import { usePerfectScrollbar } from "@/hooks/usePerfectScrollbar.ts";
import type { Column } from "@/types";
import clsx from "clsx";
import { TbTooltip } from "react-icons/tb";
import { Tooltip } from 'react-tooltip'
import { Menu, Item, useContextMenu, type ItemParams } from 'react-contexify';
import { useHeaderRows } from "./hook/useHeaderRows";
import { useLeafColumns } from "./hook/useLeafColumns";

type ContextMenuItem = {
  id: string,
  text: string,
}

export type MenuProps<T> = {
  row: T
}

export type MenuParams<T> = ItemParams<MenuProps<T>>


export type TableProps<T> = {
  columns: Column<T>[];
  data: T[] | null;
  classWrapper?: string;
  classTable?: string;
  menu?: ContextMenuItem[]
  onClickMenu?: (e: MenuParams<T>) => void
}


export default function Table<T>({ columns, data, classWrapper, classTable, menu, onClickMenu }: TableProps<T>) {
  const { containerRef } = usePerfectScrollbar();
  const { show } = useContextMenu({ id: 'table' });

  function handleContextMenu(event: React.MouseEvent<HTMLElement>, row: T) {
    event.preventDefault();
    show({
      event,
      props: { row: row }
    })
  }
  const headerRows = useHeaderRows(columns)
  const leafColumns = useLeafColumns(columns)

  return (
    <div ref={containerRef} className={classWrapper}>
      <table className={classTable} >
        <thead>
          {
            headerRows.map((row) => (
              <tr>
                {
                  row.map((column) => (
                    <th key={column.key} colSpan={column.colSpan} rowSpan={column.rowSpan}>
                      {!column.tooltip && column.title}
                      {column.tooltip && (
                        <div className="flex gap-1 justify-center">
                          {column.title}
                          <TbTooltip className={clsx(
                            "cursor-pointer",
                            column.title
                          )} />
                          <Tooltip anchorSelect={`.${column.title}`}>
                            <ul className="m-0 p-0" style={{ listStyle: 'none' }}>
                              {column.tooltip.map((item) => (
                                <li>{item}</li>
                              ))}
                            </ul>
                          </Tooltip>
                        </div>
                      )}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 border-none">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data?.map((row, idx) => (
              <tr key={idx} onContextMenu={(e) => handleContextMenu(e, row)}>
                {leafColumns.map(column => (
                  <td key={column.key} className={column.className}>
                    {column.render ? column.render(row) : (row as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {
        menu && (
          <Menu id="table">
            {
              menu?.map((item) => (
                <Item
                  id={item.id}
                  onClick={onClickMenu}
                >
                  {item.text}</Item>
              ))
            }
          </Menu>
        )
      }
    </div>
  );
}
