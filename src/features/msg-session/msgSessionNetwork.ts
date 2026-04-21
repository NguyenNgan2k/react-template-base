import { apiRequest } from "@/networks/apiRequest";
import type { MsgSession, MsgSessionRequest } from "./msgSessionType";

export const apiFetchMsgSession = async (
  params: MsgSessionRequest,
): Promise<MsgSession> => {
  const res = await apiRequest.get<MsgSession>("/broker/orders/message-session", {
    params,
  });
  return res.data;
};
