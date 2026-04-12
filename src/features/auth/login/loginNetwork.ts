import { apiRequest } from "@/networks/apiRequest";
import type { ChangePassRequest, ChangePassResponse, LoginRequest, LoginResponse } from "./loginType";

export const apiLogin = async (
  params?: LoginRequest,
): Promise<LoginResponse> => {
  const res = await apiRequest.post<LoginResponse>("/auth/broker/login", params);
  return res.data;
};

export const apiChangePass = async (
  params?: ChangePassRequest,
): Promise<ChangePassResponse> => {
  const res = await apiRequest.post<ChangePassResponse>("/auth/broker/changePass", params);
  return res.data;
};