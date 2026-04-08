import { apiRequest } from "@/networks/apiRequest";
import type { StockInfoRequest, StockInfoResponse } from "./stockType";

export const apiFetchStockInfo = async (
  params?: StockInfoRequest,
): Promise<StockInfoResponse> => {
  const res = await apiRequest.get<StockInfoResponse>(
    `/broker/stocks/${params?.stock}/info`,
    { params: params?.data },
  );
  return res.data;
};
