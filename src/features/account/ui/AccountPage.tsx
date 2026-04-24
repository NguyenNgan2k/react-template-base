import ListPage from "@/components/page/ListPage";
import AccountTable from "./AccountTable";
import AccountSearch from "./AccountSearch"
import { useEffect, useState } from "react";
import { fetchAccountListRequest, selectAccountList } from "../redux/accountSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Paging from "@/components/common/Paging";
import type { PaginationParams } from "@/types";
import type { AccountListParams } from "../accountType";
import AccountDetailModal from "./account-detail/AccountDetailModal";

const AccountPage = () => {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector(selectAccountList);
  const [params, setParams] = useState<AccountListParams>()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50
  })

  useEffect(() => {
    if (!params) return;
    dispatch(fetchAccountListRequest({ ...params, ...pagination }));
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
        <AccountSearch handleSearch={(params) => setParams(params)} />
      </ListPage.Search>
      <ListPage.Table>
        <AccountTable accounts={accounts} />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={accounts?.length || 0}
        />
      </ListPage.Paging>
      <AccountDetailModal />
    </ListPage>
  )
};
export default AccountPage;