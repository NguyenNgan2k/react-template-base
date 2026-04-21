import ListPage from "@/components/page/ListPage";
import MsgSessionTable from "./MsgSessionTable";
import MsgSessionSearch from "./MsgSessionSearch";
import { useEffect, useState } from "react";
import { StringToInt } from "@/utils";
import Paging from "@/components/common/Paging";
import type { PaginationParams } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  fetchMsgSessionRequest,
  selectMsgSession,
} from "../redux/msgSessionSlice";
import type { MsgSessionParams } from "../msgSessionType";

const MsgSessionPage = () => {
  const dispatch = useAppDispatch();
  const msgSessions = useAppSelector(selectMsgSession);
  const [params, setParams] = useState<MsgSessionParams>();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    if (!params) return;
    dispatch(fetchMsgSessionRequest({ ...params, ...pagination }));
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
        <MsgSessionSearch handleSearch={(searchParams) => setParams(searchParams)} />
      </ListPage.Search>
      <ListPage.Table>
        <MsgSessionTable msgSessions={msgSessions} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={msgSessions?.length ? StringToInt(msgSessions[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default MsgSessionPage;
