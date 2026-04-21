import Table from "@/components/table/Table";
import type { Column } from "@/types";
import type { Advertisement } from "../../putthroughType";

const columns: Column<Advertisement>[] = [
  {
    key: "g",
    title: "G",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "orderNo",
    title: "SHL",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "orderTime",
    title: "Thời gian đặt",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "bs",
    title: "BS",
    className: 'text-center',
    render: row => <></>
  },
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "price",
    title: "Giá đặt",
    className: "text-right",
    render: row => <></>
  },
  {
    key: "matchedVolume",
    title: "KL khớp",
    className: "text-right",
    render: row => <></>
  },
  {
    key: "unmatchVolume",
    title: "KL chưa khớp",
    className: "text-right",
    render: row => <></>
  },
  {
    key: "matchedValue",
    title: "Giá trị khớp",
    className: "text-right",
    render: row => <></>
  },
  {
    key: "account",
    title: "Tài khoản",
    className: "text-right",
    render: row => <></>
  },
  {
    key: "os",
    title: "OS",
    className: "text-right",
    tooltip: ['P: Chờ xác nhận', 'PM: Đã khớp', 'PX,PXX: Từ chối/Hủy'],
    render: row => <></>
  },
  {
    key: "q",
    title: "Q",
    className: "text-center",
    tooltip: ['C: Trong core', 'G: Gateway', 'Y: Đã lên sở'],
    render: row => <></>
  },
  {
    key: "c",
    title: "C",
    className: "text-center",
    tooltip: ['D: Broker', 'I: Internet', 'M: Mobile'],
    render: row => <></>
  },
  {
    key: "marketingId",
    title: "MKT.Order#",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "centerNo",
    title: "centerNo",
    className: "text-center",
    render: row => <></>
  },
  {
    key: "info",
    title: "Info",
    className: 'min-w-[120px]',
    render: row => <></>
  },
];

const AdvertisementTable = (props: { advertisements: Advertisement[] }) => {
  return (
    <div>
      <Table
        classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
        columns={columns}
        data={props.advertisements}
      />
    </div>
  );
};

export default AdvertisementTable;
