export type OrderBookRequest = {
  symbol: string;
  account: string;
  mktId: string;
  orderStatus: string;
  channel: string;
  side: string;
  enter: string;
  page: number;
  size: number;
};

export type OrderBookItem = {
  price: string;
  volume: string;
  side: "B" | "S";
};

export type OrderBook = {
  symbol: string;
};
