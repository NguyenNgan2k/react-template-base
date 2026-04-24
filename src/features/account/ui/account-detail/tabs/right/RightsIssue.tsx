import Table from "@/components/table/Table-v2"
import type { Column } from "@/types"

const RightsIssue = () => {

  const rightIssueColumns: Column<unknown>[] = [
    {
      key: "no",
      title: "STT",
      className: "text-center",
      render: () => <></>
    },
    {
      key: "symbol",
      title: "Mã CK hưởng quyền",
      className: "text-center",
    },
    {
      key: "date",
      title: "Ngày chốt quyền (Ngày ĐKCC)",
      className: "text-center",
    },
    {
      key: "date",
      title: "Thời gian chuyển nhượng",
      className: "text-center",
      children: [
        {
          key: "date",
          title: "Từ ngày",
          className: "text-center",
        },
        {
          key: "date",
          title: "Đến ngày",
          className: "text-center",
        }
      ]
    },
    {
      key: "date",
      title: "	Hạn chót đăng ký",
      className: "text-center",
      children: [
        {
          key: "date",
          title: "Từ ngày",
          className: "text-center",
        },
        {
          key: "date",
          title: "Đến ngày",
          className: "text-center",
        }
      ]
    },
    {
      key: "date",
      title: "Số CK hưởng quyền",
      className: "text-center",
    },
    {
      key: "date",
      title: "Tỷ lệ",
      className: "text-center",
    },
    {
      key: "date",
      title: "Giá mua",
      className: "text-center",
    },
    {
      key: "date",
      title: "Số CK được mua",
      className: "text-center",
    },
    {
      key: "date",
      title: "Số tiền phải nộp",
      className: "text-center",
    },
    {
      key: "date",
      title: "Số CK đã đăng ký mua",
      className: "text-center",
    },
    {
      key: "date",
      title: "Số tiền đã nộp",
      className: "text-center",
    },
    {
      key: "date",
      title: "Trạng thái",
      className: "text-center",
    },
  ]

  return (
    <Table
      columns={rightIssueColumns}
      data={[]}
    />
  )
}

export default RightsIssue