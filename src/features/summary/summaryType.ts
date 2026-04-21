import type { PaginationParams } from "@/types";

export type TransactionSummaryRequest = PaginationParams;

export type ChannelSummaryRequest = PaginationParams;

export type BrokerSummary = {
  totalRow: string;
  brokerName?: string;
  marketingId?: string;
  totalBuy?: string | number;
  totalSell?: string | number;
  totalTrading?: string | number;
  totalFee?: string | number;
  xtscPercent?: string | number;
};

export type ChannelSummary = {
  totalRow: string;
  channel?: string;
  valueBuy?: string | number;
  valueSell?: string | number;
  totalValue?: string | number;
};

export type StockSummaryRequest = PaginationParams;

export type StockSummary = {
  totalRow: string;
  symbol?: string;
  orderType?: string;
  orderVolume?: string | number;
  orderValue?: string | number;
  matchedVolume?: string | number;
  matchedValue?: string | number;
  unmatchedVolume?: string | number;
  unmatchedValue?: string | number;
};
