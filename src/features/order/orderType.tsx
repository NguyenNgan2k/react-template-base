
export type OrderValue = {
  symbol: string;
  account: string;
  side: string;
  price: string;
  volume: string;
}

export type OrderHistoryRequest = number

export type OrderHistory = {
  type: string
}

export type OrderDetail = {
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