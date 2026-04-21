import { apiRequest } from "@/networks/apiRequest";
import type {
  Advertisement,
  AdvertisementRequest,
  PutThrough,
  PutThroughRequest,
} from "./putthroughType";

export const apiFetchPutThrough = async (
  params: PutThroughRequest,
): Promise<PutThrough> => {
  const res = await apiRequest.get<PutThrough>("/broker/orders/putthrough", {
    params,
  });
  return res.data;
};

export const apiFetchAdvertisement = async (
  params: AdvertisementRequest,
): Promise<Advertisement> => {
  const res = await apiRequest.get<Advertisement>(
    "/broker/orders/advertisement",
    { params },
  );
  return res.data;
};
