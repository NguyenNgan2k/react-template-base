import Table from "@/components/table/Table";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";
import type { HaltStock } from "../../stockListType";

const columns: Column<HaltStock>[] = [
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.symbol || "-",
  },
  {
    key: "issuerName",
    title: "Tên TCPH",
    render: (row) => row.issuerName || "-",
  },
  {
    key: "market",
    title: "Sàn",
    className: "text-center",
    render: (row) => row.market || "-",
  },
  {
    key: "stockType",
    title: "Loại CK",
    className: "text-center",
    render: (row) => row.stockType || "-",
  },
  {
    key: "listedVolume",
    title: "KL niêm yết",
    className: "text-right",
    render: (row) => numberFormat(row.listedVolume, 0, "-"),
  },
  {
    key: "returnedTradingDate",
    title: "Ngày giao dịch Sở trả",
    className: "text-center",
    render: (row) => row.returnedTradingDate || "-",
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
    key: "closePrice",
    title: "Giá đóng cửa",
    className: "text-right",
    render: (row) => row.closePrice || "-",
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

const HaltTable = (props: { haltStocks: HaltStock[] }) => {
  return (
    <Table<HaltStock>
      classWrapper="h-[calc(100vh-140px)] overflow-auto"
      columns={columns}
      data={props.haltStocks}
    />
  );
};

export default HaltTable;