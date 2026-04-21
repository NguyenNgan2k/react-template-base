import Paging from "@/components/common/Paging";
import ListPage from "@/components/page/ListPage";
import Table from "@/components/table/Table";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import type { Column, PaginationParams } from "@/types";
import { StringToInt, numberFormat } from "@/utils";
import { useEffect, useState } from "react";
import type { BrokerSummary, ChannelSummary, StockSummary } from "../../summaryType";
import {
  fetchTransactionSummaryRequest,
  selectTransactionSummary,
} from "../../redux/summarySlice";

const brokerSummaryCols: Column<BrokerSummary>[] = [
  {
    key: "brokerName",
    title: "Tên Broker",
    render: (row) => row.brokerName || "-",
  },
  {
    key: "marketingId",
    title: "MKT ID",
    className: "text-center",
    render: (row) => row.marketingId || "-",
  },
  {
    key: "totalBuy",
    title: "Tổng mua",
    className: "text-right",
    render: (row) => numberFormat(row.totalBuy, 0, "-"),
  },
  {
    key: "totalSell",
    title: "Tổng bán",
    className: "text-right",
    render: (row) => numberFormat(row.totalSell, 0, "-"),
  },
  {
    key: "totalTrading",
    title: "Tổng giao dịch",
    className: "text-right",
    render: (row) => numberFormat(row.totalTrading, 0, "-"),
  },
  {
    key: "totalFee",
    title: "Tổng phí",
    className: "text-right",
    render: (row) => numberFormat(row.totalFee, 0, "-"),
  },
  {
    key: "xtscPercent",
    title: "%XTSC",
    className: "text-right",
    render: (row) => (row.xtscPercent !== undefined ? `${row.xtscPercent}` : "-"),
  },
];

const stockSummaryCols: Column<StockSummary>[] = [
  {
    key: "total",
    title: "",
    render: (row) => <></>
  },
  {
    key: "orderNumber",
    title: "Số lượng lệnh",
    className: "text-center",
    render: (row) => <></>
  },
  {
    key: "value",
    title: "Giá trị",
    className: "text-right",
    render: (row) => <></>
  },
  {
    key: "totalSell",
    title: "Thị phần",
    className: "text-right",
    render: (row) => <></>
  },

];

const channelSummaryCols: Column<ChannelSummary>[] = [
  {
    key: "channel",
    title: "Kênh giao dịch",
    render: (row) => <></>
  },
  {
    key: "valueBuy",
    title: "Giá trị mua",
    className: "text-right",
    render: (row) => <></>
  },
  {
    key: "valueSell",
    title: "Giá trị bán",
    className: "text-right",
    render: (row) => <></>
  },
  {
    key: "totalValue",
    title: "Tổng giá trị",
    className: "text-right",
    render: (row) => <></>
  },

];

const TransactionSummaryPage = () => {
  const dispatch = useAppDispatch();
  const transactionSummary = useAppSelector(selectTransactionSummary);

  return (
    <ListPage className="gap-4">
      <ListPage className="flex-row gap-4">
        <ListPage.Table className="w-1/2">
          <Table<BrokerSummary>
            classWrapper="max-h-[calc(50vh-70px)] overflow-auto"
            columns={stockSummaryCols}
            data={[]}
          />
        </ListPage.Table>
        <ListPage.Table className="w-1/2">
          <Table<BrokerSummary>
            classWrapper="max-h-[calc(50vh-70px)] overflow-auto"
            columns={channelSummaryCols}
            data={[]}
          />
        </ListPage.Table>
      </ListPage>
      <ListPage.Table>
        <Table<BrokerSummary>
          classWrapper="h-[calc(50vh-70px)] overflow-auto"
          columns={brokerSummaryCols}
          data={transactionSummary}
        />
      </ListPage.Table>
    </ListPage>
  );
};

export default TransactionSummaryPage;
