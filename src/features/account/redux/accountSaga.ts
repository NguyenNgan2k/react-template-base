import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { apiFetchAccountInfo, apiFetchAccountBalance } from "../accountNetwork";
import type { AccountBalance, AccountInfo } from "../accountType";
import {
  fetchAccountInfoError,
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchAccountBalanceError,
  fetchAccountBalanceRequest,
  fetchAccountBalanceSuccess,
} from "./accountSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchAccountInfoSaga(
  action: ReturnType<typeof fetchAccountInfoRequest>,
): Generator<GeneratorYield, void, AccountInfo> {
  try {
    const data = (yield call(
      apiFetchAccountInfo,
      action.payload,
    )) as AccountInfo;
    // Dispatch success
    yield put(fetchAccountInfoSuccess(data));
  } catch (error) {
    // Dispatch error

    yield put(fetchAccountInfoError());
  }
}

function* fetchAccountBalanceSaga(
  action: ReturnType<typeof fetchAccountBalanceRequest>,
): Generator<GeneratorYield, void, AccountBalance> {
  try {
    const data = (yield call(
      apiFetchAccountBalance,
      action.payload,
    )) as AccountBalance;
    // Dispatch success
    yield put(fetchAccountBalanceSuccess(data));
  } catch (error) {
    // Dispatch error

    yield put(fetchAccountBalanceError());
  }
}

export default function* AccountWatcher() {
  yield all([
    takeLatest(fetchAccountInfoRequest.type, fetchAccountInfoSaga),
    takeLatest(fetchAccountBalanceRequest.type, fetchAccountBalanceSaga),
  ]);
}
