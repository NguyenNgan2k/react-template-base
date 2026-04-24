import Table from "@/components/table/Table-v2"
import type { Column } from "@/types"

const DividendRights = () => {

  const dividendRightColumns: Column<unknown>[] = [
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
      title: "Số CK hưởng quyền",
      className: "text-center",
    },
    {
      key: "date",
      title: "Quyền cổ tức bằng tiền",
      className: "text-center",
      children: [
        {
          key: "date",
          title: "Tỷ lệ",
          className: "text-center",
        },
        {
          key: "date",
          title: "Số tiền được nhận",
          className: "text-center",
        },
      ]
    },
    {
      key: "date",
      title: "Quyền cổ tức bằng chứng khoán / chứng khoán thưởng",
      className: "text-center",
      children: [
        {
          key: "date",
          title: "Tỷ lệ",
          className: "text-center",
        },
        {
          key: "date",
          title: "Mã CK được nhận/ được mua",
          className: "text-center",
        },
        {
          key: "date",
          title: "Số CK được nhận",
          className: "text-center",
        },
      ]
    },
    {
      key: "date",
      title: "Ngày chốt quyền (Ngày ĐKCC)",
      className: "text-center",
    },
    {
      key: "date",
      title: "Ngày thực hiện",
      className: "text-center",
    },
    {
      key: "date",
      title: "Ngày giao dịch",
      className: "text-center",
    },
  ]

  return (
    <Table
      columns={dividendRightColumns}
      data={[]}
    />
  )
}

export default DividendRights