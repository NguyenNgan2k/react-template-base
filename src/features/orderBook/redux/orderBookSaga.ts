import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { apiFetchOrderBook } from "../orderBookNetwork";
import type { OrderBook } from "../orderBookType";
import {
  fetchOrderBookError,
  fetchOrderBookRequest,
  fetchOrderBookSuccess,
} from "./orderBookSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchOrderBookSaga(
  action: ReturnType<typeof fetchOrderBookRequest>,
): Generator<GeneratorYield, void, OrderBook[]> {
  try {
    const data = (yield call(apiFetchOrderBook, action.payload)) as OrderBook[];
    yield put(fetchOrderBookSuccess(data));
  } catch (error) {
    yield put(fetchOrderBookError());
  }
}

export default function* OrderBookWatcher() {
  yield all([takeLatest(fetchOrderBookRequest.type, fetchOrderBookSaga)]);
}
