import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { apiFetchStockInfo, apiFetchStockList } from "../stockNetwork";
import type { StockInfoResponse, Stock } from "../stockType";
import {
  fetchStockListError,
  fetchStockListRequest,
  fetchStockListSuccess,
  fetchStockInfoError,
  fetchStockInfoRequest,
  fetchStockInfoSuccess,
} from "./stockSlice";
import { mapDataStockInfo } from "../stockBusiness";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchStockInfoSaga(
  action: ReturnType<typeof fetchStockInfoRequest>,
): Generator<GeneratorYield, void, StockInfoResponse> {
  try {
    const data = (yield call(
      apiFetchStockInfo,
      action.payload,
    )) as StockInfoResponse;
    yield put(fetchStockInfoSuccess(mapDataStockInfo(data)));
  } catch (error) {
    yield put(fetchStockInfoError());
  }
}

function* fetchStockListSaga(): Generator<GeneratorYield, void, Stock[]> {
  try {
    const data = (yield call(apiFetchStockList)) as Stock[];
    yield put(fetchStockListSuccess(data));
  } catch (error) {
    yield put(fetchStockListError());
  }
}

export default function* StockWatcher() {
  yield all([
    takeLatest(fetchStockInfoRequest.type, fetchStockInfoSaga),
    takeLatest(fetchStockListRequest, fetchStockListSaga),
  ]);
}
