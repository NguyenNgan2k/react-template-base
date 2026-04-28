import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { AccountFilter, AccountFilterParams } from "../../accountManagementType";
import {
  fetchAccountFilterRequest,
  selectAccountFilters,
} from "../../redux/accountManagementSlice";
import StockFilterSearch from "./StockFilterSearch";

const accountFilterColumns: Column<AccountFilter>[] = [
  {
    key: "accountNo",
    title: "Số TK",
    className: "text-center",
    render: (row) => row.accountNo,
  },
  {
    key: "customerName",
    title: "Khách hàng",
    className: "text-left",
    render: (row) => row.customerName,
  },
  {
    key: "group",
    title: "Nhóm",
    className: "text-center",
    render: (row) => row.group,
  },
  {
    key: "totalAsset",
    title: "Tổng tài sản",
    className: "text-right",
    render: (row) => row.totalAsset,
  },
  {
    key: "debt",
    title: "Nợ",
    className: "text-right",
    render: (row) => row.debt,
  },
  {
    key: "ratio",
    title: "Tỷ lệ",
    className: "text-right",
    render: (row) => row.ratio,
  },
  {
    key: "status",
    title: "Trạng thái",
    className: "text-center",
    render: (row) => row.status,
  },
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.symbol,
  },
  {
    key: "volume",
    title: "KL",
    className: "text-right",
    render: (row) => row.volume,
  },
  {
    key: "weight",
    title: "Tỷ trọng",
    className: "text-right",
    render: (row) => row.weight,
  },
];

const stockFilterColumns: Column<unknown>[] = [
  {
    key: "accountNo",
    title: "Mã CK",
    className: "text-center",
    render: (row) => <></>,
  },
  {
    key: "",
    title: "Theo dõi",
    className: "text-center",
    render: (row) => <></>,
  },
  {
    key: "",
    title: "Bỏ qua",
    className: "text-center",
    render: (row) => <></>,
  },
]

const AccountFilterPage = () => {
  const dispatch = useAppDispatch();
  const accountFilters = useAppSelector(selectAccountFilters);
  const [params, setParams] = useState<AccountFilterParams>();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    if (!params) return;
    dispatch(fetchAccountFilterRequest({ ...params, ...pagination }));
  }, [dispatch, params, pagination]);

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
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-10">
          <ListPage.Table>
            <Table
              classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
              columns={accountFilterColumns}
              data={accountFilters}
            />
          </ListPage.Table>
          <ListPage.Paging>
            <Paging
              isElement={true}
              page={pagination.page}
              size={pagination.size}
              nextPage={handleNextPage}
              setSize={handleSetSize}
              totalRow={
                accountFilters?.length ? StringToInt(accountFilters[0].totalRow) : 0
              }
            />
          </ListPage.Paging>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-1">
            <StockFilterSearch handleSearch={(searchParams: AccountFilterParams) => setParams(searchParams)} />
            <ListPage.Table>
              <Table
                classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
                columns={stockFilterColumns}
                data={[]}
              />
            </ListPage.Table>
          </div>
        </div>
      </div>
    </ListPage>
  );
};

export default AccountFilterPage;
