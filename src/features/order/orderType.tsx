
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
  pkFrontOrder: number;
  side: "B" | "S" | string;
  orderNo: number;
  shareCode: string;
  orderShowPrice: string;
  orderVolume: number;
  accountCode: string;
  orderTime: number;
  marketingId: string;
  chanel: string;
  rejectText: string | null;
}