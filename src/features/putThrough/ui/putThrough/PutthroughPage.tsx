import ListPage from "@/components/page/ListPage";
import PutthroughSearch from "./PutthroughSearch";
import PutThroughTable from "./PutthroughTable";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchPutThroughRequest, selectPutThrough } from "../../redux/putthroughSlice";
import { useEffect, useState } from "react";
import type { PutThroughParams } from "../../putthroughType";
import Paging from "@/components/common/Paging";
import { StringToInt } from "@/utils";
import type { PaginationParams } from "@/types";

const PutThroughPage = () => {
  const dispatch = useAppDispatch()
  const putThrough = useAppSelector(selectPutThrough);
  const [params, setParams] = useState<PutThroughParams>()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50
  })

  useEffect(() => {
    if (!params) return;
    dispatch(fetchPutThroughRequest({ ...params, ...pagination }));
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
        <PutthroughSearch handleSearch={(params) => setParams(params)} />
      </ListPage.Search>
      <ListPage.Table>
        <PutThroughTable putThroughs={putThrough} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={putThrough?.length ? StringToInt(putThrough[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage >
  )
};
export default PutThroughPage;