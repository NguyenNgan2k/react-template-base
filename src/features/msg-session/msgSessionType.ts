import type { PaginationParams } from "@/types";

export type MsgSessionParams = {
  type?: string;
  data?: string;
};

export type MsgSessionRequest = MsgSessionParams & PaginationParams;

export type MsgSession = {
  totalRow: string;
  type?: string;
  data?: string;
  account?: string;
  mktId?: string;
  customerName?: string;
  ownershipNo?: string;
  content?: string;
  createdAt?: string;
  status?: string;
};
