import Table, { type MenuParams } from "@/components/table/Table";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { selectOrderBook } from "../redux/orderBookSlice";
import type { OrderBook } from "../orderBookType";
import { numberFormat, StringToDouble } from "@/utils";
import { getStatusOrderName } from "../OrderBookBusiness";
import { useRef, useState } from "react";
import OrderDetail from "@/features/order/ui/modal/OrderDetail";

const columns: Column<OrderBook>[] = [
  {
    key: "group",
    title: "Sàn",
    className: "text-center",
    render: (row) => row.group || "-",
  },
  {
    key: "accountCode",
    title: "Tiểu khoản",
    render: (row) => row.accountCode || "-",
  },
  {
    key: "orderNo",
    title: "SHL",
    className: "text-center",
    render: (row) => row.orderNo || "-",
  },
  {
    key: "orderTime",
    title: "Thời gian đặt",
    className: "text-center",
    render: (row) => row.orderTime || "-",
  },
  {
    key: "side",
    title: "Lệnh",
    className: 'text-center',
    render: (row) =>
      <div
        className={row.side === "B" ? 'text-text-buy' : "text-text-sell"}>
        {row.side === "B" ? 'Mua' : row.side === "S" ? "Bán" : "-"}
      </div>,
  },
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.shareCode || "-",
  },
  {
    key: "price",
    title: "Giá đặt",
    className: "text-right",
    render: (row) => row.orderShowPrice || "-",
  },
  {
    key: "orderVolume",
    title: "KL đặt",
    className: "text-right",
    render: (row) => <>{numberFormat(row.orderVolume, 0, "-")}</>,
  },
  {
    key: "orderValue",
    title: "Giá trị đặt",
    className: "text-right",
    render: (row) => (
      <>
        {numberFormat(
          StringToDouble(row.orderShowPrice) * 1000 * row.orderVolume,
          0,
          "-",
        )}
      </>
    ),
  },
  {
    key: "matchedVolume",
    title: "Khớp",
    className: "text-right",
    render: (row) => <>{numberFormat(row.matchedVolume, 0, "-")}</>,
  },
  {
    key: "unmatchVolume",
    title: "KL chưa khớp",
    className: "text-right",
    render: (row) => <>{numberFormat(row.unmatchVolume, 0, "-")}</>,
  },
  {
    key: "matchedValue",
    title: "Giá trị khớp",
    className: "text-right",
    render: (row) => <>{numberFormat(row.matchedValue, 0, "-")}</>,
  },
  {
    key: "status",
    title: "Trạng thái lệnh",
    className: "text-center",
    render: (row) => getStatusOrderName(row.orderStatus, row.orderVolume, row.matchedVolume),
  },
  {
    key: "q",
    title: "Q",
    className: "text-center",
    tooltip: ['C: Trong core', 'G: Gateway', 'Y: Đã lên sở'],
    render: (row) => row.quoteStatus || "-",
  },
  {
    key: "c",
    title: "C",
    className: "text-center",
    tooltip: ['D: Broker', 'I: Internet', 'M: Mobile'],
    render: (row) => row.chanel || "-",
  },
  {
    key: "marketingId",
    title: "MKT.Order#",
    className: "text-center",
    render: (row) => row.marketingId,
  },
  {
    key: "info",
    title: "Info",
    className: 'min-w-[120px]',
    render: (row) => row.rejectText,
  },
];

const OrderBookTable = () => {
  const orderBook = useAppSelector(selectOrderBook);
  const selectedOrderRef = useRef<OrderBook | null>(null)
  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState<boolean>(false);


  const handleOnClickMenuItem = (menuParams: MenuParams<OrderBook>) => {
    switch (menuParams.id) {
      case "detail":
        selectedOrderRef.current = menuParams.props?.row || null
        setIsOpenOrderDetail(true)
        break;
      case "edit":
        break;
      case "delete":
        break;
    }
  }

  return (
    <div>
      <Table
        classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
        columns={columns}
        data={orderBook}
        menu={[
          { id: 'detail', text: "Chi tiết" },
          { id: 'edit', text: "Sửa lệnh" },
          { id: 'delete', text: "Hủy lệnh" },
        ]}
        onClickMenu={handleOnClickMenuItem}
      />
      {
        selectedOrderRef.current && isOpenOrderDetail &&
        <OrderDetail
          onClose={() => setIsOpenOrderDetail(false)}
          selectedOrder={selectedOrderRef.current}
        />
      }
    </div>
  );
};

export default OrderBookTable;
