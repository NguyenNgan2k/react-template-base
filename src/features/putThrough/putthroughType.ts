import type { PaginationParams } from "@/types";

export type PutThroughParams = {
  account?: string;
  orderNo?: string;
};

export type PutThroughRequest = PutThroughParams & PaginationParams;

export type PutThrough = {
  totalRow: string;
};

export type AdvertisementParams = {
  account?: string;
  orderNo?: string;
  firm?: string;
};

export type AdvertisementRequest = AdvertisementParams & PaginationParams;

export type Advertisement = {
  totalRow: string;
};
