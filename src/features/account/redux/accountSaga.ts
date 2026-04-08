import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import {
  apiFetchAccountInfo,
  apiFetchAccountBalance,
  apiFetchAccountPortfolio,
} from "../accountNetwork";
import type {
  AccountInfo,
  AccountBalance,
  AccountPortfolio,
} from "../accountType";
import {
  fetchAccountInfoError,
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchAccountBalanceError,
  fetchAccountBalanceRequest,
  fetchAccountBalanceSuccess,
  fetchAccountPortfolioError,
  fetchAccountPortfolioRequest,
  fetchAccountPortfolioSuccess,
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
    yield put(fetchAccountInfoSuccess(data));
  } catch (error) {
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
    yield put(fetchAccountBalanceSuccess(data));
  } catch (error) {
    yield put(fetchAccountBalanceError());
  }
}

function* fetchAccountPortfolioSaga(
  action: ReturnType<typeof fetchAccountPortfolioRequest>,
): Generator<GeneratorYield, void, AccountPortfolio[]> {
  try {
    const data = (yield call(
      apiFetchAccountPortfolio,
      action.payload,
    )) as AccountPortfolio[];
    yield put(fetchAccountPortfolioSuccess(data));
  } catch (error) {
    yield put(fetchAccountPortfolioError());
  }
}

export default function* AccountWatcher() {
  yield all([
    takeLatest(fetchAccountInfoRequest.type, fetchAccountInfoSaga),
    takeLatest(fetchAccountBalanceRequest.type, fetchAccountBalanceSaga),
    takeLatest(fetchAccountPortfolioRequest.type, fetchAccountPortfolioSaga),
  ]);
}
