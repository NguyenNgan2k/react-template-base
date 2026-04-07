import { usePerfectScrollbar } from "@/hooks/usePerfectScrollbar.ts";
import type { Column } from "@/types";

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  classWrapper?: string;
  classTable?: string;
}

export default function Table<T>({ columns, data, classWrapper, classTable }: TableProps<T>) {
  const { containerRef } = usePerfectScrollbar();
  return (
    <div ref={containerRef} className={classWrapper}>
      <table className={"table w-full " + classTable} >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 border-none">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col.key} className={col.className}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
