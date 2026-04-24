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
  apiFetchAccountInfo,
  apiFetchCustomerInfo,
  apiFetchAccountStatus,
  apiFetchAccountBalance,
  apiFetchAccountPortfolio,
  apiFetchAccountList,
  apiFetchAccountOrderBook,
  apiFetchAccountMatchedByStepPrice,
  apiFetchAccountMatchedByStock,
  apiFetchAccountProfitLoss,
  apiFetchAccountLMV,
  apiFetchAccountLMVEE,
  apiFetchAccountLMVUB,
  apiFetchAccountDebt,
} from "../accountNetwork";
import type {
  AccountInfo,
  CustomerInfo,
  AccountStatus,
  AccountBalance,
  AccountPortfolio,
  AccountList,
  AccountOrderBook,
  AccountMatchedByStepPrice,
  AccountMatchedByStock,
  AccountProfitLoss,
  AccountLMV,
  AccountLMVEE,
  AccountLMVUB,
  AccountDebt,
  AccountDebtExpire,
} from "../accountType";
import {
  fetchAccountInfoError,
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchCustomerInfoError,
  fetchCustomerInfoRequest,
  fetchCustomerInfoSuccess,
  fetchAccountStatusError,
  fetchAccountStatusRequest,
  fetchAccountStatusSuccess,
  fetchAccountBalanceError,
  fetchAccountBalanceRequest,
  fetchAccountBalanceSuccess,
  fetchAccountPortfolioError,
  fetchAccountPortfolioRequest,
  fetchAccountPortfolioSuccess,
  fetchAccountListRequest,
  fetchAccountListSuccess,
  fetchAccountListError,
  fetchAccountOrderBookRequest,
  fetchAccountOrderBookSuccess,
  fetchAccountOrderBookError,
  fetchAccountMatchedByStepPriceRequest,
  fetchAccountMatchedByStepPriceSuccess,
  fetchAccountMatchedByStepPriceError,
  fetchAccountMatchedByStockRequest,
  fetchAccountMatchedByStockSuccess,
  fetchAccountMatchedByStockError,
  fetchAccountProfitLossRequest,
  fetchAccountProfitLossSuccess,
  fetchAccountProfitLossError,
  fetchAccountLMVRequest,
  fetchAccountLMVSuccess,
  fetchAccountLMVError,
  fetchAccountLMVEERequest,
  fetchAccountLMVEESuccess,
  fetchAccountLMVEEError,
  fetchAccountLMVUBRequest,
  fetchAccountLMVUBSuccess,
  fetchAccountLMVUBError,
  fetchAccountDebtRequest,
  fetchAccountDebtSuccess,
  fetchAccountDebtError,
  fetchAccountDebtExpireRequest,
  fetchAccountDebtExpireSuccess,
  fetchAccountDebtExpireError,
} from "./accountSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchAccountInfoSaga(
  action: ReturnType<typeof fetchAccountInfoRequest>,
): Generator<GeneratorYield, void, AccountInfo> {
  try {
    const data = (yield call(
      apiFetchAccountInfo,
      action.payload,
    )) as AccountInfo;
    yield put(fetchAccountInfoSuccess(data));
  } catch (error) {
    yield put(fetchAccountInfoError());
  }
}

function* fetchCustomerInfoSaga(
  action: ReturnType<typeof fetchCustomerInfoRequest>,
): Generator<GeneratorYield, void, CustomerInfo> {
  try {
    const data = (yield call(
      apiFetchCustomerInfo,
      action.payload,
    )) as CustomerInfo;
    yield put(fetchCustomerInfoSuccess(data));
  } catch (error) {
    yield put(fetchCustomerInfoError());
  }
}

function* fetchAccountStatusSaga(
  action: ReturnType<typeof fetchAccountStatusRequest>,
): Generator<GeneratorYield, void, AccountStatus> {
  try {
    const data = (yield call(
      apiFetchAccountStatus,
      action.payload,
    )) as AccountStatus;
    yield put(fetchAccountStatusSuccess(data));
  } catch (error) {
    yield put(fetchAccountStatusError());
  }
}

function* fetchAccountBalanceSaga(
  action: ReturnType<typeof fetchAccountBalanceRequest>,
): Generator<GeneratorYield, void, AccountBalance> {
  try {
    const data = (yield call(
      apiFetchAccountBalance,
      action.payload,
    )) as AccountBalance;
    yield put(fetchAccountBalanceSuccess(data));
  } catch (error) {
    yield put(fetchAccountBalanceError());
  }
}

function* fetchAccountPortfolioSaga(
  action: ReturnType<typeof fetchAccountPortfolioRequest>,
): Generator<GeneratorYield, void, AccountPortfolio[]> {
  try {
    const data = (yield call(
      apiFetchAccountPortfolio,
      action.payload,
    )) as AccountPortfolio[];
    yield put(fetchAccountPortfolioSuccess(data));
  } catch (error) {
    yield put(fetchAccountPortfolioError());
  }
}

function* fetchAccountListSaga(
  action: ReturnType<typeof fetchAccountListRequest>,
): Generator<GeneratorYield, void, AccountList[]> {
  try {
    const data = (yield call(
      apiFetchAccountList,
      action.payload,
    )) as AccountPortfolio[];
    yield put(fetchAccountListSuccess(data));
  } catch (error) {
    yield put(fetchAccountListError());
  }
}

function* fetchAccountOrderBookSaga(
  action: ReturnType<typeof fetchAccountOrderBookRequest>,
): Generator<GeneratorYield, void, AccountOrderBook[]> {
  try {
    const data = (yield call(
      apiFetchAccountOrderBook,
      action.payload,
    )) as AccountOrderBook[];
    yield put(fetchAccountOrderBookSuccess(data));
  } catch (error) {
    yield put(fetchAccountOrderBookError());
  }
}

function* fetchAccountMatchedByStepPriceSaga(
  action: ReturnType<typeof fetchAccountMatchedByStepPriceRequest>,
): Generator<GeneratorYield, void, AccountMatchedByStepPrice[]> {
  try {
    const data = (yield call(
      apiFetchAccountMatchedByStepPrice,
      action.payload,
    )) as AccountMatchedByStepPrice[];
    yield put(fetchAccountMatchedByStepPriceSuccess(data));
  } catch (error) {
    yield put(fetchAccountMatchedByStepPriceError());
  }
}

function* fetchAccountMatchedByStockSaga(
  action: ReturnType<typeof fetchAccountMatchedByStockRequest>,
): Generator<GeneratorYield, void, AccountMatchedByStock[]> {
  try {
    const data = (yield call(
      apiFetchAccountMatchedByStock,
      action.payload,
    )) as AccountMatchedByStock[];
    yield put(fetchAccountMatchedByStockSuccess(data));
  } catch (error) {
    yield put(fetchAccountMatchedByStockError());
  }
}

function* fetchAccountProfitLossSaga(
  action: ReturnType<typeof fetchAccountProfitLossRequest>,
): Generator<GeneratorYield, void, AccountProfitLoss[]> {
  try {
    const data = (yield call(
      apiFetchAccountProfitLoss,
      action.payload,
    )) as AccountProfitLoss[];
    yield put(fetchAccountProfitLossSuccess(data));
  } catch (error) {
    yield put(fetchAccountProfitLossError());
  }
}

function* fetchAccountLMVSaga(
  action: ReturnType<typeof fetchAccountLMVRequest>,
): Generator<GeneratorYield, void, AccountLMV[]> {
  try {
    const data = (yield call(
      apiFetchAccountLMV,
      action.payload,
    )) as AccountLMV[];
    yield put(fetchAccountLMVSuccess(data));
  } catch (error) {
    yield put(fetchAccountLMVError());
  }
}

function* fetchAccountLMVEESaga(
  action: ReturnType<typeof fetchAccountLMVEERequest>,
): Generator<GeneratorYield, void, AccountLMVEE[]> {
  try {
    const data = (yield call(
      apiFetchAccountLMVEE,
      action.payload,
    )) as AccountLMVEE[];
    yield put(fetchAccountLMVEESuccess(data));
  } catch (error) {
    yield put(fetchAccountLMVEEError());
  }
}

function* fetchAccountLMVUBSaga(
  action: ReturnType<typeof fetchAccountLMVUBRequest>,
): Generator<GeneratorYield, void, AccountLMVUB> {
  try {
    const data = (yield call(
      apiFetchAccountLMVUB,
      action.payload,
    )) as AccountLMVUB;
    yield put(fetchAccountLMVUBSuccess(data));
  } catch (error) {
    yield put(fetchAccountLMVUBError());
  }
}

function* fetchAccountDebtSaga(
  action: ReturnType<typeof fetchAccountDebtRequest>,
): Generator<GeneratorYield, void, AccountDebt[]> {
  try {
    const data = (yield call(
      apiFetchAccountDebt,
      action.payload,
    )) as AccountDebt[];
    yield put(fetchAccountDebtSuccess(data));
  } catch (error) {
    yield put(fetchAccountDebtError());
  }
}

function* fetchAccountDebtExpireSaga(
  action: ReturnType<typeof fetchAccountDebtExpireRequest>,
): Generator<GeneratorYield, void, AccountDebtExpire[]> {
  try {
    const data = (yield call(
      apiFetchAccountDebt,
      action.payload,
    )) as AccountDebtExpire[];
    yield put(fetchAccountDebtExpireSuccess(data));
  } catch (error) {
    yield put(fetchAccountDebtExpireError());
  }
}

export default function* AccountWatcher() {
  yield all([
    takeLatest(fetchAccountInfoRequest.type, fetchAccountInfoSaga),
    takeLatest(fetchCustomerInfoRequest.type, fetchCustomerInfoSaga),
    takeLatest(fetchAccountStatusRequest.type, fetchAccountStatusSaga),
    takeLatest(fetchAccountBalanceRequest.type, fetchAccountBalanceSaga),
    takeLatest(fetchAccountPortfolioRequest.type, fetchAccountPortfolioSaga),
    takeLatest(fetchAccountListRequest.type, fetchAccountListSaga),
    takeLatest(fetchAccountOrderBookRequest.type, fetchAccountOrderBookSaga),
    takeLatest(
      fetchAccountMatchedByStepPriceRequest.type,
      fetchAccountMatchedByStepPriceSaga,
    ),
    takeLatest(
      fetchAccountMatchedByStockRequest.type,
      fetchAccountMatchedByStockSaga,
    ),
    takeLatest(fetchAccountProfitLossRequest.type, fetchAccountProfitLossSaga),
    takeLatest(fetchAccountLMVRequest.type, fetchAccountLMVSaga),
    takeLatest(fetchAccountLMVEERequest.type, fetchAccountLMVEESaga),
    takeLatest(fetchAccountLMVUBRequest.type, fetchAccountLMVUBSaga),
    takeLatest(fetchAccountDebtRequest.type, fetchAccountDebtSaga),
    takeLatest(fetchAccountDebtExpireRequest.type, fetchAccountDebtExpireSaga),
  ]);
}
