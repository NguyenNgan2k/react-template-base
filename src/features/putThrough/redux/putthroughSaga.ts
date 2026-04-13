import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import type { PutThrough } from "../putthroughType";
import {
  fetchAdvertisementError,
  fetchAdvertisementRequest,
  fetchAdvertisementSuccess,
  fetchPutThroughError,
  fetchPutThroughRequest,
  fetchPutThroughSuccess,
} from "./putthroughSlice";
import {
  apiFetchAdvertisement,
  apiFetchPutThrough,
} from "../putthroughNetwork";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchPutThroughSaga(
  action: ReturnType<typeof fetchPutThroughRequest>,
): Generator<GeneratorYield, void, PutThrough[]> {
  try {
    const data = (yield call(
      apiFetchPutThrough,
      action.payload,
    )) as PutThrough[];
    yield put(fetchPutThroughSuccess(data));
  } catch (error) {
    yield put(fetchPutThroughError());
  }
}

function* fetchAdvertisementSage(
  action: ReturnType<typeof fetchAdvertisementRequest>,
): Generator<GeneratorYield, void, PutThrough[]> {
  try {
    const data = (yield call(
      apiFetchAdvertisement,
      action.payload,
    )) as PutThrough[];
    yield put(fetchAdvertisementSuccess(data));
  } catch (error) {
    yield put(fetchAdvertisementError());
  }
}

export default function* PutThroughWatcher() {
  yield all([
    takeLatest(fetchPutThroughRequest.type, fetchPutThroughSaga),
    takeLatest(fetchAdvertisementRequest.type, fetchAdvertisementSage),
  ]);
}
