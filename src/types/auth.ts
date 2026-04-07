import type { ApiResponse } from "./common";

export interface LoginPayload {
  user: string;
  password: string;
  device: string;
  channel: string;
  recaptchaToken: string;
}

export interface LoginResponse {
  rc: number;
  msg: string;
  data: {
    sessionId: string;
    cAccountCode: string;
    cUserCode: string;
    cAccountName: string;
    cCustomerCode: string;
    cAuthenFlag: string;
    cResetFlag: number;
    cCountLogin: number;
    cAuthenType: string;
    cListFunc: string;
    cSerialNumber: string;
    cCountDay: number | null;
  };
}

export type Token = LoginResponse["data"] | null;

export interface FetchOtpPayload {
  channel: string;
}

export interface ConfirmOtpForm {
  otp: string;
}

export interface FetchOtpResponse {
  rc: number;
  msg: string | null;
  data?: {
    otp: string;
  };
}

export type FetchOtpDataResponse = FetchOtpResponse["data"];

export interface ForgotAccountForm {
  accountCode: string;
  cardId: string;
  passwordNew: string;
  passwordConfirm: string;
}

export interface ChangePassAccountForm {
  passwordOld: string;
  password: string;
  passwordConfirm: string;
}

export interface IErrMsg {
  [key: string]:
    | {
        msg: string;
      }
    | undefined;
}

export type LogoutPayload = {
  logoutAll: boolean;
};

export type LogoutActionPayload = {
  params: LogoutPayload;
  otp?: string;
};

export type LogoutResponse = ApiResponse<null>;

export interface DeviceLogin {
  pkWebDataLogin: string;
  cIp: string;
  cChannel: string;
  cMethod: string;
  cToken: string;
  cMobile: string;
  cDevice: string;
  cCreateTime: string;
  cResultCode: string;
  cResultMsg: string | null;
}

export type HistoryLogin = ApiResponse<DeviceLogin[]>;

export interface ListHistoryLoginParams {
  page: number;
  recordPage: number;
}
