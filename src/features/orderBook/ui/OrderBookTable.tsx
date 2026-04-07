import Table from "@/components/table/Table";
import type { Column } from "@/types";

const columns: Column<any>[] = [
  { key: "market", title: "Sàn", render: (row) => <>{row.market}</> },
  { key: "subAccount", title: "Tiểu khoản", render: (row) => <>{row.subAccount}</> },
  { key: "shl", title: "SHL", render: (row) => <>{row.shl}</> },
  { key: "orderTime", title: "Thời gian đặt", render: (row) => <>{row.orderTime}</> },
  { key: "orderType", title: "Loại lệnh", render: (row) => <>{row.orderType}</> },
  { key: "side", title: "Lệnh", render: (row) => <>{row.side}</> },
  { key: "symbol", title: "Mã CK", render: (row) => <>{row.symbol}</> },
  { key: "price", title: "Giá đặt", render: (row) => <>{row.price}</> },
  { key: "volume", title: "KL đặt", render: (row) => <>{row.volume}</> },
  { key: "orderValue", title: "Giá trị đặt", render: (row) => <>{row.orderValue}</> },
  { key: "matched", title: "Khớp", render: (row) => <>{row.matched}</> },
  { key: "remainingVolume", title: "KL chưa khớp", render: (row) => <>{row.remainingVolume}</> },
  { key: "matchedValue", title: "Giá trị khớp", render: (row) => <>{row.matchedValue}</> },
  { key: "status", title: "Trạng thái lệnh", render: (row) => <>{row.status}</> },
  { key: "qo", title: "Q O", render: (row) => <>{row.qo}</> },
  { key: "co", title: "C O", render: (row) => <>{row.co}</> },
  { key: "mktOrderNo", title: "MKT.Order#", render: (row) => <>{row.mktOrderNo}</> },
  { key: "info", title: "Info", render: (row) => <>{row.info}</> },
];

const OrderBookTable = () => {
  return <div>
    <Table
      columns={columns}
      data={[]}
    />
  </div>;
}
export default OrderBookTable;