export interface OrderParams {
  symbol: string;
  volume: number;
  price: number;
  orderType: string;
  side: "BUY" | "SELL";
}

export interface FetchOrdersResponse {
  rc: number;
  msg: string;
  data: null;
}

export interface OrderPayload {
  side: "BUY" | "SELL";
  params: OrderParams;
}

export interface OrderResponse {
  rc: number;
  msg: string;
  data: null;
}

export type OrderValue = {
  symbol: string;
  account: string;
  side: string;
  price: string;
  volume: string;
}
