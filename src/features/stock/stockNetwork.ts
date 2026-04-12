import { apiRequest } from "@/networks/apiRequest";
import type { StockInfoRequest, StockInfoResponse, Stock } from "./stockType";

export const apiFetchStockInfo = async (
  params?: StockInfoRequest,
): Promise<StockInfoResponse> => {
  const res = await apiRequest.get<StockInfoResponse>(
    `/broker/stocks/${params?.stock}/info`,
    { params: params?.data },
  );
  return res.data;
};

export const apiFetchStockList = async (): Promise<Stock[]> => {
  const res = await apiRequest.get<Stock[]>(`/broker/reference/shares`);
  return res.data;
};
