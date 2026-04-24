import Table from "@/components/table/Table";
import type { AccountDebtExpire } from "@/features/account/accountType";
import { selectAccountDebtExpire } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";

const DebtExpire = () => {
  const accountDebtExpire = useAppSelector(selectAccountDebtExpire);
  const debtExpireColumns: Column<AccountDebtExpire>[] = [
    {
      key: "source",
      title: "Nguồn",
      className: "text-left",
      render: (row) => row.source || "-",
    },
    {
      key: "expiredDate",
      title: "Ngày hết hạn",
      className: "text-center",
      render: (row) => row.expiredDate || "-",
    },
    {
      key: "loan",
      title: "Dư nợ gốc",
      className: "text-right",
      render: (row) => numberFormat(row.loan, 0, "-"),
    },
    {
      key: "fee",
      title: "Lãi",
      className: "text-right",
      render: (row) => numberFormat(row.fee, 0, "-"),
    },
  ];
  return (
    <Table
      columns={debtExpireColumns}
      data={accountDebtExpire}
    />
  )

}
export default DebtExpire;