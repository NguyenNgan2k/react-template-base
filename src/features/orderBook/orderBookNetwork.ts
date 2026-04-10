import { apiRequest } from "@/networks/apiRequest";
import type { OrderBookRequest, OrderBook } from "./orderBookType";

export const apiFetchOrderBook = async (
  params: OrderBookRequest,
): Promise<OrderBook> => {
  const res = await apiRequest.get<OrderBook>("/orders/inday", {
    params,
  });
  return res.data;
};
