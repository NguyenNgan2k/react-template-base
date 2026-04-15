import ListPage from "@/components/page/ListPage";
import PutthroughSearch from "./PutthroughSearch";
import PutThroughTable from "./PutthroughTable";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchPutThroughRequest, selectPutThrough } from "../../redux/putthroughSlice";
import { useEffect, useState } from "react";
import type { PutThroughParams } from "../../putthroughType";
import Paging from "@/components/common/Paging";
import { StringToInt } from "@/utils";

const PutThroughPage = () => {
  const dispatch = useAppDispatch()
  const putThrough = useAppSelector(selectPutThrough);
  const [params, setParams] = useState<PutThroughParams>()
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(50)

  useEffect(() => {
    if (!params) return;
    dispatch(fetchPutThroughRequest({ ...params, page, size }));
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
        <PutthroughSearch handleSearch={(params) => setParams(params)} />
      </ListPage.Search>
      <ListPage.Table>
        <PutThroughTable putThroughs={putThrough} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={page}
          nextPage={(e: number) => _handleNextPage(e)}
          size={size}
          setSize={_handleChangeSize}
          total={
            putThrough?.length ? StringToInt(putThrough[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  )
};
export default PutThroughPage;