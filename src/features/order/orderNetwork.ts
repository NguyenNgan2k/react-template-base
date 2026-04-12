import { apiRequest } from "@/networks/apiRequest";
import type { OrderHistoryRequest } from "./orderType";

export const apiFetchOrderHistory = async (
  params: OrderHistoryRequest,
): Promise<OrderHistoryRequest> => {
  const res = await apiRequest.get<OrderHistoryRequest>(
    `/broker/orders/${params}/detail`,
  );
  return res.data;
};
