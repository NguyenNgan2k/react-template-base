import { handleRequestError } from "@/utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCancelOrderApi,
  fetchCashBalanceApi,
  fetchChangeOrderApi,
  fetchOrdersApi,
  fetchOrdersInday,
  fetchOrdersOvertime,
  fetchShareCodeApi,
  fetchShareStockApi,
  fetchTradeHistoryApi,
} from "../../../api/placeOrder";
import type {
  FetchCashBalanceParams,
  FetchCashBalanceResponse,
  FetchOrdersIndayParams,
  FetchOrdersIndayResponse,
  FetchOrdersOvertimeParams,
  FetchOrdersOvertimeResponse,
  FetchOrdersResponse,
  FetchShareCodeResponse,
  FetchShareStockResponse,
  OrderActionPayload,
  OrderCancelActionPayload,
  OrderCancelResponse,
  OrderChangeActionPayload,
  OrderChangeResponse,
  TradeHistoryActionPayload,
  TradeHistoryResponse,
} from "../../../types/placeOrder";
import {
  fetchCancelOrderFailure,
  fetchCancelOrderRequest,
  fetchCancelOrderSuccess,
  fetchCashBalanceFailure,
  fetchCashBalanceRequest,
  fetchCashBalanceSuccess,
  fetchChangeOrderFailure,
  fetchChangeOrderRequest,
  fetchChangeOrderSuccess,
  fetchListOrdersIndayFailure,
  fetchListOrdersIndayRequest,
  fetchListOrdersIndaySuccess,
  fetchListOrdersOvertimeFailure,
  fetchListOrdersOvertimeRequest,
  fetchListOrdersOvertimeSuccess,
  fetchListShareStockFailure,
  fetchListShareStockRequest,
  fetchListShareStockSuccess,
  fetchOrdersFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchShareStockCodeFailure,
  fetchShareStockCodeRequest,
  fetchShareStockCodeSuccess,
  fetchTradeHistoryFailure,
  fetchTradeHistoryRequest,
  fetchTradeHistorySuccess,
} from "./slice";

function* fetchShareStockCodeSaga(
  action: PayloadAction<{ shareCode: string; volume: number }>,
) {
  try {
    const res: FetchShareCodeResponse = yield call(
      fetchShareCodeApi,
      action.payload.shareCode,
      action.payload.volume,
    );

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchShareStockCodeSuccess(res.data));
  } catch (error) {
    yield* handleRequestError(error, fetchShareStockCodeFailure);
  }
}

function* fetchListShareStockSaga() {
  try {
    const res: FetchShareStockResponse = yield call(fetchShareStockApi);

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchListShareStockSuccess(res.data));
  } catch (error) {
    yield* handleRequestError(error, fetchListShareStockFailure);
  }
}

function* fetchOrdersSaga(action: PayloadAction<OrderActionPayload>) {
  try {
    const { side, params } = action.payload;
    const res: FetchOrdersResponse = yield call(fetchOrdersApi, side, params);

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchOrdersSuccess());
  } catch (error) {
    yield* handleRequestError(error, fetchOrdersFailure);
  }
}

function* fetchChangeOrderSaga(
  action: PayloadAction<OrderChangeActionPayload>,
) {
  try {
    const { otp, params } = action.payload;

    const res: OrderChangeResponse = yield call(
      fetchChangeOrderApi,
      params,
      otp,
    );

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchChangeOrderSuccess());
  } catch (error) {
    yield* handleRequestError(error, fetchChangeOrderFailure);
  }
}

function* fetchCancelOrderSaga(
  action: PayloadAction<OrderCancelActionPayload>,
) {
  try {
    const { otp, params } = action.payload;

    const res: OrderCancelResponse = yield call(
      fetchCancelOrderApi,
      params,
      otp,
    );

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchCancelOrderSuccess());
  } catch (error) {
    yield* handleRequestError(error, fetchCancelOrderFailure);
  }
}

function* fetchListOrdersIndaySaga(
  action: PayloadAction<FetchOrdersIndayParams>,
) {
  try {
    const res: FetchOrdersIndayResponse = yield call(
      fetchOrdersInday,
      action.payload,
    );

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchListOrdersIndaySuccess(res.data));
  } catch (error) {
    yield* handleRequestError(error, fetchListOrdersIndayFailure);
  }
}

function* fetchListOrdersOvertimeSaga(
  action: PayloadAction<FetchOrdersOvertimeParams>,
) {
  try {
    const res: FetchOrdersOvertimeResponse = yield call(
      fetchOrdersOvertime,
      action.payload,
    );

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchListOrdersOvertimeSuccess(res.data));
  } catch (error) {
    yield* handleRequestError(error, fetchListOrdersOvertimeFailure);
  }
}

function* fetchCashBalanceSaga(action: PayloadAction<FetchCashBalanceParams>) {
  try {
    const res: FetchCashBalanceResponse = yield call(
      fetchCashBalanceApi,
      action.payload,
    );

    if (res.rc < 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchCashBalanceSuccess(res.data));
  } catch (error) {
    yield* handleRequestError(error, fetchCashBalanceFailure);
  }
}

function* fetchTradeHistorySaga(
  action: PayloadAction<TradeHistoryActionPayload>,
) {
  try {
    const { symbol, params } = action.payload;

    const res: TradeHistoryResponse = yield call(
      fetchTradeHistoryApi,
      symbol,
      params,
    );

    if (res.rc > 0 && res.data) yield put(fetchTradeHistorySuccess(res.data));
    else {
      throw new Error(res.msg || "Lấy lịch sử khớp lệnh thất bại");
    }
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchTradeHistoryFailure);
  }
}

export default function* placeOrderSaga() {
  yield takeLatest(fetchShareStockCodeRequest, fetchShareStockCodeSaga);
  yield takeLatest(fetchListShareStockRequest, fetchListShareStockSaga);
  yield takeLatest(fetchOrdersRequest, fetchOrdersSaga);
  yield takeLatest(fetchListOrdersIndayRequest, fetchListOrdersIndaySaga);
  yield takeLatest(fetchListOrdersOvertimeRequest, fetchListOrdersOvertimeSaga);
  yield takeLatest(fetchCashBalanceRequest, fetchCashBalanceSaga);
  yield takeLatest(fetchChangeOrderRequest, fetchChangeOrderSaga);
  yield takeLatest(fetchCancelOrderRequest, fetchCancelOrderSaga);
  yield takeLatest(fetchTradeHistoryRequest, fetchTradeHistorySaga);
}
