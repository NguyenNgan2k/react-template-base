import Table from "@/components/table/Table";
import type { AccountLMV } from "@/features/account/accountType";
import { selectAccountLMV } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";

const AccountLMVTable = () => {
  const accountLMV = useAppSelector(selectAccountLMV);
  const columns: Column<AccountLMV>[] = [
    {
      key: "stock",
      title: "Stock",
      className: "text-left",
      render: (row) => row.s || "-",
    },
    {
      key: "type",
      title: "Type",
      className: "text-left",
      render: (row) => row.t || "-",
    },
    {
      key: "rate",
      title: "Rate",
      className: "text-right",
      render: (row) => (row.p * 100).toFixed(0) + "%",
    },
    {
      key: "wait",
      title: "Wait",
      className: "text-right",
      render: (row) => numberFormat(row.temp, 0, "-"),
    },
    {
      key: "actualVol",
      title: "Actual Vol",
      className: "text-right",
      render: (row) => numberFormat(row.at, 0, "-"),
    },
    {
      key: "mktPrice",
      title: "MKT Price",
      className: "text-right",
      render: (row) => numberFormat(row.mp, 2, "-"),
    },
    {
      key: "limitPrice",
      title: "Limit Price",
      className: "text-right",
      render: (row) => numberFormat(row.lp, 2, "-"),
    },
    {
      key: "lmv0",
      title: "LMV_0",
      className: "text-right",
      render: (row) => numberFormat(row.lmv_0, 0, "-"),
    },
    {
      key: "lmv",
      title: "LMV",
      className: "text-right",
      render: (row) => numberFormat(row.lmv, 0, "-"),
    },
    {
      key: "mr",
      title: "MR",
      className: "text-right",
      render: (row) => numberFormat(row.mr, 0, "-"),
    },
    {
      key: "plg",
      title: "PLG",
      className: "text-right",
      render: (row) => numberFormat(row.plg, 0, "-"),
    },
    {
      key: "percent",
      title: "%P",
      className: "text-right",
      render: (row) => numberFormat(row.pc, 2, "-"),
    },
    {
      key: "note",
      title: "Note",
      className: "text-left",
      render: (row) => row.sector || "-",
    },
  ];

  return (
    <div className="w-full">
      <Table
        columns={columns}
        data={accountLMV}
      />
    </div>
  );
};

export default AccountLMVTable;
