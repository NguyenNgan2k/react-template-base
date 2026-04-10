import { apiRequest } from "@/networks/apiRequest";
import type { OrderDetailRequest } from "./orderType";

export const apiFetchOrderDetail = async (
  params: OrderDetailRequest,
): Promise<OrderDetailRequest> => {
  const res = await apiRequest.get<OrderDetailRequest>(
    `/orders/${params}/detail`,
  );
  return res.data;
};
