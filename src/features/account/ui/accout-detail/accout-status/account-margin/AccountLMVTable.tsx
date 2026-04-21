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
      render: (row) => row.stock || "-",
    },
    {
      key: "type",
      title: "Type",
      className: "text-left",
      render: (row) => row.type || "-",
    },
    {
      key: "rate",
      title: "Rate",
      className: "text-right",
      render: (row) => numberFormat(row.rate, 2, "-"),
    },
    {
      key: "wait",
      title: "Wait",
      className: "text-right",
      render: (row) => numberFormat(row.wait, 0, "-"),
    },
    {
      key: "actualVol",
      title: "Actual Vol",
      className: "text-right",
      render: (row) => numberFormat(row.actualVol, 0, "-"),
    },
    {
      key: "mktPrice",
      title: "MKT Price",
      className: "text-right",
      render: (row) => numberFormat(row.mktPrice, 2, "-"),
    },
    {
      key: "limitPrice",
      title: "Limit Price",
      className: "text-right",
      render: (row) => numberFormat(row.limitPrice, 2, "-"),
    },
    {
      key: "lmv0",
      title: "LMV_0",
      className: "text-right",
      render: (row) => numberFormat(row.lmv0, 0, "-"),
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
      render: (row) => numberFormat(row.percent, 2, "-"),
    },
    {
      key: "note",
      title: "Note",
      className: "text-left",
      render: (row) => row.note || "-",
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
