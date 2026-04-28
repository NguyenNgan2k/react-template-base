import { apiRequest } from "@/networks/apiRequest";
import type {
  AccountInfoRequest,
  AccountInfo,
  CustomerInfoRequest,
  CustomerInfo,
  AccountStatusRequest,
  AccountStatus,
  AccountBalanceRequest,
  AccountBalance,
  AccountPortfolioRequest,
  AccountPortfolio,
  AccountListRequest,
  AccountList,
  AccountOrderBook,
  AccountOrderBookRequest,
  AccountMatchedByStepPrice,
  AccountMatchedByStepPriceRequest,
  AccountMatchedByStock,
  AccountMatchedByStockRequest,
  AccountProfitLoss,
  AccountProfitLossRequest,
  AccountLMV,
  AccountLMVRequest,
  AccountLMVEE,
  AccountLMVEERequest,
  AccountLMVUB,
  AccountLMVUBRequest,
  AccountDebt,
  AccountDebtRequest,
  AccountForceCell,
  AccountForceCellRequest,
} from "./accountType";

export const apiFetchAccountInfo = async (
  params?: AccountInfoRequest,
): Promise<AccountInfo> => {
  const res = await apiRequest.get<AccountInfo>(
    `/broker/accounts/${params?.account}/info`,
  );
  return res.data;
};

export const apiFetchCustomerInfo = async (
  params?: CustomerInfoRequest,
): Promise<CustomerInfo> => {
  const res = await apiRequest.get<CustomerInfo>(
    `/broker/accounts/${params?.account}/customer-info`,
  );
  return res.data;
};

export const apiFetchAccountStatus = async (
  params?: AccountStatusRequest,
): Promise<AccountStatus> => {
  const res = await apiRequest.get<AccountStatus>(
    `/broker/accounts/${params?.account}/status`,
  );
  return res.data;
};

export const apiFetchAccountBalance = async (
  params?: AccountBalanceRequest,
): Promise<AccountBalance> => {
  const res = await apiRequest.get<AccountBalance>(
    `/broker/accounts/${params?.account}/balance`,
    { params: params?.data },
  );
  return res.data;
};

export const apiFetchAccountPortfolio = async (
  params?: AccountPortfolioRequest,
): Promise<AccountPortfolio[]> => {
  const res = await apiRequest.get<AccountPortfolio[]>(
    `/broker/accounts/${params?.account}/portfolio`,
    { params: params?.data },
  );
  return res.data;
};

export const apiFetchAccountList = async (
  params?: AccountListRequest,
): Promise<AccountList> => {
  const res = await apiRequest.get<AccountList>("/broker/orders/accounts", {
    params,
  });
  return res.data;
};

export const apiFetchAccountOrderBook = async (
  params?: AccountOrderBookRequest,
): Promise<AccountOrderBook[]> => {
  const res = await apiRequest.get<AccountOrderBook[]>(
    `/broker/accounts/${params?.account}/orders`,
    { params: params?.data },
  );
  return res.data;
};

export const apiFetchAccountMatchedByStepPrice = async (
  params?: AccountMatchedByStepPriceRequest,
): Promise<AccountMatchedByStepPrice[]> => {
  const res = await apiRequest.get<AccountMatchedByStepPrice[]>(
    `/broker/accounts/${params?.account}/orders/by-price`,
    { params: params?.data },
  );
  return res.data;
};

export const apiFetchAccountMatchedByStock = async (
  params?: AccountMatchedByStockRequest,
): Promise<AccountMatchedByStock[]> => {
  const res = await apiRequest.get<AccountMatchedByStock[]>(
    `/broker/accounts/${params?.account}/orders/by-stock`,
    { params: params?.data },
  );
  return res.data;
};

export const apiFetchAccountProfitLoss = async (
  params?: AccountProfitLossRequest,
): Promise<AccountProfitLoss[]> => {
  const res = await apiRequest.get<AccountProfitLoss[]>(
    "/broker/orders/account/profit-loss",
    {
      params,
    },
  );
  return res.data;
};

export const apiFetchAccountLMV = async (
  params?: AccountLMVRequest,
): Promise<AccountLMV> => {
  const res = await apiRequest.get<AccountLMV>(
    `/broker/accounts/${params?.account}/lmv`,
  );
  return res.data;
};

export const apiFetchAccountLMVEE = async (
  params?: AccountLMVEERequest,
): Promise<AccountLMVEE> => {
  const res = await apiRequest.get<AccountLMVEE>(
    `/broker/accounts/${params?.account}/lmv/ee`,
  );
  return res.data;
};

export const apiFetchAccountLMVUB = async (
  params?: AccountLMVUBRequest,
): Promise<AccountLMVUB> => {
  const res = await apiRequest.get<AccountLMVUB>(
    `/broker/accounts/${params?.account}/lmv/ub`,
  );
  return res.data;
};

export const apiFetchAccountDebt = async (
  params?: AccountDebtRequest,
): Promise<AccountDebt> => {
  const res = await apiRequest.get<AccountDebt>(
    `/broker/accounts/${params?.account}/debt`,
  );
  return res.data;
};

export const apiFetchAccountForceCell = async (
  params?: AccountForceCellRequest,
): Promise<AccountForceCell> => {
  const res = await apiRequest.get<AccountForceCell>(
    `/broker/accounts/${params?.account}/force-sell`,
    { params: params?.data },
  );
  return res.data;
};
