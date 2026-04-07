import { showToast } from "@/hooks/useToast";
import axios from "axios";
import type { AnyAction } from "redux-saga";
import { put } from "redux-saga/effects";
import { ERROR_MESSAGE } from "../configs";

export function getMsgByErrorCode(code: string) {
  if (code == "-8005") {
    localStorage.removeState("isAuthOtp");
  }
  return ERROR_MESSAGE[code] ? ERROR_MESSAGE[code]?.msg : "Error";
}

//Helper get error message
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    return (
      responseData?.msg ||
      responseData?.message ||
      responseData?.error ||
      error.message ||
      "Lỗi hệ thống"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error) || "Lỗi hệ thống";
};

export function* handleRequestError(
  error: unknown,
  failureAction: (payload: string) => AnyAction,
  defaultMessage = "Có lỗi xảy ra",
  toast = true,
) {
  const message = getErrorMessage(error) || defaultMessage;
  if (toast) showToast(message, "error");
  yield put(failureAction(message));
}
