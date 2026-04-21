import Paging from "@/components/common/Paging";
import OrderBookForm from "./OrderBookSearch";
import OrderBookTable from "./OrderBookTable";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchOrderBookRequest, selectOrderBook } from "../redux/orderBookSlice";
import { StringToInt } from "@/utils";
import type { OrderBookParams } from "../orderBookType";
import ListPage from "@/components/page/ListPage";
import type { PaginationParams } from "@/types";

const OrderBookPage = () => {
  const dispatch = useAppDispatch()
  const orderBooks = useAppSelector(selectOrderBook)
  const [params, setParams] = useState<OrderBookParams>()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50
  })

  useEffect(() => {
    if (!params) return;
    dispatch(fetchOrderBookRequest({ ...params, ...pagination }));
  }, [params, pagination]);

  const handleNextPage = (page: number) => {
    if (page < 1) return
    setPagination(prev => ({ ...prev, page }))
  }

  const handleSetSize = (size: number) => {
    setPagination(prev => ({
      ...prev,
      size,
      page: 1
    }))
  }

  return (
    <ListPage>
      <ListPage.Search>
        <OrderBookForm handleSearch={(params) => setParams(params)} />
      </ListPage.Search>
      <ListPage.Table>
        <OrderBookTable orderBooks={orderBooks} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={orderBooks?.length ? StringToInt(orderBooks[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
}
export default OrderBookPage;