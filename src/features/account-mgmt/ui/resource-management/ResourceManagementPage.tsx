import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { ResourceManagement } from "../../accountManagementType";
import {
  fetchResourceManagementRequest,
  selectResourceManagements,
} from "../../redux/accountManagementSlice";

const columns: Column<ResourceManagement>[] = [
  {
    key: "accountNo",
    title: "Số TK",
    className: "text-center",
    render: (row) => row.accountNo,
  },
  {
    key: "accountLimit",
    title: "Hạn mức TK",
    className: "text-right",
    render: (row) => row.accountLimit,
  },
  {
    key: "orderValue",
    title: "Giá trị đặt lệnh",
    className: "text-right",
    render: (row) => row.orderValue,
  },
  {
    key: "openingDebt",
    title: "Nợ đầu ngày",
    className: "text-right",
    render: (row) => row.openingDebt,
  },
  {
    key: "cash",
    title: "Tiền",
    className: "text-right",
    render: (row) => row.cash,
  },
  {
    key: "accruedDebt",
    title: "Nợ phát sinh",
    className: "text-right",
    render: (row) => row.accruedDebt,
  },
];

const ResourceManagementPage = () => {
  const dispatch = useAppDispatch();
  const resourceManagements = useAppSelector(selectResourceManagements);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(fetchResourceManagementRequest(pagination));
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
          data={resourceManagements}
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
            resourceManagements?.length
              ? StringToInt(resourceManagements[0].totalRow)
              : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default ResourceManagementPage;
