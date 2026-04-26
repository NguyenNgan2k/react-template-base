import type { PaginationParams } from "@/types";

export type RegularAccountParams = {};

export type RegularAccountRequest = RegularAccountParams & PaginationParams;

export type RegularAccount = {
  accountCode: string;
  accountName: string;
  asset: string | number;
  blockDate: string | null;
  callDay: string | number | null;
  debt: string | number | null;
  debtExpire: string | null;
  groupType: string | null;
  level: number;
  marginRatio: string | number;
  marginRr: string | number;
  marketingId: string;
  marketingName: string;
  qtrrBlock: string | null;
  rowNo: number;
  sendSms: string | number | null;
  status: string | null;
  sumAp: string | number;
  totalRow: string | number;
};

export type ListProductParams = {};

export type ListProductRequest = ListProductParams & PaginationParams;

export type ListProduct = {
  productCode: string;
  productName: string;
  status: string;
  totalRow: string;
};

export type MarginAccountParams = {
  marketingId?: string;
  groupProduct?: string;
  overdueDebt?: string;
  status?: string;
};

export type MarginAccountRequest = MarginAccountParams & PaginationParams;

export type MarginAccount = {
  accountNo: string;
  customerName: string;
  group: string;
  totalAsset: string;
  debt: string;
  overdueDebt: string;
  requiredSellValue: string;
  additionalCashRequired: string;
  status: string;
  ratio: string;
  callDays: string;
  totalRow: string;
};

export type StockOwnershipParams = {
  symbol?: string;
};

export type StockOwnershipRequest = StockOwnershipParams & PaginationParams;

export type StockOwnership = {
  accountNo: string;
  marketingId: string;
  symbol: string;
  total: string;
  trading: string;
  pledge: string;
  rights: string;
  buyT2: string;
  sellT2: string;
  buyT1: string;
  sellT1: string;
  buyT0: string;
  sellT0: string;
  averagePrice: string;
  marketPrice: string;
  marketValue: string;
  unrealizedProfitLoss: string;
  unrealizedProfitLossPercent: string;
  totalRow: string;
};

export type AbnormalLimitParams = {};

export type AbnormalLimitRequest = AbnormalLimitParams & PaginationParams;

export type AbnormalLimit = {
  accountNo: string;
  abnormalLimit: string;
  matchedBuyValue: string;
  requiredDepositAmount: string;
  buyingPower: string;
  marginRatio: string;
  marginCallRate: string;
  marginSellRate: string;
  totalRow: string;
};

export type LoanableSecuritiesParams = {
  symbol?: string;
  group?: string;
};

export type LoanableSecuritiesRequest = LoanableSecuritiesParams & PaginationParams;

export type LoanableSecurities = {
  symbol: string;
  ceilingPrice: string;
  floorPrice: string;
  referencePrice: string;
  marginRate: string;
  pledgeRate: string;
  loanLimit: string;
  blockedPrice: string;
  marketPrice: string;
  room: string;
  value: string;
  debt: string;
  intradayVolume: string;
  remainingValue: string;
  remainingVolume: string;
  loanRoom: string;
  loanValue: string;
  loanDebt: string;
  loanIntradayVolume: string;
  loanRemainingValue: string;
  loanRemainingVolume: string;
  totalRow: string;
};

export type ResourceManagementParams = {};

export type ResourceManagementRequest = ResourceManagementParams & PaginationParams;

export type ResourceManagement = {
  accountNo: string;
  accountLimit: string;
  orderValue: string;
  openingDebt: string;
  cash: string;
  accruedDebt: string;
  totalRow: string;
};

export type CollateralAssetsParams = {};

export type CollateralAssetsRequest = CollateralAssetsParams & PaginationParams;

export type CollateralAssets = {
  accountNo: string;
  customerName: string;
  group: string;
  totalAsset: string;
  debt: string;
  apAdvWithdraw: string;
  status: string;
  requiredCollateralValue: string;
  collateralAssetValue: string;
  ratio: string;
  totalRow: string;
};

export type AccountFilterParams = {
  symbol?: string;
  debt?: string;
  weight?: string;
};

export type AccountFilterRequest = AccountFilterParams & PaginationParams;

export type AccountFilter = {
  accountNo: string;
  customerName: string;
  group: string;
  totalAsset: string;
  debt: string;
  ratio: string;
  status: string;
  symbol: string;
  volume: string;
  weight: string;
  totalRow: string;
};

export type UbViolationParams = {};

export type UbViolationRequest = UbViolationParams & PaginationParams;

export type UbViolation = {
  accountNo: string;
  customerName: string;
  marketingId: string;
  ubAsset: string;
  debt: string;
  apAdvWithdraw: string;
  ratio: string;
  ubCall: string;
  ubForce: string;
  status: string;
  totalRow: string;
};
