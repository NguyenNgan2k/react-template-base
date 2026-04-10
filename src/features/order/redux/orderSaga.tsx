import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { fetchOrderDetailError, fetchOrderDetailRequest, fetchOrderDetailSuccess } from "./orderSlice";
import type { OrderDetail } from "../orderType";
import { apiFetchOrderDetail } from "../orderNetwork";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchOrderDetailSaga(
  action: ReturnType<typeof fetchOrderDetailRequest>,
): Generator<GeneratorYield, void, OrderDetail[]> {
  try {
    const data = (yield call(
      apiFetchOrderDetail,
      action.payload,
    )) as OrderDetail[];
    yield put(fetchOrderDetailSuccess(data));
  } catch (error) {
    yield put(fetchOrderDetailError());
  }
}

export default function* orderSagaRoot() {
  yield all([
    takeLatest(fetchOrderDetailRequest.type, fetchOrderDetailSaga),
  ]);

}
