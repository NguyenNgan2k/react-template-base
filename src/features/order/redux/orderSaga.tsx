import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { fetchOrderHistoryError, fetchOrderHistoryRequest, fetchOrderHistorySuccess } from "./orderSlice";
import type { OrderHistory } from "../orderType";
import { apiFetchOrderHistory } from "../orderNetwork";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchOrderHistorySaga(
  action: ReturnType<typeof fetchOrderHistoryRequest>,
): Generator<GeneratorYield, void, OrderHistory[]> {
  try {
    const data = (yield call(
      apiFetchOrderHistory,
      action.payload,
    )) as OrderHistory[];
    yield put(fetchOrderHistorySuccess(data));
  } catch (error) {
    yield put(fetchOrderHistoryError());
  }
}

export default function* orderSagaRoot() {
  yield all([
    takeLatest(fetchOrderHistoryRequest.type, fetchOrderHistorySaga),
  ]);

}
