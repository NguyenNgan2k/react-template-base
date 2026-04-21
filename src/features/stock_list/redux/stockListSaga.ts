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
  apiFetchHaltStockList,
  apiFetchTradingStockList,
} from "../stockListNetwork";
import type { HaltStock, TradingStock } from "../stockListType";
import {
  fetchHaltStockListError,
  fetchHaltStockListRequest,
  fetchHaltStockListSuccess,
  fetchTradingStockListError,
  fetchTradingStockListRequest,
  fetchTradingStockListSuccess,
} from "./stockListSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchHaltStockListSaga(
  action: ReturnType<typeof fetchHaltStockListRequest>,
): Generator<GeneratorYield, void, HaltStock[]> {
  try {
    const data = (yield call(
      apiFetchHaltStockList,
      action.payload,
    )) as HaltStock[];
    yield put(fetchHaltStockListSuccess(data));
  } catch (error) {
    yield put(fetchHaltStockListError());
  }
}

function* fetchTradingStockListSaga(
  action: ReturnType<typeof fetchTradingStockListRequest>,
): Generator<GeneratorYield, void, TradingStock[]> {
  try {
    const data = (yield call(
      apiFetchTradingStockList,
      action.payload,
    )) as TradingStock[];
    yield put(fetchTradingStockListSuccess(data));
  } catch (error) {
    yield put(fetchTradingStockListError());
  }
}

export default function* StockListWatcher() {
  yield all([
    takeLatest(fetchHaltStockListRequest.type, fetchHaltStockListSaga),
    takeLatest(fetchTradingStockListRequest.type, fetchTradingStockListSaga),
  ]);
}
