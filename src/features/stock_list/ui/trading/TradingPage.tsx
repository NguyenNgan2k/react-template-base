import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import {
  fetchTradingStockListRequest,
  selectTradingStockList,
} from "../../redux/stockListSlice";
import type { TradingParams } from "../../stockListType";
import TradingSearch from "./TradingSearch";
import TradingTable from "./TradingTable";

const TradingPage = () => {
  const dispatch = useAppDispatch();
  const tradingStocks = useAppSelector(selectTradingStockList);
  const [params, setParams] = useState<TradingParams>();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    if (!params) return;
    dispatch(fetchTradingStockListRequest({ ...params, ...pagination }));
  }, [params, pagination]);

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

  return (
    <ListPage>
      <ListPage.Search>
        <TradingSearch handleSearch={(searchParams) => setParams(searchParams)} />
      </ListPage.Search>
      <ListPage.Table>
        <TradingTable tradingStocks={tradingStocks} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={tradingStocks?.length ? StringToInt(tradingStocks[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default TradingPage;
