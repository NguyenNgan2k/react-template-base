import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Table from "@/components/table/Table-v2";
import type { Column, PaginationParams } from "@/types";
import { StringToInt } from "@/utils";
import { useEffect, useState } from "react";
import type { LoanableSecurities, LoanableSecuritiesParams } from "../../accountManagementType";
import {
  fetchLoanableSecuritiesRequest,
  selectLoanableSecurities,
} from "../../redux/accountManagementSlice";
import LoanableSecuritiesSearch from "./LoanableSecuritiesSearch";

const columns: Column<LoanableSecurities>[] = [
  {
    key: "stock",
    title: "Mã CK",
    children: [
      {
        key: "symbol",
        title: "Mã CK",
        className: "text-center",
        render: (row) => row.symbol,
      },
      {
        key: "ceilingPrice",
        title: "Trần",
        className: "text-right",
        render: (row) => row.ceilingPrice,
      },
      {
        key: "floorPrice",
        title: "Sàn",
        className: "text-right",
        render: (row) => row.floorPrice,
      },
      {
        key: "referencePrice",
        title: "TC",
        className: "text-right",
        render: (row) => row.referencePrice,
      },
    ]
  },
  {
    key: "marginRate",
    title: "TL ký quỹ",
    className: "text-right",
    render: (row) => row.marginRate,
  },
  {
    key: "category",
    title: "Danh mục",
    children: [
      {
        key: "pledgeRate",
        title: "Plg %",
        className: "text-right",
        render: (row) => row.pledgeRate,
      },
      {
        key: "loanLimit",
        title: "UB cho vay",
        className: "text-right",
        render: (row) => row.loanLimit,
      },
      {
        key: "blockedPrice",
        title: "Giá chặn",
        className: "text-right",
        render: (row) => row.blockedPrice,
      },
      {
        key: "marketPrice",
        title: "Giá TT",
        className: "text-right",
        render: (row) => row.marketPrice,
      },
    ]
  },
  {
    key: "sp06",
    title: "Sp06",
    children: [
      {
        key: "room",
        title: "Room",
        className: "text-right",
        render: (row) => row.room,
      },
      {
        key: "value",
        title: "Giá trị",
        className: "text-right",
        render: (row) => row.value,
      },
      {
        key: "debt",
        title: "Dư nợ",
        className: "text-right",
        render: (row) => row.debt,
      },
      {
        key: "intradayVolume",
        title: "KL trong ngày",
        className: "text-right",
        render: (row) => row.intradayVolume,
      },
      {
        key: "remainingValue",
        title: "GT còn lại",
        className: "text-right",
        render: (row) => row.remainingValue,
      },
      {
        key: "remainingVolume",
        title: "KL còn lại",
        className: "text-right",
        render: (row) => row.remainingVolume,
      },
    ]
  },
  {
    key: "margin",
    title: "Margin chuẩn",
    children: [
      {
        key: "loanRoom",
        title: "Room",
        className: "text-right",
        render: (row) => row.loanRoom,
      },
      {
        key: "loanValue",
        title: "Giá trị",
        className: "text-right",
        render: (row) => row.loanValue,
      },
      {
        key: "loanDebt",
        title: "Dư nợ",
        className: "text-right",
        render: (row) => row.loanDebt,
      },
      {
        key: "loanIntradayVolume",
        title: "KL trong ngày",
        className: "text-right",
        render: (row) => row.loanIntradayVolume,
      },
      {
        key: "loanRemainingValue",
        title: "GT còn lại",
        className: "text-right",
        render: (row) => row.loanRemainingValue,
      },
      {
        key: "loanRemainingVolume",
        title: "KL còn lại",
        className: "text-right",
        render: (row) => row.loanRemainingVolume,
      },
    ]
  }
];

const LoanableSecuritiesPage = () => {
  const dispatch = useAppDispatch();
  const loanableSecurities = useAppSelector(selectLoanableSecurities);
  const [params, setParams] = useState<LoanableSecuritiesParams>();
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    if (!params) return;
    dispatch(fetchLoanableSecuritiesRequest({ ...params, ...pagination }));
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
      <ListPage.Search>
        <LoanableSecuritiesSearch handleSearch={(searchParams: LoanableSecuritiesParams) => setParams(searchParams)} />
      </ListPage.Search>
      <ListPage.Table>
        <Table
          classWrapper="max-h-[calc(100vh-130px)] overflow-auto"
          columns={columns}
          data={loanableSecurities}
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
            loanableSecurities?.length
              ? StringToInt(loanableSecurities[0].totalRow)
              : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default LoanableSecuritiesPage;
