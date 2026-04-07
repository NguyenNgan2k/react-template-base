import { apiRequest } from "../networks/apiRequest";
import type {
  FetchCashBalanceParams,
  FetchCashBalanceResponse,
  FetchOrdersIndayParams,
  FetchOrdersIndayResponse,
  FetchOrdersOvertimeParams,
  FetchOrdersOvertimeResponse,
  FetchOrdersResponse,
  FetchShareCodeResponse,
  OrderCancelParams,
  OrderCancelResponse,
  OrderChangeParams,
  OrderChangeResponse,
  OrderParams,
  TradeHistoryParams,
  TradeHistoryResponse,
} from "../types/placeOrder";

export const fetchShareCodeApi = async (
  shareCode: string,
  volume: number,
): Promise<FetchShareCodeResponse> => {
  const res = await apiRequest.get<FetchShareCodeResponse>(
    `/reference/shares/${shareCode}`,
    {
      params: { volume },
    },
  );
  return res.data;
};

export const fetchShareStockApi = async (): Promise<FetchShareCodeResponse> => {
  const res = await apiRequest.get<FetchShareCodeResponse>(`/reference/shares`);
  return res.data;
};

export const fetchOrdersApi = async (
  side: "BUY" | "SELL",
  params: OrderParams,
): Promise<FetchOrdersResponse> => {
  const res = await apiRequest.post<FetchOrdersResponse>(
    `/orders/${side.toLowerCase()}`,
    params,
  );

  return res.data;
};

export const fetchOrdersInday = async (
  params: FetchOrdersIndayParams,
): Promise<FetchOrdersIndayResponse> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await apiRequest.get<FetchOrdersIndayResponse>(
    `/orders/inday?page=1&size=200&${query.toString()}`,
  );

  return res.data;
};

export const fetchOrdersOvertime = async (
  params: FetchOrdersOvertimeParams,
): Promise<FetchOrdersOvertimeResponse> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await apiRequest.get<FetchOrdersOvertimeResponse>(
    `/orders/advance?page=1&size=200&${query.toString()}`,
  );

  return res.data;
};

export const fetchCashBalanceApi = async (
  params: FetchCashBalanceParams,
): Promise<FetchCashBalanceResponse> => {
  const res = await apiRequest.post<FetchCashBalanceResponse>(
    `/cash/balance`,
    params,
  );
  return res.data;
};

export const fetchChangeOrderApi = async (
  params: OrderChangeParams,
  otp: string,
): Promise<OrderChangeResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.post<OrderChangeResponse>(
    `/orders/change`,
    params,
    { headers },
  );

  return res.data;
};

export const fetchCancelOrderApi = async (
  params: OrderCancelParams,
  otp: string,
): Promise<OrderCancelResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.post<OrderCancelResponse>(
    `/orders/cancel`,
    params,
    { headers },
  );

  return res.data;
};

export const fetchTradeHistoryApi = async (
  symbol: string,
  params?: TradeHistoryParams,
): Promise<TradeHistoryResponse> => {
  const res = await apiRequest.get<TradeHistoryResponse>(
    `/mda/trade/${symbol}/history`,
    { params },
  );
  return res.data;
};
