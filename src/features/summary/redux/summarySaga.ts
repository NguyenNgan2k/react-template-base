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
  apiFetchTransactionSummary,
  fetchChannelSummary,
  fetchStockSummary,
} from "../summaryNetwork";
import type {
  StockSummary,
  BrokerSummary,
  ChannelSummary,
} from "../summaryType";
import {
  fetchChannelSummaryError,
  fetchChannelSummaryRequest,
  fetchChannelSummarySuccess,
  fetchStockSummaryError,
  fetchStockSummaryRequest,
  fetchStockSummarySuccess,
  fetchTransactionSummaryError,
  fetchTransactionSummaryRequest,
  fetchTransactionSummarySuccess,
} from "./summarySlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchTransactionSummarySaga(
  action: ReturnType<typeof fetchTransactionSummaryRequest>,
): Generator<GeneratorYield, void, BrokerSummary[]> {
  try {
    const data = (yield call(
      apiFetchTransactionSummary,
      action.payload,
    )) as BrokerSummary[];
    yield put(fetchTransactionSummarySuccess(data));
  } catch (error) {
    yield put(fetchTransactionSummaryError());
  }
}

function* fetchChannelSummarySaga(
  action: ReturnType<typeof fetchChannelSummaryRequest>,
): Generator<GeneratorYield, void, ChannelSummary[]> {
  try {
    const data = (yield call(
      fetchChannelSummary,
      action.payload,
    )) as ChannelSummary[];
    yield put(fetchChannelSummarySuccess(data));
  } catch (error) {
    yield put(fetchChannelSummaryError());
  }
}

function* fetchStockSummarySaga(
  action: ReturnType<typeof fetchStockSummaryRequest>,
): Generator<GeneratorYield, void, StockSummary[]> {
  try {
    const data = (yield call(
      fetchStockSummary,
      action.payload,
    )) as StockSummary[];
    yield put(fetchStockSummarySuccess(data));
  } catch (error) {
    yield put(fetchStockSummaryError());
  }
}

export default function* StatisticWatcher() {
  yield all([
    takeLatest(
      fetchTransactionSummaryRequest.type,
      fetchTransactionSummarySaga,
    ),
    takeLatest(fetchChannelSummaryRequest.type, fetchChannelSummarySaga),
    takeLatest(fetchStockSummaryRequest.type, fetchStockSummarySaga),
  ]);
}
