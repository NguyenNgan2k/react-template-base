import Paging from "@/components/common/Paging";
import OrderBookForm from "./OrderBookSearch";
import OrderBookTable from "./OrderBookTable";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchOrderBookRequest, selectOrderBook } from "../redux/orderBookSlice";
import { StringToInt } from "@/utils";
import type { OrderBookParams } from "../orderBookType";
import ListPage from "@/components/page/ListPage";

const OrderBookPage = () => {
  const dispatch = useAppDispatch()
  const orderBooks = useAppSelector(selectOrderBook)
  const [params, setParams] = useState<OrderBookParams>()
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(50)

  useEffect(() => {
    if (!params) return;
    dispatch(fetchOrderBookRequest({ ...params, page, size }));
  }, [params, page, size]);

  function _handleNextPage(step: number): void {
    if (step < 1) return;
    setPage(step);
  }

  function _handleChangeSize(step: number): void {
    setSize(step);
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
          page={page}
          nextPage={(e: number) => _handleNextPage(e)}
          size={size}
          setSize={_handleChangeSize}
          total={
            orderBooks?.length ? StringToInt(orderBooks[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
}
export default OrderBookPage;