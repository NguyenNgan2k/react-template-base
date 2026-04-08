export type AccountInfoRequest = {
  account: string;
};

export type AccountInfo = {
  accountCode: string;
  accountType: string;
  custCode: string;
  marketingId: string;
  marketingName: string;
  group: string;
  id: string;
  cc: string;
  accountName: string;
};

export type AccountBalanceRequest = {
  account: string;
  data: {
    symbol: string;
    price: string;
    side: "B" | "S";
  };
};

export type AccountBalance = {
  accType: string;
  sym: string;
  balance: string;
  volumeAvaiable: string;
  marginratio: string;
  accName: string;
  maxFee: string;
  cashAvaiable: string;
  ee: string;
  pp: string;
  im_ck: string;
};

export type AccountPortfolioRequest = {
  account: string;
  data: {
    page: number;
    number: number;
  };
};

export type AccountPortfolio = {
  symbol: string;
  actual_vol: string;
  avaiable_vol: string;
  repo_vol: string;
  right_vol: string;
  margin_rate: string;
  buy_t1: string;
  sell_t1: string;
  buy_t2: string;
  sell_t2: string;
  buy_t0: string;
  sell_t0: string;
  account: string;
  sell_unmatch_vol: string;
  avg_price: string;
  value: string;
  market_price: string;
  market_value: string;
  gain_loss_value: string;
  gl: string;
  color: string;
  pc_sym: string;
  pc: string;
  chart: string;
  sellPrice: string;
  buyPrice: string;
  sectorVN: string;
  sectorEN: string;
  f: string;
  mc: string;
  gain_loss_per: string;
  relized: string;
  plg: string;
  rowNo: number;
  totalRow: number;
};
