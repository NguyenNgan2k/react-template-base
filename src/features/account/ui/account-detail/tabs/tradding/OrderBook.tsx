import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table, { type MenuParams } from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToInt, numberFormat } from "@/utils";
import { useEffect, useRef, useState } from "react";
import type { AccountOrderBook } from "../../../../accountType";
import {
  fetchAccountOrderBookRequest,
  selectAccountOrderBook,
  selectAccountSelected,
} from "../../../../redux/accountSlice";
import { getStatusOrderName } from "@/features/order-book/OrderBookBusiness";
import OrderDetailModal from "@/features/order/ui/modal/OrderDetail";
import OrderEditModal from "@/features/order/ui/modal/OrderEdit";
import OrderCancelModal from "@/features/order/ui/modal/OrderCancel";
import type { OrderDetail } from "@/features/order/orderType";
import { mapOrderDetail } from "@/utils/mapOrderDetail";

const columns: Column<AccountOrderBook>[] = [
  {
    key: "market",
    title: "Sàn",
    className: "text-center",
    render: (row) => row.group || "-",
  },
  {
    key: "orderTime",
    title: "Thời gian đặt",
    className: "text-center",
    render: (row) => row.orderTime || "-",
  },
  {
    key: "orderNo",
    title: "SHL",
    className: "text-center",
    render: (row) => row.orderNo || "-",
  },
  {
    key: "orderType",
    title: "Loại lệnh",
    className: "text-center",
    render: (row) => row.side === 'B' ? 'Mua' : 'Bán',
  },
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.shareCode || "-",
  },
  {
    key: "orderPrice",
    title: "Giá đặt",
    className: "text-right",
    render: (row) => row.orderShowPrice || "-",
  },
  {
    key: "orderVolume",
    title: "KL đặt",
    className: "text-right",
    render: (row) => numberFormat(row.orderVolume, 0, "-"),
  },
  {
    key: "orderValue",
    title: "Giá trị đặt",
    className: "text-right",
    render: (row) => numberFormat(Number(row.orderShowPrice || 0) * 1000 * row.orderVolume, 0, "-"),
  },
  {
    key: "matchedVolume",
    title: "KL khớp",
    className: "text-right",
    render: (row) => numberFormat(row.matchedVolume, 0, "-"),
  },
  {
    key: "unmatchVolume",
    title: "KL chưa khớp",
    className: "text-right",
    render: (row) => numberFormat(row.unmatchVolume, 0, "-"),
  },
  {
    key: "matchedValue",
    title: "Giá trị khớp",
    className: "text-right",
    render: (row) => numberFormat(row.matchedValue, 0, "-"),
  },
  {
    key: "orderStatus",
    title: "Trạng thái lệnh",
    className: "text-center",
    render: (row) => getStatusOrderName(row.orderStatus, row.orderVolume, row.matchedVolume),
  },
  {
    key: "quoteStatus",
    title: "Q",
    className: "text-center",
    render: (row) => row.quoteStatus || "-",
  },
  {
    key: "channel",
    title: "Kênh đặt",
    className: "text-center",
    render: (row) => row.chanel || "-",
  },
  {
    key: "marketingOrderNo",
    title: "MKT.Order#",
    className: "text-center",
    render: (row) => row.marketingOrder || "-",
  },
  {
    key: "info",
    title: "Thông tin",
    render: (row) => row.rejectText || "-",
  },
];

const OrderBook = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const accountOrderBooks = useAppSelector(selectAccountOrderBook);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 20,
  });
  const orderSelectedRef = useRef<OrderDetail | null>(null)
  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState<boolean>(false);
  const [isOpenOrderEdit, setIsOpenOrderEdit] = useState<boolean>(false);
  const [isOpenOrderCancel, setIsOpenOrderCancel] = useState<boolean>(false);
  const lastRequestKeyRef = useRef<string>("");

  useEffect(() => {
    if (!accountSelected) return;
    const requestKey = `${accountSelected}_${pagination.page}_${pagination.size}`;
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;
    dispatch(fetchAccountOrderBookRequest({ account: accountSelected, data: { ...pagination } }));
  }, [accountSelected, pagination.page, pagination.size]);

  const handleNextPage = (page: number) => {
    if (page < 1) return;
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSetSize = (size: number) => {
    setPagination((prev) => ({
      ...prev,
      size,
      page: 1,
    }));
  };

  const handleOnClickMenuItem = (menuParams: MenuParams<AccountOrderBook>) => {
    if (!menuParams?.props || !menuParams?.props.row) return

    switch (menuParams.id) {
      case "detail":
        orderSelectedRef.current = mapOrderDetail(menuParams.props.row)
        setIsOpenOrderDetail(true)
        break;
      case "edit":
        orderSelectedRef.current = mapOrderDetail(menuParams.props.row)
        setIsOpenOrderEdit(true)
        break;
      case "cancel":
        orderSelectedRef.current = mapOrderDetail(menuParams.props.row)
        setIsOpenOrderCancel(true)
        break;
    }
  }

  return (
    <ListPage>
      <ListPage.Table>
        <Table
          classWrapper="h-[calc(100vh-345px)] overflow-auto"
          columns={columns}
          data={accountOrderBooks}
          menu={[
            { id: 'detail', text: "Chi tiết" },
            { id: 'edit', text: "Sửa lệnh" },
            { id: 'cancel', text: "Hủy lệnh" },
          ]}
          onClickMenu={handleOnClickMenuItem}
        />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={
            accountOrderBooks?.length ? StringToInt(accountOrderBooks[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
      {
        orderSelectedRef.current && isOpenOrderDetail &&
        <OrderDetailModal
          onClose={() => setIsOpenOrderDetail(false)}
          selectedOrder={orderSelectedRef.current}
        />
      }
      {
        orderSelectedRef.current && isOpenOrderEdit &&
        <OrderEditModal
          onClose={() => setIsOpenOrderEdit(false)}
          selectedOrder={orderSelectedRef.current}
        />
      }
      {
        orderSelectedRef.current && isOpenOrderCancel &&
        <OrderCancelModal
          onClose={() => setIsOpenOrderCancel(false)}
          selectedOrder={orderSelectedRef.current}
        />
      }
    </ListPage>
  );
};

export default OrderBook;