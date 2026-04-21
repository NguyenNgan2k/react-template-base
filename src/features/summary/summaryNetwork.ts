import { apiRequest } from "@/networks/apiRequest";
import type {
  StockSummary,
  StockSummaryRequest,
  BrokerSummary,
  ChannelSummary,
  ChannelSummaryRequest,
  TransactionSummaryRequest,
} from "./summaryType";

export const apiFetchTransactionSummary = async (
  params: TransactionSummaryRequest,
): Promise<BrokerSummary[]> => {
  const res = await apiRequest.get<BrokerSummary[]>(
    "/broker/orders/summary/transaction",
    {
      params,
    },
  );
  return res.data;
};

export const fetchChannelSummary = async (
  params: ChannelSummaryRequest,
): Promise<ChannelSummary[]> => {
  const res = await apiRequest.get<ChannelSummary[]>(
    "/broker/orders/summary/channel",
    {
      params,
    },
  );
  return res.data;
};

export const apiFetchStockSummary = async (
  params: StockSummaryRequest,
): Promise<StockSummary[]> => {
  const res = await apiRequest.get<StockSummary[]>(
    "/broker/orders/summary/stock",
    {
      params,
    },
  );
  return res.data;
};

export const fetchStockSummary = async (
  params: StockSummaryRequest,
): Promise<StockSummary[]> => apiFetchStockSummary(params);
