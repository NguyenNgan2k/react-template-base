import { apiRequest } from "@/networks/apiRequest";
import type {
  AccountInfoRequest,
  AccountInfo,
  AccountBalanceRequest,
  AccountBalance,
  AccountPortfolioRequest,
  AccountPortfolio,
} from "./accountType";

export const apiFetchAccountInfo = async (
  params?: AccountInfoRequest,
): Promise<AccountInfo> => {
  const res = await apiRequest.get<AccountInfo>(
    `/broker/accounts/${params?.account}/info`,
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
): Promise<AccountPortfolio> => {
  console.log("apiFetchAccountPortfolio called with params: ", params);
  const res = await apiRequest.get<AccountPortfolio>(
    `/broker/accounts/${params?.account}/portfolio`,
    { params: params?.data },
  );
  return res.data;
};
