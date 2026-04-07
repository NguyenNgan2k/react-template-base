import { apiRequest } from "../networks/apiRequest";
import type { ListStockByIdResponse, VolumeByPriceResponse } from "../types";

export async function fetchListStockByIdAPI(
  id: string,
): Promise<ListStockByIdResponse> {
  const res = await apiRequest.get(`/evg/groups/list/${id}`);
  return res.data;
}

export async function fetchVolumeByPriceAPI(
  id: string,
): Promise<VolumeByPriceResponse> {
  const res = await apiRequest.get(`/mda/trade/${id}/volume-by-price`);
  return res.data;
}
