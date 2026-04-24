import Descriptions from "@/components/desctiption/Descriptions-v2";
import Table from "@/components/table/Table";
import { selectCustomerInfo } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";

type AuthorizedInfoRow = {
  customerCode: string;
  customerName: string;
  idNo: string;
  issueDate: string;
  issuePlace: string;
  relation: string;
  startDate: string;
  endDate: string;
  content: string;
  signature: string;
};

const AccountInfo = () => {
  const accountInfo = useAppSelector(selectCustomerInfo);
  const accountInfoItems = [
    {
      label: "Họ tên",
      children: accountInfo?.C_CUST_FULL_NAME,
      span: 2,
    },
    {
      label: "CC",
      children: accountInfo?.C_CUSTOMER_PIN,
    },
    {
      label: "Ngày sinh",
      children: accountInfo?.C_CUST_BIRTH_DAY,
    },
    {
      label: "CMT",
      children: accountInfo?.C_CARD_ID,
    },
    {
      label: "Giới tính",
      children: accountInfo?.C_CUST_GENDER === "M" ? "Nam" : "Nữ",
    },
    {
      label: "Ngày cấp",
      children: accountInfo?.C_ID_ISSUE_DATE,
    },
    {
      label: "Nơi cấp",
      children: accountInfo?.C_ID_ISSUE_PLACE,
    },
    {
      label: "Địa chỉ",
      children: accountInfo?.C_CUST_CONTACT_ADDRESS,
    },
    {
      label: "ĐT di động",
      children: accountInfo?.C_CUST_MOBILE
    },
    {
      label: "ĐT cố định",
      children: accountInfo?.C_CUST_TEL,
    },
    {
      label: "Trạng thái",
      children: accountInfo?.C_ACCOUNT_STATUS,
    },
    {
      label: "Email",
      children: accountInfo?.C_CUST_EMAIL,
    },
    {
      label: "Internet",
      children: accountInfo?.C_INTERNET_FLAG ? "Yes" : "No",
    },
    {
      label: "Biểu phí",
      children: accountInfo?.C_POLICY_CODE,
    },
    {
      label: "Tên biểu phí",
      children: accountInfo?.C_POLICY_NAME,
    },
    { label: "UTĐT", children: accountInfo?.C_UTDT_FLAG ? "Yes" : "No" },
    { label: "K FATCA", children: accountInfo?.C_FATCA_FLAG ? "Yes" : "No" },
    {
      label: "Chuyển tiền ĐT",
      children: accountInfo?.C_CASH_TRANSFER_FLAG ? "Yes" : "No",
    },
    {
      label: "Ghi chú",
      children: accountInfo?.C_NOTE,
      span: 3,
    },
  ];

  const authorizedInfoColumns: Column<AuthorizedInfoRow>[] = [
    { key: "customerCode", title: "Mã khách hàng", render: (row) => row.customerCode },
    { key: "customerName", title: "Tên khách hàng", render: (row) => row.customerName },
    { key: "idNo", title: "Số CMT/CCCD", render: (row) => row.idNo },
    { key: "issueDate", title: "Ngày cấp", render: (row) => row.issueDate },
    { key: "issuePlace", title: "Nơi cấp", render: (row) => row.issuePlace },
    { key: "relation", title: "Quan hệ", render: (row) => row.relation },
    { key: "startDate", title: "Ngày bắt đầu", render: (row) => row.startDate },
    { key: "endDate", title: "Ngày hết hạn", render: (row) => row.endDate },
    { key: "content", title: "Nội dung UQ", render: (row) => row.content },
    { key: "signature", title: "Chữ ký", render: (row) => row.signature },
  ];

  const accountLimitedColumns: Column<unknown>[] = [
    { key: "no", title: "STT", render: (row) => <></> },
    { key: "info", title: "Info", render: (row) => <></> },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-3 gap-1 flex flex-col">
          <div>
            <p className="font-bold">Thông tin chủ tài khoản</p>
            <Descriptions column={3} items={accountInfoItems} />
          </div>
          <div>
            <p className="font-bold">Thông tin ủy quyền</p>
            <Table
              columns={authorizedInfoColumns}
              data={[]}
            />
          </div>
        </div>
        <div className="col-span-1">
          <p className="font-bold">Thông tin tài khoản hạn chế</p>
          <Table
            columns={accountLimitedColumns}
            data={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;