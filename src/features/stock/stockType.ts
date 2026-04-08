export type StockInfoRequest = {
  stock: string;
  data: {
    account: string;
    volume: string;
    type: "N" | "P";
  };
};

export type StockInfoResponse = {
  id: number;
  sym: string;
  fullName: string;
  name_vn: string;
  c: string;
  f: string;
  r: string;
  lastPrice: string;
  lastVolume: number;
  fRoom: string;
  cl: string;
  g1: string;
  g2: string;
  g3: string;
  g4: string;
  g5: string;
  g6: string;
  g7: string;
  mc: string;
  mr: string;
  limit: string;
  fBVol: string;
  fSVolume: string;
  stepPrice: number;
  code: string;
  stockType: string;
  status_info: string;
  force_use: string;
  trade_date: string;
  board_id: string;
  ForeignBuy: string;
  ForeignSell: string;
  ForeignTotalRoom: string;
  ForeignRoom: string;
  highPrice: string;
  lowPrice: string;
  avePrice: string;
  listedVol: string;
  marginFlag: string;
};

export type StockInfo = {
  id: number;
  sym: string;
  fullName: string;
  name_vn: string;
  c: number;
  f: number;
  r: number;
  step: number;
  mc: string;
  board_id: string;
  market_price: Array<string>;
};
