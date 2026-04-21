import Table from "@/components/table/Table";
import type { Column } from "@/types";
import type { TradingStock } from "../../stockListType";

const normalizeBoolean = (value: string | boolean | undefined) => {
  if (typeof value === "boolean") {
    return value ? "Có" : "Không";
  }

  if (value === undefined || value === null || value === "") {
    return "-";
  }

  return value;
};

const columns: Column<TradingStock>[] = [
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.symbol || "-",
  },
  {
    key: "board",
    title: "Bảng",
    className: "text-center",
    render: (row) => row.board || "-",
  },
  {
    key: "ceilingPrice",
    title: "Trần",
    className: "text-right",
    render: (row) => row.ceilingPrice || "-",
  },
  {
    key: "referencePrice",
    title: "Tham chiếu",
    className: "text-right",
    render: (row) => row.referencePrice || "-",
  },
  {
    key: "floorPrice",
    title: "Sàn",
    className: "text-right",
    render: (row) => row.floorPrice || "-",
  },
  {
    key: "isTradeBlocked",
    title: "Có chặn giao dịch",
    className: "text-center",
    render: (row) => normalizeBoolean(row.isTradeBlocked),
  },
  {
    key: "blockCustomerBuy",
    title: "Chặn KH mua",
    className: "text-center",
    render: (row) => normalizeBoolean(row.blockCustomerBuy),
  },
  {
    key: "blockCustomerSell",
    title: "Chặn KH bán",
    className: "text-center",
    render: (row) => normalizeBoolean(row.blockCustomerSell),
  },
  {
    key: "blockProprietaryBuy",
    title: "Chặn tự doanh mua",
    className: "text-center",
    render: (row) => normalizeBoolean(row.blockProprietaryBuy),
  },
  {
    key: "blockProprietarySell",
    title: "Chặn tự doanh bán",
    className: "text-center",
    render: (row) => normalizeBoolean(row.blockProprietarySell),
  },
  {
    key: "adminStatus",
    title: "Admin status",
    className: "text-center",
    render: (row) => row.adminStatus || "-",
  },
  {
    key: "methodStatus",
    title: "Method status",
    className: "text-center",
    render: (row) => row.methodStatus || "-",
  },
  {
    key: "tradingStatus",
    title: "Trạng thái giao dịch",
    className: "text-center",
    render: (row) => row.tradingStatus || "-",
  },
];

const TradingTable = (props: { tradingStocks: TradingStock[] }) => {
  return (
    <Table<TradingStock>
      classWrapper="h-[calc(100vh-140px)] overflow-auto"
      columns={columns}
      data={props.tradingStocks}
    />
  );
};

export default TradingTable;