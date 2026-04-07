import { apiRequest } from "@/networks/apiRequest";
import type { CashInforParams, CashInforResponse } from "@/types";

export const fetchCashInforApi = async (
  params?: CashInforParams,
): Promise<CashInforResponse> => {
  const res = await apiRequest.get<CashInforResponse>(`/cash/account/info`, {
    params,
  });
  return res.data;
};
