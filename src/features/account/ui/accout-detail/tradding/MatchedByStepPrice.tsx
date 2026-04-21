import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToInt, numberFormat } from "@/utils";
import { useEffect, useState } from "react";
import type { AccountMatchedByStepPrice } from "../../../accountType";
import {
  fetchAccountMatchedByStepPriceRequest,
  selectAccountMatchedByStepPrice,
  selectAccountSelected,
} from "../../../redux/accountSlice";

const columns: Column<AccountMatchedByStepPrice>[] = [
  {
    key: "accountCode",
    title: "Tài khoản",
    className: "text-center",
    render: (row) => row.accountCode || "-",
  },
  {
    key: "shareCode",
    title: "Mã CK",
    className: "text-center",
    render: (row) => row.symbol || row.shareCode || "-",
  },
  {
    key: "side",
    title: "Lệnh",
    className: "text-center",
    render: (row) => (row.side === "S" ? "SELL" : "BUY"),
  },
  {
    key: "stepPrice",
    title: "Giá đặt",
    className: "text-right",
    render: (row) => row.stepPrice ?? "-",
  },
  {
    key: "orderVol",
    title: "KL đặt",
    className: "text-right",
    render: (row) => numberFormat(row.orderVol, 0, "-"),
  },
  {
    key: "orderValue",
    title: "Giá trị đặt",
    className: "text-right",
    render: () => "",
  },
  {
    key: "matchVol",
    title: "KL khớp",
    className: "text-right",
    render: (row) => numberFormat(row.matchVol, 0, "-"),
  },
  {
    key: "matchedPrice",
    title: "Giá khớp",
    className: "text-right",
    render: () => "",
  },
  {
    key: "matchedVal",
    title: "Giá trị khớp",
    className: "text-right",
    render: (row) => numberFormat(row.amount, 0, "-"),
  },
  {
    key: "unmatchVol",
    title: "KL chưa khớp",
    className: "text-right",
    render: (row) => numberFormat(row.unmatchVol, 0, "-"),
  },
  {
    key: "cancelVol",
    title: "Huỷ",
    className: "text-right",
    render: (row) => numberFormat(row.cancel ?? row.cancelVol, 0, "-"),
  },
];

const MatchedByStepPrice = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const matchedByStepPrice = useAppSelector(selectAccountMatchedByStepPrice);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    size: 20,
  });

  useEffect(() => {
    if (!accountSelected) return;
    dispatch(
      fetchAccountMatchedByStepPriceRequest({
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
          data={matchedByStepPrice}
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
            matchedByStepPrice?.length ? StringToInt(matchedByStepPrice[0].totalRow) : 0
          }
        />
      </ListPage.Paging>
    </ListPage>
  );
};

export default MatchedByStepPrice;
