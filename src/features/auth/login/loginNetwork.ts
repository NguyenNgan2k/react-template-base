import { apiRequest } from "@/networks/apiRequest";
import type { LoginRequest, LoginResponse } from "./loginType";

export const apiLogin = async (
  params?: LoginRequest,
): Promise<LoginResponse> => {
  const res = await apiRequest.post<LoginResponse>("/auth/login", params);
  return res.data;
};
