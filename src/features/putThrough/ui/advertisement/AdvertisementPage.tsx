import ListPage from "@/components/page/ListPage";
import AdvertisementTable from "./AdvertisementTable";
import AdvertisementSearch from "./AdvertisementSearch"
import { useEffect, useState } from "react";
import { fetchAdvertisementRequest, selectAdvertisement } from "../../redux/putthroughSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { StringToInt } from "@/utils";
import Paging from "@/components/common/Paging";
import type { AdvertisementParams } from "../../putthroughType";

const AdvertisementPage = () => {
  const dispatch = useAppDispatch()
  const advertisements = useAppSelector(selectAdvertisement);
  const [params, setParams] = useState<AdvertisementParams>()
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(50)

  useEffect(() => {
    if (!params) return;
    dispatch(fetchAdvertisementRequest({ ...params, page, size }));
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
        <AdvertisementSearch handleSearch={(params) => setParams(params)} />
      </ListPage.Search>
      <ListPage.Table>
        <AdvertisementTable advertisements={advertisements} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={page}
          nextPage={(e: number) => _handleNextPage(e)}
          size={size}
          setSize={_handleChangeSize}
          total={
            advertisements?.length ? StringToInt(advertisements[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  )
};
export default AdvertisementPage;