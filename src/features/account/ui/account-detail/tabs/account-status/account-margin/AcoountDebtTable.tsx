import Table from "@/components/table/Table";
import type { AccountDebt } from "@/features/account/accountType";
import { selectAccountDebt } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";

const AccountDebtTable = () => {
  const accountDebt = useAppSelector(selectAccountDebt);
  const columns: Column<AccountDebt>[] = [
    {
      key: "source",
      title: "Nguồn",
      className: "text-left",
      render: (row) => row.source || "-",
    },
    {
      key: "limit",
      title: "Hạn mức",
      className: "text-right",
      render: (row) => numberFormat(row.limit, 0, "-"),
    },
    {
      key: "borrowed",
      title: "Đã vay",
      className: "text-right",
      render: (row) => numberFormat(row.loan, 0, "-"),
    },
    {
      key: "interest",
      title: "Lãi",
      className: "text-right",
      render: (row) => numberFormat(row.fee, 0, "-"),
    },
  ];

  return (
    <div className="w-full">
      <Table
        columns={columns}
        data={accountDebt}
      />
    </div>
  );
};

export default AccountDebtTable;
