import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToInt, numberFormat } from "@/utils";
import { useEffect, useRef, useState } from "react";
import type { AccountProfitLoss } from "../../../accountType";
import {
  fetchAccountProfitLossRequest,
  selectAccountProfitLoss,
  selectAccountSelected,
} from "../../../redux/accountSlice";
import ProfitLossSearch, { type ProfitLossSearchParams } from "./ProfitLossSearch";

const columns: Column<AccountProfitLoss>[] = [
  {
    key: "rowNo",
    title: "STT",
    className: "text-center",
    render: (row) => row.rowNo || "-",
  },
  {
    key: "symbol",
    title: "Mã Ck",
    className: "text-center",
    render: (row) => row.symbol || "-",
  },
  {
    key: "sellVolume",
    title: "KL bán",
    className: "text-right",
    render: (row) => numberFormat(row.sellVolume, 0, "-"),
  },
  {
    key: "averageSellPrice",
    title: "Giá bán TB (đã bao gồm phí thuế)",
    className: "text-right",
    render: (row) => numberFormat(row.averageSellPrice, 0, "-"),
  },
  {
    key: "sellValue",
    title: "Giá trị bán",
    className: "text-right",
    render: (row) => numberFormat(row.sellValue, 0, "-"),
  },
  {
    key: "costPrice",
    title: "Giá vốn",
    className: "text-right",
    render: (row) => numberFormat(row.costPrice, 0, "-"),
  },
  {
    key: "costValue",
    title: "Giá trị vốn",
    className: "text-right",
    render: (row) => numberFormat(row.costValue, 0, "-"),
  },
  {
    key: "profitLoss",
    title: "Lãi/lỗ",
    className: "text-right",
    render: (row) => numberFormat(row.profitLoss, 0, "-"),
  },
  {
    key: "profitLossPercent",
    title: "% Lãi/lỗ",
    className: "text-right",
    render: (row) => (row.profitLossPercent !== undefined ? `${row.profitLossPercent}` : "-"),
  },
];

const ProfitLoss = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const profitLoss = useAppSelector(selectAccountProfitLoss);
  const lastRequestKeyRef = useRef<string>("");
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 50,
  });
  const [filters, setFilters] = useState<ProfitLossSearchParams>({});

  useEffect(() => {
    if (!accountSelected) return;

    const requestKey = `${accountSelected}_${pagination.page}_${pagination.size}_${filters.fromDate || ""}_${filters.toDate || ""}_${filters.symbol || ""}`;
    if (lastRequestKeyRef.current === requestKey) return;
    lastRequestKeyRef.current = requestKey;

    dispatch(
      fetchAccountProfitLossRequest({
        account: accountSelected,
        ...pagination,
        ...filters,
      }),
    );
  }, [accountSelected, dispatch, filters, pagination.page, pagination.size]);

  const handleSearch = (data: ProfitLossSearchParams) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setFilters(data);
  };


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
        <ProfitLossSearch handleSearch={handleSearch} />
      </ListPage.Search>
      <ListPage.Table>
        <Table
          classWrapper="max-h-[calc(100vh-250px)] overflow-auto"
          columns={columns}
          data={profitLoss}
        />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={profitLoss?.length ? StringToInt(profitLoss[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default ProfitLoss;
