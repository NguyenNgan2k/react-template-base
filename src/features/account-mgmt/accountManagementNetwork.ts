import { apiRequest } from "@/networks/apiRequest";
import type {
  AbnormalLimit,
  AbnormalLimitRequest,
  AccountFilter,
  AccountFilterRequest,
  CollateralAssets,
  CollateralAssetsRequest,
  LoanableSecurities,
  LoanableSecuritiesRequest,
  MarginAccount,
  MarginAccountRequest,
  RegularAccount,
  RegularAccountRequest,
  ResourceManagement,
  ResourceManagementRequest,
  StockOwnership,
  StockOwnershipRequest,
  UbViolation,
  UbViolationRequest,
} from "./accountManagementType";

export const apiFetchRegularAccount = async (
  params: RegularAccountRequest,
): Promise<RegularAccount> => {
  const res = await apiRequest.get<RegularAccount>(
    "/broker/management/accounts/nm",
    { params },
  );
  return res.data;
};

export const apiFetchMarginAccount = async (
  params: MarginAccountRequest,
): Promise<MarginAccount> => {
  const res = await apiRequest.get<MarginAccount>(
    "/broker/management/accounts/mg",
    { params },
  );
  return res.data;
};

export const apiFetchStockOwnership = async (
  params: StockOwnershipRequest,
): Promise<StockOwnership> => {
  const res = await apiRequest.get<StockOwnership>(
    "/broker/orders/account-management/stock-ownership",
    { params },
  );
  return res.data;
};

export const apiFetchAbnormalLimit = async (
  params: AbnormalLimitRequest,
): Promise<AbnormalLimit> => {
  const res = await apiRequest.get<AbnormalLimit>(
    "/broker/orders/account-management/abnormal-limit",
    { params },
  );
  return res.data;
};

export const apiFetchLoanableSecurities = async (
  params: LoanableSecuritiesRequest,
): Promise<LoanableSecurities> => {
  const res = await apiRequest.get<LoanableSecurities>(
    "/broker/orders/account-management/loanable-securities",
    { params },
  );
  return res.data;
};

export const apiFetchResourceManagement = async (
  params: ResourceManagementRequest,
): Promise<ResourceManagement> => {
  const res = await apiRequest.get<ResourceManagement>(
    "/broker/orders/account-management/resource-management",
    { params },
  );
  return res.data;
};

export const apiFetchCollateralAssets = async (
  params: CollateralAssetsRequest,
): Promise<CollateralAssets> => {
  const res = await apiRequest.get<CollateralAssets>(
    "/broker/orders/account-management/collateral-assets",
    { params },
  );
  return res.data;
};

export const apiFetchAccountFilter = async (
  params: AccountFilterRequest,
): Promise<AccountFilter> => {
  const res = await apiRequest.get<AccountFilter>(
    "/broker/orders/account-management/filter",
    { params },
  );
  return res.data;
};

export const apiFetchUbViolation = async (
  params: UbViolationRequest,
): Promise<UbViolation> => {
  const res = await apiRequest.get<UbViolation>(
    "/broker/orders/account-management/ub-violation",
    { params },
  );
  return res.data;
};
