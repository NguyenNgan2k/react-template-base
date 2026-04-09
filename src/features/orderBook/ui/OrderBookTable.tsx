import Table from "@/components/table/Table";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { selectOrderBook } from "../redux/orderBookSlice";
import type { OrderBook } from "../orderBookType";
import { numberFormat, StringToDouble } from "@/utils";

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
    className: "text-center",
    render: (row) => row.side || "-",
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
    render: (row) => row.orderStatus || "-",
  },
  {
    key: "q",
    title: "Q",
    className: "text-center",
    render: (row) => row.quoteStatus || "-",
  },
  {
    key: "c",
    title: "C",
    className: "text-center",
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
    render: (row) => row.rejectText,
  },
];

const OrderBookTable = () => {
  const orderBook = useAppSelector(selectOrderBook);

  return (
    <div>
      <Table columns={columns} data={orderBook} />
    </div>
  );
};

export default OrderBookTable;
