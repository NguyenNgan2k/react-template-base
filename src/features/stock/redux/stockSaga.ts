import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { apiFetchStockInfo } from "../stockNetwork";
import type { StockInfo } from "../stockType";
import {
  fetchStockInfoError,
  fetchStockInfoRequest,
  fetchStockInfoSuccess,
} from "./stockSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchStockInfoSaga(
  action: ReturnType<typeof fetchStockInfoRequest>,
): Generator<GeneratorYield, void, StockInfo> {
  try {
    const data = (yield call(apiFetchStockInfo, action.payload)) as StockInfo;
    yield put(fetchStockInfoSuccess(data));
  } catch (error) {
    yield put(fetchStockInfoError());
  }
}

export default function* StockWatcher() {
  yield all([takeLatest(fetchStockInfoRequest.type, fetchStockInfoSaga)]);
}
