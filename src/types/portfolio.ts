import type { ApiResponse } from "./common";

export interface PortfolioParams {
  user: string;
  accountCode: string;
}

export interface Portfolio {
  v_cash_begin: string;
  cash_balance: string;
  debt: string;
  cash_avai: string;
  withdrawal_cash: string;
  withdrawal_ee: string;
  payment: string;
  temp_ee: string;
  ap_t0: string;
  ap_t1: string;
  ap_t2: string;
  ar_t0: string;
  ar_t1: string;
  ar_t2: string;
  ar_value: string;
  collateral: string;
  right_value: string;
  total_right: string;
  sell_unmatch: string;
  buy_unmatch: string;
  cash_block: string;
  sum_ap: string;
  withdraw: string;
  deposit_fee: string;
  tempee_used: string;
  tempee_using: string;
  assets: string;
  cash_advance_avai: string;
  avaiColla: string;
  cash_inout: string;
  cash_temp_day_out: string;
  vsd: string;
  others_fee: string;
  total_asset: string;
  max_assets: string;
  total_cash: string;
  total_debt: string;
  total_stock: string;
  total_nav: string;
  max_rate: string;
  inday_gl: string;
  pc_ttr: string;
  pc_tts: string;
  pc_cost: string;
  adv_loan_value: string;
}

export type PortfolioResponse = ApiResponse<Portfolio>;

export interface PortfolioInforParams {
  user: string;
  accountCode: string;
  page: number;
  size: number;
}

export interface PortfolioInfor {
  symbol: string;
  actual_vol: string;
  avaiable_vol: string;
  repo_vol: string;
  right_vol: string;
  margin_rate: "1";
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
}

export type PortfolioInforResponse = ApiResponse<PortfolioInfor[]>;

export interface CategoryTableType {
  symbol: string;
  actual_vol: string;
  buy_t0: string;
  buy_t1: string;
  buy_t2: string;
  avaiable_vol: string;
  avg_price: string;
  value: string;
  market_price: string;
  gain_loss_value: string;
  gain_loss_per: string;
}
export interface HistoryPortfolioTransferPayload {
  user: string;
  accountAuthor: string;
  fromDate: string;
  toDate: string;
  shareCode: string;
  status: string;
  page: number;
  size: number;
}

export interface HistoryPortfolioTransfer {
  rowNum: number;
  cBusinessCode: string;
  cTransactionNo: string;
  cAccountOut: string;
  cAccountOutName: string;
  cAccountIn: string;
  cAccountInName: string;
  cShareCode: string;
  cShareStatusOut: string;
  cShareStatusIn: string;
  cShareVolume: number;
  cTransactionDate: string;
  cContent: string;
  cStatus: string;
  cCreatorCode: string;
  cCreateTime: string;
  cApproverCode: string;
  cStatusName: string;
  cStatusNameEn: string;
  cRejectNote: null;
  cTotalRecord: number;
}

export interface PortfolioShareBalancePayload {
  user: string;
  accountCode: string;
  shareCode: string;
  page: number;
  size: number;
}

export interface PortfolioShareBalance {
  rowNum: number;
  cAccountCode: string;
  cShareCode: string;
  cShareStatus: string;
  cShareStatusName: string;
  cShareBalance: number;
  cShareAvaiable: number;
  cShareWithdrable: number;
  cTotalRecord: number;
}

export interface StockTransferPayload {
  user: string;
  accountIn: string;
  accountOut: string;
  shareCode: string;
  shareVolume: number;
  shareStatus: string;
  channel: string;
}
