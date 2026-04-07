import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";
import { memo, useEffect, useState } from "react";

import { formatPrice, getOrderOvertime, numberFormat } from "@/utils";
import { usePrevious } from "../../../hooks/usePrevious";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { selectAccountProfile } from "../../../store/slices/client/selector";
import {
  selectListOrdersOvertime,
  selectListOrdersOvertimeStatus,
} from "../../../store/slices/place-order/selector";
import { fetchListOrdersOvertimeRequest } from "../../../store/slices/place-order/slice";
import OrderTableSkeleton from "./OrderTableSkeleton";

type Order = {
  orderId: number;
  time: string | number;
  side: string;
  symbol: string;
  price: string;
  volume: string;
  total: string;
  status: string;
  statusId: string;
};

function OrderHisOvertime() {
  const dispatch = useAppDispatch();

  const listOrdersOvertime = useAppSelector(selectListOrdersOvertime);
  const { loading } = useAppSelector(selectListOrdersOvertimeStatus);
  const accountProfile = useAppSelector(selectAccountProfile);

  const [tableData, setTableData] = useState<Order[]>([]);

  const preListOrdersOvertime = usePrevious(listOrdersOvertime);

  useEffect(() => {
    if (!accountProfile || !accountProfile?.cAccountDefault) return;

    dispatch(
      fetchListOrdersOvertimeRequest({
        accountCode: accountProfile?.cAccountDefault || "",
      })
    );
  }, [accountProfile, dispatch]);

  useEffect(() => {
    if (
      !listOrdersOvertime ||
      _.isEqual(listOrdersOvertime, preListOrdersOvertime) ||
      listOrdersOvertime.length < 0
    )
      return;

    const tableData = listOrdersOvertime.map((item) => ({
      orderId: item.pkFrontAutoOrder,
      time: new Date(item.sendTime).toLocaleTimeString(), // convert timestamp -> HH:MM:SS
      side: item.side === "B" ? "Mua" : "Bán",
      symbol: item.shareCode,
      price: formatPrice(item.processPrice),
      volume: numberFormat(item.orderVolume, 0, "-"),
      total: numberFormat(item.processPrice * item.orderVolume, 0, "-"),
      status: getOrderOvertime(item.orderStatus),
      statusId: item.orderStatus + "",
    }));

    setTableData(tableData);
  }, [listOrdersOvertime, preListOrdersOvertime]);

  const columns: ColumnDef<Order>[] = [
    {
      header: "LOẠI LỆNH",
      columns: [
        { header: "Order ID", accessorKey: "orderId" },
        { header: "Thời gian đặt", accessorKey: "time" },
        { header: "Lệnh", accessorKey: "side" },
        { header: "Mã", accessorKey: "symbol" },
      ],
    },
    {
      header: "CHI TIẾT LỆNH",
      columns: [
        { header: "Giá đặt", accessorKey: "price" },
        { header: "KL đặt", accessorKey: "volume" },
        { header: "Giá trị đặt (₫)", accessorKey: "total" },
        { header: "Trạng thái", accessorKey: "status" },
      ],
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <OrderTableSkeleton />;
  }

  return (
    <div className="w-full h-full overflow-auto rounded-md text-text-title text-xs">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-background-primary">
          {/* --- Hàng đầu: nhóm header --- */}
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr
              key={headerGroup.id}
              className={index === 0 ? "mb-2.5" : "h-10 "}
            >
              {headerGroup.headers.map((header) => {
                const headerText = String(header.column.columnDef.header);
                const groupClass =
                  headerText === "LOẠI LỆNH"
                    ? "bg-surface text-text-title text-xs font-medium rounded-md h-6"
                    : headerText === "CHI TIẾT LỆNH"
                    ? "bg-surface text-text-title text-xs font-medium rounded-md h-6"
                    : headerText === "THAO TÁC"
                    ? "bg-surface text-text-title text-xs font-medium rounded-md h-6"
                    : "";

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border-none px-2 py-1 text-center`}
                  >
                    <div
                      className={`${groupClass} flex items-center justify-center`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {!listOrdersOvertime || listOrdersOvertime.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-text-subtitle py-2">
                Không có dữ liệu!
              </td>
            </tr>
          ) : (
            <>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className=" hover:bg-surface">
                  {row.getVisibleCells().map((cell) => {
                    const accessorKey = (
                      cell.column.columnDef as { accessorKey?: keyof Order }
                    )?.accessorKey;
                    const value = cell.getValue();

                    let customClass = "";

                    switch (accessorKey) {
                      case "side":
                        customClass =
                          value === "Mua"
                            ? "text-green-400 font-semibold"
                            : "text-red-400 font-semibold";
                        break;

                      case "status":
                        customClass = "orderStt_" + row.original.statusId;
                        break;

                      default:
                        break;
                    }

                    return (
                      <td
                        key={cell.id}
                        className={`px-2 h-9 text-center ${customClass}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(OrderHisOvertime);
