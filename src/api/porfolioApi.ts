import { apiRequest } from "@/networks/apiRequest";
import type {
  PortfolioInforParams,
  PortfolioInforResponse,
  PortfolioParams,
  PortfolioResponse,
} from "@/types";

export const fetchPortfolioApi = async (
  params?: PortfolioParams,
): Promise<PortfolioResponse> => {
  const res = await apiRequest.get<PortfolioResponse>(`/portfolio/account`, {
    params,
  });
  return res.data;
};

export const fetchPortfolioInforApi = async (
  params?: PortfolioInforParams,
): Promise<PortfolioInforResponse> => {
  const res = await apiRequest.get<PortfolioInforResponse>(`/portfolio/info`, {
    params,
  });
  return res.data;
};
