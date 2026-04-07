import Table from "@/components/table/Table"
import type { Column } from "@/types";


const columns: Column<unknown>[] = [
  {
    key: "symbol",
    title: "Mã CK",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Tổng",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Khả dụng",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Quyền",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "T2 Mua",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "T2 Bán",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "T1 Mua",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "T1 Bán",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "T0 Mua",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "T0 Bán",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Giá TB",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Giá trị",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Giá TT",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "Lãi/Lỗ",
    render: (row) => <></>
  },
  {
    key: "symbol",
    title: "%",
    render: (row) => <></>
  },
];

const Portfolio = () => {
  return (
    <div className="h-[140px]">
      <Table
        columns={columns}
        data={[]}
      />
    </div>
  )
}
export default Portfolio