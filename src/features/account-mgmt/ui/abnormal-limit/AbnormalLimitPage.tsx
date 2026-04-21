import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { AbnormalLimit } from "../../accountManagementType";
import {
  fetchAbnormalLimitRequest,
  selectAbnormalLimits,
} from "../../redux/accountManagementSlice";

const columns: Column<AbnormalLimit>[] = [
  {
    key: "accountNo",
    title: "Số tài khoản",
    className: "text-center",
    render: (row) => row.accountNo,
  },
  {
    key: "abnormalLimit",
    title: "HMBT",
    className: "text-right",
    render: (row) => row.abnormalLimit,
  },
  {
    key: "matchedBuyValue",
    title: "Mua đã khớp",
    className: "text-right",
    render: (row) => row.matchedBuyValue,
  },
  {
    key: "requiredDepositAmount",
    title: "Số tiền cần nộp",
    className: "text-right",
    render: (row) => row.requiredDepositAmount,
  },
  {
    key: "buyingPower",
    title: "Sức mua",
    className: "text-right",
    render: (row) => row.buyingPower,
  },
  {
    key: "marginRatio",
    title: "M.Ratio",
    className: "text-right",
    render: (row) => row.marginRatio,
  },
  {
    key: "marginCallRate",
    title: "Margin Call Rate",
    className: "text-right",
    render: (row) => row.marginCallRate,
  },
  {
    key: "marginSellRate",
    title: "Margin Sell Rate",
    className: "text-right",
    render: (row) => row.marginSellRate,
  },
];

const AbnormalLimitPage = () => {
  const dispatch = useAppDispatch();
  const abnormalLimits = useAppSelector(selectAbnormalLimits);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(fetchAbnormalLimitRequest(pagination));
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
          data={abnormalLimits}
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
            abnormalLimits?.length ? StringToInt(abnormalLimits[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default AbnormalLimitPage;
