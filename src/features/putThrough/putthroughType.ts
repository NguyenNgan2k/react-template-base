export type PutThroughRequest = {
  account?: string;
  orderNo?: string;
  page: number;
  size: number;
};

export type PutThrough = {};

export type AdvertisementRequest = {
  account?: string;
  orderNo?: string;
  firm?: string;
  page: number;
  size: number;
};

export type Advertisement = {};
