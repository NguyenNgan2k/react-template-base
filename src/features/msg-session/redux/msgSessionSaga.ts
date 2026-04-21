import {
  all,
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { apiFetchMsgSession } from "../msgSessionNetwork";
import type { MsgSession } from "../msgSessionType";
import {
  fetchMsgSessionError,
  fetchMsgSessionRequest,
  fetchMsgSessionSuccess,
} from "./msgSessionSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchMsgSessionSaga(
  action: ReturnType<typeof fetchMsgSessionRequest>,
): Generator<GeneratorYield, void, MsgSession[]> {
  try {
    const data = (yield call(apiFetchMsgSession, action.payload)) as MsgSession[];
    yield put(fetchMsgSessionSuccess(data));
  } catch (error) {
    yield put(fetchMsgSessionError());
  }
}

export default function* MsgSessionWatcher() {
  yield all([takeLatest(fetchMsgSessionRequest.type, fetchMsgSessionSaga)]);
}
