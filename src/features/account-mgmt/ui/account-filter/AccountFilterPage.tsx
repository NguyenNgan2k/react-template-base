import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { AccountFilter } from "../../accountManagementType";
import {
  fetchAccountFilterRequest,
  selectAccountFilters,
} from "../../redux/accountManagementSlice";

const columns: Column<AccountFilter>[] = [
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

const AccountFilterPage = () => {
  const dispatch = useAppDispatch();
  const accountFilters = useAppSelector(selectAccountFilters);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(fetchAccountFilterRequest(pagination));
  }, [dispatch, pagination]);

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
      <ListPage.Table>
        <Table
          classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
          columns={columns}
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
    </ListPage>
  );
};

export default AccountFilterPage;
