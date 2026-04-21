import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { HaltParams } from "../../stockListType";
import {
  fetchHaltStockListRequest,
  selectHaltStockList,
} from "../../redux/stockListSlice";
import HaltSearch from "./HaltSearch";
import HaltTable from "./HaltTable";

const HaltPage = () => {
  const dispatch = useAppDispatch();
  const haltStocks = useAppSelector(selectHaltStockList);
  const [params, setParams] = useState<HaltParams>();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    if (!params) return;
    dispatch(fetchHaltStockListRequest({ ...params, ...pagination }));
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
        <HaltSearch handleSearch={(searchParams) => setParams(searchParams)} />
      </ListPage.Search>
      <ListPage.Table>
        <HaltTable haltStocks={haltStocks} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={haltStocks?.length ? StringToInt(haltStocks[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default HaltPage;
