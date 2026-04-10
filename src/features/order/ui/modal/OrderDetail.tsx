import ModalLayout from "@/components/layout/ModalLayout";
import Table from "@/components/table/Table";
import type { OrderBook } from "@/features/orderBook/orderBookType";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";
import { useEffect } from "react";
import { fetchOrderDetailRequest, selectOrderDetail } from "../../redux/orderSlice";
import type { OrderDetail } from "@/features/order/orderType";

type OrderDetailProps = {
  selectedOrder: OrderBook
  onClose: () => void
}

const columns: Column<OrderBook>[] = [
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
    key: "orderNo",
    title: "SHL",
    className: "text-center",
    render: (row) => row.orderNo || "-",
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
    key: "accountCode",
    title: "Tiểu khoản",
    render: (row) => row.accountCode || "-",
  },
  {
    key: "orderTime",
    title: "Thời gian đặt",
    className: "text-center",
    render: (row) => row.orderTime || "-",
  },
  {
    key: "marketingId",
    title: "MKT.Order#",
    className: "text-center",
    render: (row) => row.marketingId,
  },
  {
    key: "c",
    title: "C",
    className: "text-center",
    tooltip: ['D: Broker', 'I: Internet', 'M: Mobile'],
    render: (row) => row.chanel || "-",
  },
  {
    key: "info",
    title: "Info",
    className: 'min-w-[120px]',
    render: (row) => row.rejectText,
  },
]

const columnsOrderInsert: Column<OrderDetail>[] = [
  {
    key: "ao",
    title: "A/O",
    className: 'text-center',
    render: (row) => <></>
  },
  {
    key: "ao",
    title: "KL khớp",
    className: 'text-center',
    render: (row) => <></>
  },
  {
    key: "side",
    title: "Loại lệnh",
    className: 'text-center',
    render: (row) => <></>
  },
  {
    key: "info",
    title: "Thông tin",
    className: 'text-center',
    render: (row) => <></>
  },
]

const columnsOrderMatched: Column<OrderDetail>[] = [
  {
    key: "ao",
    title: "Thời gian",
    className: 'text-center',
    render: (row) => <></>
  },
  {
    key: "ao",
    title: "Khối lượng",
    className: 'text-center',
    render: (row) => <></>
  },
  {
    key: "ao",
    title: "Giá",
    className: 'text-center',
    render: (row) => <></>
  },
  {
    key: "ao",
    title: "GHí chú",
    render: (row) => <></>
  },
]

const OrderDetailModal = (props: OrderDetailProps) => {
  const dispatch = useAppDispatch()
  const orderDetail = useAppSelector(selectOrderDetail)
  let orderInsert: OrderDetail[] | null = null
  let orderMatched: OrderDetail[] | null = null

  useEffect(() => {
    if (!props.selectedOrder) return;
    dispatch(fetchOrderDetailRequest(props.selectedOrder.pkFrontOrder))
  }, [])

  useEffect(() => {
    orderInsert = orderDetail?.filter((o: OrderDetail) => o.type === 'INSERT') || null;
    orderMatched = orderDetail?.filter((o: OrderDetail) => o.type === 'MATCHED') || null;
  }, [orderDetail])

  return (
    <ModalLayout
      title="Chi tiết lệnh"
      onClose={props.onClose}
      classContent='w-[1000px]'
    >
      <Table
        classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
        columns={columns}
        data={[props.selectedOrder]}
      />
      <div className="grid grid-cols-2 gap-1">
        <div>
          {/* table tt nhân viên đặt lệnh */}
        </div>
        <div>
          <Table
            classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
            columns={columns}
            data={orderInsert}
          />
          <Table
            classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
            columns={columns}
            data={orderMatched}
          />
        </div>
      </div>
    </ModalLayout>
  )
}
export default OrderDetailModal;  
