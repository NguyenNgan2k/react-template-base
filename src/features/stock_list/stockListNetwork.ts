import { apiRequest } from "@/networks/apiRequest";
import type {
  HaltRequest,
  HaltStock,
  TradingRequest,
  TradingStock,
} from "./stockListType";

export const apiFetchHaltStockList = async (
  params: HaltRequest,
): Promise<HaltStock[]> => {
  const res = await apiRequest.get<HaltStock[]>(
    "/broker/orders/stock-list/halt",
    {
      params,
    },
  );
  return res.data;
};

export const apiFetchTradingStockList = async (
  params: TradingRequest,
): Promise<TradingStock[]> => {
  const res = await apiRequest.get<TradingStock[]>(
    "/broker/orders/stock-list/trading",
    {
      params,
    },
  );
  return res.data;
};
