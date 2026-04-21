import Table from "@/components/table/Table";
import type { AccountLMVUB } from "@/features/account/accountType";
import { selectAccountLMVUB } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";

const AccountLMVUBTable = () => {
  const accountLMVUB = useAppSelector(selectAccountLMVUB);
  const columns: Column<AccountLMVUB["items"][number]>[] = [
    {
      key: "stock",
      title: "Mã CK",
      className: "text-left",
      render: (row) => row.s || "-",
    },
    {
      key: "rate",
      title: "Tỷ lệ",
      className: "text-right",
      render: (row) => row.t || "-",
    },
    {
      key: "actualVol",
      title: "KL thực tế",
      className: "text-right",
      render: (row) => row.ub || "-",
    },
    {
      key: "ubVol",
      title: "KL uỷ ban",
      className: "text-right",
      render: (row) => row.p || "-",
    },
    {
      key: "babenVol",
      title: "KL ba bên",
      className: "text-right",
      render: (row) => numberFormat(row.at, 0, "-"),
    },
    {
      key: "debtVol",
      title: "KL nợ",
      className: "text-right",
      render: (row) => numberFormat(row.inday, 0, "-"),
    },
    {
      key: "calcPrice",
      title: "Giá tính",
      className: "text-right",
      render: (row) => numberFormat(row.total, 2, "-"),
    },
    {
      key: "ceilingPrice",
      title: "Giá chặn trần",
      className: "text-right",
      render: (row) => numberFormat(row.mp, 2, "-"),
    },
    {
      key: "lmv",
      title: "LMV",
      className: "text-right",
      render: (row) => numberFormat(row.lp, 0, "-"),
    },
    {
      key: "mr",
      title: "MR",
      className: "text-right",
      render: (row) => numberFormat(row.lmv, 0, "-"),
    },
    {
      key: "note",
      title: "Note",
      className: "text-left",
      render: (row) => row.eeub || "-",
    },
  ];

  return (
    <div className="w-full">
      <Table
        columns={columns}
        data={accountLMVUB.items}
      />
    </div>
  );
};

export default AccountLMVUBTable;
