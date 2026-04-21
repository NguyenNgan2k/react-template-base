import ListPage from "@/components/page/ListPage";
import AdvertisementTable from "./AdvertisementTable";
import AdvertisementSearch from "./AdvertisementSearch"
import { useEffect, useState } from "react";
import { fetchAdvertisementRequest, selectAdvertisement } from "../../redux/putthroughSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { StringToInt } from "@/utils";
import Paging from "@/components/common/Paging";
import type { AdvertisementParams } from "../../putthroughType";
import type { PaginationParams } from "@/types";

const AdvertisementPage = () => {
  const dispatch = useAppDispatch()
  const advertisements = useAppSelector(selectAdvertisement);
  const [params, setParams] = useState<AdvertisementParams>()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50
  })

  useEffect(() => {
    if (!params) return;
    dispatch(fetchAdvertisementRequest({ ...params, ...pagination }));
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
        <AdvertisementSearch handleSearch={(params) => setParams(params)} />
      </ListPage.Search>
      <ListPage.Table>
        <AdvertisementTable advertisements={advertisements} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={advertisements?.length ? StringToInt(advertisements[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  )
};
export default AdvertisementPage;