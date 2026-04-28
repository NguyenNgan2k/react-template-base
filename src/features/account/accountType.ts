import type { PaginationParams } from "@/types";

export type AccountInfoRequest = {
  account: string;
};

export type CustomerInfoRequest = {
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

export type CustomerInfo = {
  [key: string]: string | number | boolean | null;
};

export type AccountStatusRequest = {
  account: string;
};

export type AccountStatus = {
  adv_loan_value: string;
  ap_t0: string;
  ap_t1: string;
  ap_t2: string;
  ar_t0: string;
  ar_t1: string;
  ar_t2: string;
  ar_value: string;
  assets: string;
  avaiColla: string;
  buy_unmatch: string;
  cash_advance_avai: string;
  cash_avai: string;
  cash_balance: string;
  cash_block: string;
  cash_inout: string;
  cash_temp_day_out: string;
  collateral: string;
  debt: string;
  deposit_fee: string;
  inday_gl: string;
  max_assets: string;
  max_rate: string;
  others_fee: string;
  payment: string;
  pc_cost: string;
  pc_ttr: string;
  pc_tts: string;
  right_value: string;
  sell_unmatch: string;
  sum_ap: string;
  temp_ee: string;
  tempee_used: string;
  tempee_using: string;
  total_asset: string;
  total_cash: string;
  total_debt: string;
  total_nav: string;
  total_right: string;
  total_stock: string;
  v_cash_begin: string;
  vsd: string;
  withdraw: string;
  withdrawal_cash: string;
  withdrawal_ee: string;
  group?: string;
  imKH?: string;
  call_lmv?: string;
  sell_lmv?: string;
  h?: string | number;
  total_equity?: string;
  tdck?: string;
  overDraft?: string;
  action?: string;
  margin_ratio?: string;
  margin_ratio_ub?: string;
  equity?: string;
  buy_mr?: string;
  ee_inc_app?: string | number;
  lmv?: string;
  loan_fee?: string;
  mr?: string;
  a1?: string;
  a2?: string;
  a3?: string;
  a4?: string;
  a5?: string;
  a6?: string;
  debtExpire?: string;
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
    size: number;
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

export type AccountListParams = {};

export type AccountListRequest = AccountListParams & PaginationParams;

export type AccountList = {};

export type AccountOrderBookParams = {
  account?: string;
};

export type AccountOrderBookRequest = {
  account?: string;
  data: PaginationParams;
};

export type AccountOrderBook = {
  accountCode: string;
  accountType: string;
  avgPrice: string;
  chanel: string;
  changePrice: number;
  com: number;
  group: string;
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
  tax: number;
  totalRow: number;
  unmatchVolume: number;
  marketingOrder: string;
};

export type AccountMatchedByStepPriceParams = {
  account?: string;
};

export type AccountMatchedByStepPriceRequest = {
  account?: string;
  data: PaginationParams;
};

export type AccountMatchedByStepPrice = {
  accountCode: string;
  cancelVol: number;
  cancel?: number;
  group: string;
  matchVol: number;
  matchedVal: number;
  amount?: number;
  orderVol: number;
  rowNo: number;
  rowType: string;
  shareCode: string;
  symbol?: string;
  side: "B" | "S";
  stepPrice: string | number | null;
  totalRow: number;
  unmatchVol: number;
};

export type AccountMatchedByStockParams = {
  account?: string;
};

export type AccountMatchedByStockRequest = {
  account?: string;
  data: PaginationParams;
};

export type AccountMatchedByStock = {
  totalRow: string;
  side?: string;
  symbol?: string;
  matchedVolume?: string | number;
  averagePrice?: string | number;
  value?: string | number;
  temporaryFee?: string | number;
  tax?: string | number;
};

export type AccountProfitLossParams = {
  account?: string;
  fromDate?: string;
  toDate?: string;
  symbol?: string;
};

export type AccountProfitLossRequest = AccountProfitLossParams &
  PaginationParams;

export type AccountProfitLoss = {
  totalRow: string;
  rowNo?: string | number;
  symbol?: string;
  sellVolume?: string | number;
  averageSellPrice?: string | number;
  sellValue?: string | number;
  costPrice?: string | number;
  costValue?: string | number;
  profitLoss?: string | number;
  profitLossPercent?: string | number;
};

export type AccountLMVRequest = {
  account: string;
};

export type AccountLMV = {
  at: number;
  lmv: number;
  lmv_0: number;
  lp: number;
  mp: number;
  mr: number;
  p: number;
  pc: string;
  plg: string;
  rp: number;
  s: string;
  sector: string;
  t: string;
  temp: number;
};

export type AccountLMVEERequest = {
  account: string;
};

export type AccountLMVEE = {
  at: number;
  debt_vol: number;
  debt_vol_bb: number;
  debt_vol_ub: number;
  ee_vol: number;
  lmv: number;
  lp: number;
  max_vol: number;
  mp: number;
  mr: number;
  p: number;
  plg: string;
  rp: number;
  s: string;
  sector: string;
  t: string;
};

export type AccountLMVUBRequest = {
  account: string;
};

export type AccountLMVUB = {
  eeUb: number;
  items: {
    at: number;
    eeub: number;
    inday: number;
    lmv: number;
    lp: number;
    mp: number;
    p: number;
    s: string;
    t: string;
    total: number;
    ub: string;
  }[];
};

export type AccountDebtRequest = {
  account: string;
};

export type AccountDebt = {
  fee: number;
  limit: number;
  loan: number;
  source: string;
};

export type AccountDebtExpire = {
  source: string;
  expiredDate: string;
  loan: number;
  fee: number;
};

export type AccountForceCellRequest = {
  account: string;
  data: {
    symbol: string;
    price: string;
    volume: string;
  };
};

export type AccountForceCell = {
  asset_value: string;
  debt_value: string;
  margin_rate: string;
  net_value: string;
  share_volume: string;
};
