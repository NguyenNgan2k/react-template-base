import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { CollateralAssets } from "../../accountManagementType";
import {
  fetchCollateralAssetsRequest,
  selectCollateralAssets,
} from "../../redux/accountManagementSlice";

const columns: Column<CollateralAssets>[] = [
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
    key: "apAdvWithdraw",
    title: "ΣAP-advWithdraw",
    className: "text-right",
    render: (row) => row.apAdvWithdraw,
  },
  {
    key: "status",
    title: "Trạng thái",
    className: "text-center",
    render: (row) => row.status,
  },
  {
    key: "requiredCollateralValue",
    title: "Giá trị cần đảm bảo",
    className: "text-right",
    render: (row) => row.requiredCollateralValue,
  },
  {
    key: "collateralAssetValue",
    title: "TS đảm bảo",
    className: "text-right",
    render: (row) => row.collateralAssetValue,
  },
  {
    key: "ratio",
    title: "Tỷ lệ",
    className: "text-right",
    render: (row) => row.ratio,
  },
];

const CollateralAssetsPage = () => {
  const dispatch = useAppDispatch();
  const collateralAssets = useAppSelector(selectCollateralAssets);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(fetchCollateralAssetsRequest(pagination));
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
          data={collateralAssets}
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
            collateralAssets?.length
              ? StringToInt(collateralAssets[0].totalRow)
              : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default CollateralAssetsPage;
