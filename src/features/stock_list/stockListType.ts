import type { PaginationParams } from "@/types";

export type HaltParams = {
  symbol?: string;
  tradingStatus?: string;
};

export type HaltRequest = HaltParams & PaginationParams;

export type HaltStock = {
  totalRow: string;
  symbol?: string;
  issuerName?: string;
  market?: string;
  stockType?: string;
  listedVolume?: string | number;
  returnedTradingDate?: string;
  ceilingPrice?: string | number;
  referencePrice?: string | number;
  floorPrice?: string | number;
  closePrice?: string | number;
  adminStatus?: string;
  methodStatus?: string;
  tradingStatus?: string;
};

export type TradingParams = {
  symbol?: string;
  tradingStatus?: string;
};

export type TradingRequest = TradingParams & PaginationParams;

export type TradingStock = {
  totalRow: string;
  symbol?: string;
  board?: string;
  ceilingPrice?: string | number;
  referencePrice?: string | number;
  floorPrice?: string | number;
  isTradeBlocked?: string | boolean;
  blockCustomerBuy?: string | boolean;
  blockCustomerSell?: string | boolean;
  blockProprietaryBuy?: string | boolean;
  blockProprietarySell?: string | boolean;
  adminStatus?: string;
  methodStatus?: string;
  tradingStatus?: string;
};
