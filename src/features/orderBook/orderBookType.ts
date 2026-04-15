import type { PaginationParams } from "@/types";

export type OrderBookParams = {
  symbol: string;
  account: string;
  mktId: string;
  orderStatus: string;
  channel: string;
  side: string;
  enter: string;
};

export type OrderBookRequest = OrderBookParams & PaginationParams;

export type OrderBookItem = {
  price: string;
  volume: string;
  side: "B" | "S";
};

export type OrderBook = {
  accountBranchCode: string;
  accountBusinessCode: string;
  accountCode: string;
  accountType: string;
  boardId: string;
  cancelTime: string | null;
  chanel: string;
  changePrice: number;
  group: string;
  marketingId: string;
  matchedValue: number;
  matchedVolume: number;
  orderCenterNo: string | null;
  orderNo: number;
  orderShowPrice: string;
  orderStatus: string;
  orderTime: number;
  orderVolume: number;
  pkFrontOrder: number;
  quoteStatus: string;
  rejectText: string | null;
  rowNo: number;
  setOrderType: string;
  shareCode: string;
  side: "B" | "S";
  totalRow: number;
  unmatchVolume: number;
};
