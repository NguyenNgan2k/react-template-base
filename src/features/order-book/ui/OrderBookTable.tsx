import Table, { type MenuParams } from "@/components/table/Table";
import type { Column } from "@/types";
import type { OrderBook } from "../orderBookType";
import { numberFormat, StringToDouble } from "@/utils";
import { getStatusOrderName } from "../OrderBookBusiness";
import { useRef, useState } from "react";
import OrderDetailModal from "@/features/order/ui/modal/OrderDetail";
import OrderEditModal from "@/features/order/ui/modal/OrderEdit";
import OrderCancelModal from "@/features/order/ui/modal/OrderCancel";
import type { OrderDetail } from "@/features/order/orderType";
import { mapOrderDetail } from "@/utils/mapOrderDetail";


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

const OrderBookTable = (props: { orderBooks: OrderBook[] | null }) => {
  const selectedOrderRef = useRef<OrderDetail | null>(null)
  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState<boolean>(false);
  const [isOpenOrderEdit, setIsOpenOrderEdit] = useState<boolean>(false);
  const [isOpenOrderCancel, setIsOpenOrderCancel] = useState<boolean>(false);

  const handleOnClickMenuItem = (menuParams: MenuParams<OrderBook>) => {
    if (!menuParams?.props || !menuParams?.props.row) return

    switch (menuParams.id) {
      case "detail":
        selectedOrderRef.current = mapOrderDetail(menuParams.props.row)
        setIsOpenOrderDetail(true)
        break;
      case "edit":
        selectedOrderRef.current = mapOrderDetail(menuParams.props.row)
        setIsOpenOrderEdit(true)
        break;
      case "cancel":
        selectedOrderRef.current = mapOrderDetail(menuParams.props.row)
        setIsOpenOrderCancel(true)
        break;
    }
  }

  return (
    <div>
      <Table<OrderBook>
        classWrapper="h-[calc(100vh-140px)] overflow-auto"
        columns={columns}
        data={props.orderBooks}
        menu={[
          { id: 'detail', text: "Chi tiết" },
          { id: 'edit', text: "Sửa lệnh" },
          { id: 'cancel', text: "Hủy lệnh" },
        ]}
        onClickMenu={handleOnClickMenuItem}
      />
      {
        selectedOrderRef.current && isOpenOrderDetail &&
        <OrderDetailModal
          onClose={() => setIsOpenOrderDetail(false)}
          selectedOrder={selectedOrderRef.current}
        />
      }
      {
        selectedOrderRef.current && isOpenOrderEdit &&
        <OrderEditModal
          onClose={() => setIsOpenOrderEdit(false)}
          selectedOrder={selectedOrderRef.current}
        />
      }
      {
        selectedOrderRef.current && isOpenOrderCancel &&
        <OrderCancelModal
          onClose={() => setIsOpenOrderCancel(false)}
          selectedOrder={selectedOrderRef.current}
        />
      }
    </div>
  );
};

export default OrderBookTable;
