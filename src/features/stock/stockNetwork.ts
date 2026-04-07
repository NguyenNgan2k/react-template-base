import { apiRequest } from "@/networks/apiRequest";
import type { StockInfoRequest, StockInfo } from "./stockType";

export const apiFetchStockInfo = async (
  params?: StockInfoRequest,
): Promise<StockInfo> => {
  const res = await apiRequest.get<StockInfo>(
    `/broker/stocks/${params?.stock}/info`,
    { params: params?.data },
  );
  return res.data;
};
