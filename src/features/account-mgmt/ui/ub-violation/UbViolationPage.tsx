import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { UbViolation } from "../../accountManagementType";
import {
  fetchUbViolationRequest,
  selectUbViolations,
} from "../../redux/accountManagementSlice";

const columns: Column<UbViolation>[] = [
  {
    key: "accountNo",
    title: "Số TK",
    className: "text-center",
    render: (row) => row.accountNo,
  },
  {
    key: "customerName",
    title: "Tên khách hàng",
    className: "text-left",
    render: (row) => row.customerName,
  },
  {
    key: "marketingId",
    title: "MKT.ID",
    className: "text-center",
    render: (row) => row.marketingId,
  },
  {
    key: "ubAsset",
    title: "Tài sản UB",
    className: "text-right",
    render: (row) => row.ubAsset,
  },
  {
    key: "debt",
    title: "Nợ",
    className: "text-right",
    render: (row) => row.debt,
  },
  {
    key: "apAdvWithdraw",
    title: "ΣAP-advWithdraw",
    className: "text-right",
    render: (row) => row.apAdvWithdraw,
  },
  {
    key: "ratio",
    title: "Tỷ lệ",
    className: "text-right",
    render: (row) => row.ratio,
  },
  {
    key: "ubCall",
    title: "Call UB",
    className: "text-right",
    render: (row) => row.ubCall,
  },
  {
    key: "ubForce",
    title: "Force UB",
    className: "text-right",
    render: (row) => row.ubForce,
  },
  {
    key: "status",
    title: "Trạng thái",
    className: "text-center",
    render: (row) => row.status,
  },
];

const UbViolationPage = () => {
  const dispatch = useAppDispatch();
  const ubViolations = useAppSelector(selectUbViolations);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(fetchUbViolationRequest(pagination));
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
          data={ubViolations}
        />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={ubViolations?.length ? StringToInt(ubViolations[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default UbViolationPage;
