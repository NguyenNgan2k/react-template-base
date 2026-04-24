import type { AccountStatus } from "@/features/account/accountType";
import Table from "@/components/table/Table-v2";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";

const columns: Column<AccountStatus>[] = [
  {
    key: "t2",
    title: "T2",
    className: "text-center",
    children: [
      {
        key: "ap_t2",
        title: "Tiền mua CK",
        className: "text-right",
        render: (row) => numberFormat(row.ap_t2, 0, "-"),
      },
      {
        key: "ar_t2",
        title: "Tiền bán CK",
        className: "text-right",
        render: (row) => numberFormat(row.ar_t2, 0, "-"),
      },
    ]
  },
  {
    key: "t1",
    title: "T1",
    className: "text-center",
    children: [
      {
        key: "ap_t1",
        title: "Tiền mua CK",
        className: "text-right",
        render: (row) => numberFormat(row.ap_t1, 0, "-"),
      },
      {
        key: "ar_t1",
        title: "Tiền bán CK",
        className: "text-right",
        render: (row) => numberFormat(row.ar_t1, 0, "-"),
      },
    ]
  },
  {
    key: "t0",
    title: "T0",
    className: "text-center",
    children: [
      {
        key: "ap_t0",
        title: "Tiền mua CK",
        className: "text-right",
        render: (row) => numberFormat(row.ap_t0, 0, "-"),
      },
      {
        key: "ar_t0",
        title: "Tiền bán CK",
        className: "text-right",
        render: (row) => numberFormat(row.ar_t0, 0, "-"),
      },
    ]
  },
  {
    key: "buy_unmatch",
    title: "Mua CK chưa khớp",
    className: "text-right",
    render: (row) => numberFormat(row.buy_unmatch, 0, "-"),
  },
  {
    key: "sell_unmatch",
    title: "Bán CK chưa khớp",
    className: "text-right",
    render: (row) => numberFormat(row.sell_unmatch, 0, "-"),
  },
  {
    key: "cash_advance_avai",
    title: "Tiền có thể ứng",
    className: "text-right",
    render: (row) => numberFormat(row.cash_advance_avai, 0, "-"),
  },
];

const PaymentValue = (props: { accountStatus: AccountStatus }) => {
  const { accountStatus } = props;

  return (
    <Table
      columns={columns}
      data={[accountStatus]}
    />
  );
}
export default PaymentValue;