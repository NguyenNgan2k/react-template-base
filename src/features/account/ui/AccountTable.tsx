import Table from "@/components/table/Table";
import type { Column } from "@/types";
import type { AccountList } from "../accountType";

const columns: Column<AccountList>[] = [
  {
    key: "stt",
    title: "STT",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "accountCode",
    title: "Số tài khoản",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "custName",
    title: "Tên khách hàng",
    className: "text-left",
    render: row => <></>
  },
  {
    key: "custType",
    title: "Loại KH",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "branch",
    title: "Chi nhánh",
    className: "text-left",
    render: row => <></>
  },
  {
    key: "phone",
    title: "Số điện thoại",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "email",
    title: "Email",
    className: "text-left",
    render: row => <></>
  },
  {
    key: "marketingId",
    title: "MKT.ID",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "marketingName",
    title: "MKT.Name",
    className: "text-left",
    render: row => <></>
  },
  {
    key: "negotiatorId",
    title: "NGT.ID",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "negotiatorName",
    title: "NGT.Name",
    className: "text-left",
    render: row => <></>
  },
  {
    key: "staffId",
    title: "CTV.ID",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "staffName",
    title: "CTV.Name",
    className: "text-left",
    render: row => <></>
  },
  {
    key: "openingDate",
    title: "Ngày mở",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "status",
    title: "Trạng thái",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "transactionStatus",
    title: "TT giao dịch",
    className: "text-center",
    render: row => <></>
  },
];


const AccountTable = (props: { accounts: AccountList[] }) => {
  return (
    <Table
      columns={columns}
      data={props.accounts}
    />
  );
};

export default AccountTable;
