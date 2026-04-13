import Table, { type MenuParams } from "@/components/table/Table";
import type { OrderBook } from "@/features/orderBook/orderBookType";
import { useAppSelector } from "@/store/hook";
import type { Column } from "@/types";
import { numberFormat } from "@/utils";
import { useRef } from "react";
import { selectAdvertisement } from "../../redux/putthroughSlice";

const columns: Column<OrderBook>[] = [
  {
    key: "g",
    title: "G",
    className: "text-center",
    render: (row) => row.group || "-",
  },
  {
    key: "orderNo",
    title: "SHL",
    className: "text-center",
    render: (row) => row.orderNo || "-",
  },
  {
    key: "orderTime",
    title: "Thời gian đặt",
    className: "text-center",
    render: (row) => row.orderTime || "-",
  },
  {
    key: "bs",
    title: "BS",
    className: 'text-center',
    render: (row) =>
      <div
        className={row.side === "B" ? 'text-text-buy' : "text-text-sell"}>
        {row.side === "B" ? 'Mua' : row.side === "S" ? "Bán" : "-"}
      </div>,
  },
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.shareCode || "-",
  },
  {
    key: "price",
    title: "Giá đặt",
    className: "text-right",
    render: (row) => row.orderShowPrice || "-",
  },
  {
    key: "matchedVolume",
    title: "KL khớp",
    className: "text-right",
    render: (row) => <>{numberFormat(row.matchedVolume, 0, "-")}</>,
  },
  {
    key: "unmatchVolume",
    title: "KL chưa khớp",
    className: "text-right",
    render: (row) => <>{numberFormat(row.unmatchVolume, 0, "-")}</>,
  },
  {
    key: "matchedValue",
    title: "Giá trị khớp",
    className: "text-right",
    render: (row) => <>{numberFormat(row.matchedValue, 0, "-")}</>,
  },
  // {
  //   key: "account",
  //   title: "Tài khoản",
  //   className: "text-right",
  //   render: (row) => row.account,
  // },
  // {
  //   key: "os",
  //   title: "OS",
  //   className: "text-right",
  //    tooltip: ['P: Chờ xác nhận', 'PM: Đã khớp', 'PX,PXX: Từ chối/Hủy'],
  //   render: (row) => row.account,
  // },
  {
    key: "q",
    title: "Q",
    className: "text-center",
    tooltip: ['C: Trong core', 'G: Gateway', 'Y: Đã lên sở'],
    render: (row) => row.quoteStatus || "-",
  },
  {
    key: "c",
    title: "C",
    className: "text-center",
    tooltip: ['D: Broker', 'I: Internet', 'M: Mobile'],
    render: (row) => row.chanel || "-",
  },
  {
    key: "marketingId",
    title: "MKT.Order#",
    className: "text-center",
    render: (row) => row.marketingId,
  },
  {
    key: "centerNo",
    title: "centerNo",
    className: "text-center",
    render: (row) => row.marketingId,
  },
  {
    key: "info",
    title: "Info",
    className: 'min-w-[120px]',
    render: (row) => row.rejectText,
  },
];

const AdvertisementTable = () => {
  const advertisement = useAppSelector(selectAdvertisement);
  const selectedOrderRef = useRef<OrderBook | null>(null)

  const handleOnClickMenuItem = (menuParams: MenuParams<OrderBook>) => {
    switch (menuParams.id) {
      case "detail":
        selectedOrderRef.current = menuParams.props?.row || null
        break;
    }
  }

  return (
    <div>
      <Table
        classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
        columns={columns}
        data={[]}
        menu={[
          { id: 'detail', text: "Chi tiết lệnh" },
          { id: 'convert', text: "Covert to order" },
          { id: 'cancel', text: "Hủy lệnh" },
        ]}
        onClickMenu={handleOnClickMenuItem}
      />
    </div>
  );
};

export default AdvertisementTable;
