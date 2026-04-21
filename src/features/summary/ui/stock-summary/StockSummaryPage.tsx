import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToInt, numberFormat } from "@/utils";
import { useEffect, useState } from "react";
import type { StockSummary } from "../../summaryType";
import {
  fetchStockSummaryRequest,
  selectStockSummary,
} from "../../redux/summarySlice";

const columns: Column<StockSummary>[] = [
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.symbol || "-",
  },
  {
    key: "orderType",
    title: "Lệnh",
    className: "text-center",
    render: (row) => row.orderType || "-",
  },
  {
    key: "orderVolume",
    title: "KL đặt",
    className: "text-right",
    render: (row) => numberFormat(row.orderVolume, 0, "-"),
  },
  {
    key: "orderValue",
    title: "Giá trị đặt",
    className: "text-right",
    render: (row) => numberFormat(row.orderValue, 0, "-"),
  },
  {
    key: "matchedVolume",
    title: "KL khớp",
    className: "text-right",
    render: (row) => numberFormat(row.matchedVolume, 0, "-"),
  },
  {
    key: "matchedValue",
    title: "Giá trị khớp",
    className: "text-right",
    render: (row) => numberFormat(row.matchedValue, 0, "-"),
  },
  {
    key: "unmatchedVolume",
    title: "KL chưa khớp",
    className: "text-right",
    render: (row) => numberFormat(row.unmatchedVolume, 0, "-"),
  },
  {
    key: "unmatchedValue",
    title: "Giá trị chưa khớp",
    className: "text-right",
    render: (row) => numberFormat(row.unmatchedValue, 0, "-"),
  },
];

const StockSummaryPage = () => {
  const dispatch = useAppDispatch();
  const stockSummary = useAppSelector(selectStockSummary);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(fetchStockSummaryRequest(pagination));
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
        <Table<StockSummary>
          classWrapper="h-[calc(100vh-140px)] overflow-auto"
          columns={columns}
          data={stockSummary}
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
            stockSummary?.length ? StringToInt(stockSummary[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default StockSummaryPage;
