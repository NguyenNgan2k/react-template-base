import { apiRequest } from "@/networks/apiRequest";
import type {
  ChechkAccountParams,
  ChechkAccountResponse,
  FetchOpenCheckIdParams,
  FetchOpenCheckIdResponse,
  FetchOpenHoldParams,
  FetchOpenHoldResponse,
  FetchOpenRandomAccountReponse,
  OpenAccountPayload,
  OpenAccountPayloadResponse,
  OtpInitParams,
  OtpInitResponse,
  PreCheckParams,
  PreCheckResponse,
  UploadImageResponse,
} from "@/types/openAccount";

export async function fetchCheckInfo(
  params: PreCheckParams,
): Promise<PreCheckResponse> {
  const res = await apiRequest.post("/accounts/open/pre-check", params);

  return res.data;
}

export async function fetchCheckAccount(
  params: ChechkAccountParams,
): Promise<ChechkAccountResponse> {
  const res = await apiRequest.post("/accounts/availability/check", params);

  return res.data;
}

export async function fetchOpenRandomAccount(): Promise<FetchOpenRandomAccountReponse> {
  const res = await apiRequest.get("/accounts/open/random");

  return res.data;
}

export async function fetchUploadFrontIdImage(
  params: FormData,
): Promise<UploadImageResponse> {
  const res = await apiRequest.post("/accounts/docs/front-id/upload", params, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function fetchUploadBackIdImage(
  params: FormData,
): Promise<UploadImageResponse> {
  const res = await apiRequest.post("/accounts/docs/back-id/upload", params, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function fetchOpenCheckId(
  params: FetchOpenCheckIdParams,
): Promise<FetchOpenCheckIdResponse> {
  const res = await apiRequest.post("/accounts/open/check-id", params);

  return res.data;
}

export async function fetchOpenHold(
  params: FetchOpenHoldParams,
): Promise<FetchOpenHoldResponse> {
  const res = await apiRequest.post(`/accounts/open/hold`, params);
  return res.data;
}

export async function fetchInitOtp(
  params: OtpInitParams,
): Promise<OtpInitResponse> {
  const res = await apiRequest.post(`/auth/otp/init`, params);
  return res.data;
}

export async function fetchOpenAccount(
  params: OpenAccountPayload,
): Promise<OpenAccountPayloadResponse> {
  const res = await apiRequest.post(`/accounts/open/update`, params);
  return res.data;
}
