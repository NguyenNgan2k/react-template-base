import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToInt, numberFormat } from "@/utils";
import { useEffect, useRef, useState } from "react";
import type { AccountMatchedByStock } from "../../../../accountType";
import {
  fetchAccountMatchedByStockRequest,
  selectAccountMatchedByStock,
  selectAccountSelected,
} from "../../../../redux/accountSlice";

const columns: Column<AccountMatchedByStock>[] = [
  {
    key: "side",
    title: "Lệnh",
    className: "text-center",
    render: (row) => row.side || "-",
  },
  {
    key: "symbol",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.symbol || "-",
  },
  {
    key: "matchedVolume",
    title: "KL khớp",
    className: "text-right",
    render: (row) => numberFormat(row.matchedVolume, 0, "-"),
  },
  {
    key: "averagePrice",
    title: "Giá trung bình",
    className: "text-right",
    render: (row) => numberFormat(row.averagePrice, 0, "-"),
  },
  {
    key: "value",
    title: "Giá trị",
    className: "text-right",
    render: (row) => numberFormat(row.value, 0, "-"),
  },
  {
    key: "temporaryFee",
    title: "Phí tạm tính",
    className: "text-right",
    render: (row) => numberFormat(row.temporaryFee, 0, "-"),
  },
  {
    key: "tax",
    title: "Thuế",
    className: "text-right",
    render: (row) => numberFormat(row.tax, 0, "-"),
  },
];

const MatchedByStock = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const matchedByStock = useAppSelector(selectAccountMatchedByStock);
  const lastRequestKeyRef = useRef<string>("");
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 20,
  });

  useEffect(() => {
    if (!accountSelected) return;

    const requestKey = `${accountSelected}_${pagination.page}_${pagination.size}`;
    if (lastRequestKeyRef.current === requestKey) return;

    lastRequestKeyRef.current = requestKey;
    dispatch(
      fetchAccountMatchedByStockRequest({
        account: accountSelected,
        data: { ...pagination },
      }),
    );
  }, [accountSelected, pagination.page, pagination.size]);

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
          classWrapper="h-[calc(100vh-345px)] overflow-auto"
          columns={columns}
          data={matchedByStock}
        />
      </ListPage.Table>
      <ListPage.Paging>
        <Paging
          isElement={true}
          page={pagination.page}
          size={pagination.size}
          nextPage={handleNextPage}
          setSize={handleSetSize}
          totalRow={matchedByStock?.length ? StringToInt(matchedByStock[0].totalRow) : 0}
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default MatchedByStock;
