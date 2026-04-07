import { handleRequestError } from "@/utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { fetchOrdersApi } from "../../../api/placeOrder";
import { orderFailure, orderRequest, orderSuccess } from "./orderSlice";
import type { OrderPayload, OrderResponse } from "../orderType";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* orderSaga(action: PayloadAction<OrderPayload>): Generator<GeneratorYield, void, OrderResponse> {
  try {
    const { side, params } = action.payload;
    const response: OrderResponse = yield call(fetchOrdersApi, side, params);

    if (response.rc === 1) {
      yield put(orderSuccess(response.data));
    } else {
      yield put(orderFailure(response.msg || "Đặt lệnh thất bại"));
    }
  } catch (error: unknown) {
    yield* handleRequestError(error, orderFailure, "", false);
  }
}

export default function* orderSagaRoot(): Generator<GeneratorYield> {
  yield takeLatest(orderRequest, orderSaga);
}
