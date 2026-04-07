import {} from "@/networks/apiAuth";
import { SESSION_ID_KEY, TOKEN_ID_KEY } from "../configs/auth";
import { apiRequest } from "../networks/apiRequest";
import type {
  FetchOtpPayload,
  FetchOtpResponse,
  HistoryLogin,
  ListHistoryLoginParams,
  LockAccountResponse,
  LoginPayload,
  LoginResponse,
  LogoutPayload,
} from "../types";
import { encryptToken } from "../utils";

export async function loginApi({
  user,
  password,
  device,
  channel,
  recaptchaToken,
}: LoginPayload): Promise<LoginResponse["data"]> {
  const payload = {
    user,
    password,
    device,
    channel,
  };

  const headers = recaptchaToken
    ? { "X-Captcha-Token": recaptchaToken }
    : undefined;

  const res = await apiAuth.post<LoginResponse>("/auth/login", payload, {
    headers,
  });
  const { rc, msg, data } = res.data;

  if (rc === 1) {
    const token = encryptToken(data, data.sessionId);
    localStorage.setItem(SESSION_ID_KEY, data.sessionId);
    localStorage.setItem(TOKEN_ID_KEY, token);

    return data;
  } else {
    throw new Error(msg || "Đăng nhập thất bại");
  }
}

export const fetchOtpApi = async (
  params: FetchOtpPayload,
): Promise<FetchOtpResponse> => {
  const res = await apiRequest.post<FetchOtpResponse>(
    "/auth/otp/request",
    params,
  );
  return res.data;
};

export const fetchLogoutApi = async (
  params: LogoutPayload,
  otp?: string,
): Promise<LockAccountResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.post<LockAccountResponse>(
    "auth/logout",
    params,
    {
      headers,
    },
  );

  return res.data;
};

// list history login
export async function fetchListHistoryLoginApi(
  params: ListHistoryLoginParams,
): Promise<HistoryLogin> {
  const res = await apiRequest.get("/auth/login/history", { params });

  return res.data;
}
