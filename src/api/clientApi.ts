import { apiRequest } from "../networks/apiRequest";
import type {
  AccountProfileResponse,
  ChangeAccountAvaPayload,
  ChangeAccountAvaResponse,
  ChangeAccountInfoPayload,
  ChangeAccountInfoResponse,
  ChangeNicknamePayload,
  ChangeNicknameResponse,
  ChangePassPayload,
  ChangePassResponse,
  ChangeSaleIdPayload,
  ChangeSaleIdResponse,
  CheckCardIdPayload,
  CheckCardIdResponse,
  CheckPassPayload,
  CheckPassResponse,
  DeleteBeneficiaryPayload,
  DeleteBeneficiaryResponse,
  ListAccountResponse,
  ListBank,
  LockAccountResponse,
  SaleInforResponse,
  UpdateBeneficiaryDefPayload,
  UpdateBeneficiaryDefResponse,
  UpdateBeneficiaryPayload,
  UpdateBeneficiaryResponse,
} from "../types/client";

export async function fetchAccountProfileAPI(): Promise<AccountProfileResponse> {
  const res = await apiRequest.get("/accounts/profile");

  return res.data;
}

export async function fetchListAccountAPI(): Promise<ListAccountResponse> {
  const res = await apiRequest.get("/accounts/list");

  return res.data;
}

export const changeNicknameApi = async (
  params: Pick<ChangeNicknamePayload, "NICK_NAME">,
): Promise<ChangeNicknameResponse> => {
  const res = await apiRequest.put<ChangeNicknameResponse>(
    "/accounts/nickname/change",
    params,
  );
  return res.data;
};

export const checkNicknameApi = async (
  params: string,
): Promise<ChangeNicknameResponse> => {
  const res = await apiRequest.get<ChangeNicknameResponse>(
    `/accounts/nickname/check?nickName=${params}`,
  );
  return res.data;
};

export const fetchChangeAccInfoApi = async (
  params: ChangeAccountInfoPayload,
  otp: string,
): Promise<ChangeAccountInfoResponse> => {
  const res = await apiRequest.put<ChangeAccountInfoResponse>(
    "/accounts/change",
    params,
    {
      headers: {
        "X-Otp": otp,
      },
    },
  );

  return res.data;
};

export const fetchChangeAccAvaApi = async (
  params: ChangeAccountAvaPayload,
): Promise<ChangeAccountAvaResponse> => {
  const res = await apiRequest.put<ChangeAccountAvaResponse>(
    "/accounts/avatar/change",
    params,
  );

  return res.data;
};

// === List bank API ===
export async function fetchListBankApi(): Promise<ListBank> {
  const res = await apiRequest.get("/accounts/bank/list");

  return res.data;
}

// === Thêm mới tài khoản thụ hưởng ===
export const fetchUpdateBeneficiaryApi = async (
  params: UpdateBeneficiaryPayload,
  otp?: string,
): Promise<UpdateBeneficiaryResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.post<UpdateBeneficiaryResponse>(
    "/accounts/beneficiary/update",
    params,
    { headers },
  );

  return res.data;
};

// === Đổi tài khoản thụ hưởng mặc định ===
export const fetchUpdateBeneficiaryDefApi = async (
  params: UpdateBeneficiaryDefPayload,
  otp?: string,
): Promise<UpdateBeneficiaryDefResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.put<UpdateBeneficiaryDefResponse>(
    "/accounts/beneficiary/default/update",
    params,
    { headers },
  );

  return res.data;
};

// === List account ben ===
export async function fetchListBeneficiaryApi(): Promise<UpdateBeneficiaryResponse> {
  const res = await apiRequest.get("/accounts/beneficiary/list");

  return res.data;
}

// ==== Xóa tài khoản thụ hưởng =====
export const fetchDeleteBeneficiaryApi = async (
  params: DeleteBeneficiaryPayload,
  otp?: string,
): Promise<DeleteBeneficiaryResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.delete<DeleteBeneficiaryResponse>(
    "/accounts/beneficiary/delete",
    {
      headers,
      data: params,
    },
  );

  return res.data;
};

// ==== Check pass ===
export const checkPassApi = async (
  params: CheckPassPayload,
): Promise<CheckPassResponse> => {
  const res = await apiRequest.post<CheckPassResponse>(
    `/auth/password/check`,
    params,
  );
  return res.data;
};

// ===Đổi mật khẩu====
export const fetchChangePassApi = async (
  params: ChangePassPayload,
  otp?: string,
): Promise<ChangePassResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.put<ChangePassResponse>(
    "/auth/password/change",
    params,
    { headers },
  );

  return res.data;
};

// ===check cardid====
export const checkCardIdApi = async (
  params: CheckCardIdPayload,
): Promise<CheckCardIdResponse> => {
  const res = await apiRequest.post<CheckCardIdResponse>(
    `/auth/card-id/check`,
    params,
  );
  return res.data;
};

// get saleinfor
export async function fetchSaleInforAPI(
  params: string,
): Promise<SaleInforResponse> {
  const res = await apiRequest.get(`/accounts/sale?saleId=${params}`);

  return res.data;
}

export const fetchChangeSaleIdApi = async (
  params: ChangeSaleIdPayload,
  otp?: string,
): Promise<ChangeSaleIdResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.put<ChangeSaleIdResponse>(
    "/accounts/sale/change",
    params,
    { headers },
  );

  return res.data;
};

export const fetchLockAccountApi = async (
  otp?: string,
): Promise<LockAccountResponse> => {
  const headers = otp ? { "X-Otp": otp } : undefined;

  const res = await apiRequest.put<LockAccountResponse>(
    "/accounts/lock",
    null,
    {
      headers,
    },
  );

  return res.data;
};
