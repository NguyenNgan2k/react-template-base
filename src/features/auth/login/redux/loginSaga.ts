import { SESSION_ID_KEY, USER_DATA_KEY } from "@/configs/auth";
import { encryptUserData } from "@/utils/userData";
import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import type { ChangePassResponse, LoginResponse, UserData } from "../loginType";
import { apiChangePass, apiLogin } from "../loginNetwork";
import { changePassError, changePassRequest, changePassSuccess, loginError, loginRequest, loginSuccess } from "./loginSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* loginRequestSaga(
  action: ReturnType<typeof loginRequest>,
): Generator<GeneratorYield, void, LoginResponse> {
  try {
    const data = (yield call(apiLogin, action.payload)) as LoginResponse;

    // Tạo userData từ data và thêm userId
    const userData: UserData = {
      ...data,
      userId: action.payload.user,
    };

    // Mã hóa và lưu vào localStorage
    const encryptedUserData = encryptUserData(userData, userData.sessionId);
    localStorage.setItem(SESSION_ID_KEY, userData.sessionId);
    localStorage.setItem(USER_DATA_KEY, encryptedUserData);

    // Dispatch success
    yield put(loginSuccess(userData));
  } catch (error) {
    // Dispatch error
    yield put(loginError());
  }
}

function* changePassSaga(
  action: ReturnType<typeof changePassRequest>,
): Generator<GeneratorYield, void, LoginResponse> {
  try {
    const data = (yield call(apiChangePass, action.payload)) as ChangePassResponse;
    // Dispatch success
    yield put(changePassSuccess(data));
  } catch (error) {
    // Dispatch error
    yield put(changePassError());
  }
}

export default function* AuthWatcher() {
  yield all([
    takeLatest(loginRequest.type, loginRequestSaga),
    takeLatest(changePassRequest.type, changePassSaga)
  ]);
}
