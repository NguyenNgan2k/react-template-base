import Table from "@/components/table/Table";
import type { AccountLMVEE } from "@/features/account/accountType";
import { selectAccountLMVEE } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";

const AccountLMVEETable = () => {
  const accountLMVEE = useAppSelector(selectAccountLMVEE);
  const columns: Column<AccountLMVEE>[] = [
    {
      key: "stock",
      title: "Mã CK",
      className: "text-left",
      render: (row) => row.stock || "-",
    },
    {
      key: "type",
      title: "Loại",
      className: "text-left",
      render: (row) => row.type || "-",
    },
    {
      key: "ub",
      title: "UB",
      className: "text-right",
      render: (row) => numberFormat(row.ub, 0, "-"),
    },
    {
      key: "marginRate",
      title: "TL ký quỹ",
      className: "text-right",
      render: (row) => numberFormat(row.marginRate, 2, "-"),
    },
    {
      key: "ownedVol",
      title: "KL đã có",
      className: "text-right",
      render: (row) => numberFormat(row.ownedVol, 0, "-"),
    },
    {
      key: "pendingVol",
      title: "KL chờ khớp",
      className: "text-right",
      render: (row) => numberFormat(row.pendingVol, 0, "-"),
    },
    {
      key: "totalVol",
      title: "KL tổng",
      className: "text-right",
      render: (row) => numberFormat(row.totalVol, 0, "-"),
    },
    {
      key: "calcPrice",
      title: "Giá tính",
      className: "text-right",
      render: (row) => numberFormat(row.calcPrice, 2, "-"),
    },
    {
      key: "ceilingPrice",
      title: "Giá chặn",
      className: "text-right",
      render: (row) => numberFormat(row.ceilingPrice, 2, "-"),
    },
    {
      key: "lmvUB",
      title: "LMV UB",
      className: "text-right",
      render: (row) => numberFormat(row.lmvUB, 0, "-"),
    },
    {
      key: "eeUB",
      title: "EE UB",
      className: "text-right",
      render: (row) => numberFormat(row.eeUB, 0, "-"),
    },
  ];

  return (
    <div className="w-full">
      <Table
        columns={columns}
        data={accountLMVEE}
      />
    </div>
  );
};

export default AccountLMVEETable;
