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
  apiFetchMarginAccount,
  apiFetchAbnormalLimit,
  apiFetchAccountFilter,
  apiFetchCollateralAssets,
  apiFetchLoanableSecurities,
  apiFetchRegularAccount,
  apiFetchResourceManagement,
  apiFetchStockOwnership,
  apiFetchUbViolation,
} from "../accountManagementNetwork";
import type {
  AbnormalLimit,
  AccountFilter,
  CollateralAssets,
  LoanableSecurities,
  MarginAccount,
  RegularAccount,
  ResourceManagement,
  StockOwnership,
  UbViolation,
} from "../accountManagementType";
import {
  fetchAbnormalLimitError,
  fetchAbnormalLimitRequest,
  fetchAbnormalLimitSuccess,
  fetchAccountFilterError,
  fetchAccountFilterRequest,
  fetchAccountFilterSuccess,
  fetchCollateralAssetsError,
  fetchCollateralAssetsRequest,
  fetchCollateralAssetsSuccess,
  fetchLoanableSecuritiesError,
  fetchLoanableSecuritiesRequest,
  fetchLoanableSecuritiesSuccess,
  fetchMarginAccountError,
  fetchMarginAccountRequest,
  fetchMarginAccountSuccess,
  fetchRegularAccountError,
  fetchRegularAccountRequest,
  fetchRegularAccountSuccess,
  fetchResourceManagementError,
  fetchResourceManagementRequest,
  fetchResourceManagementSuccess,
  fetchStockOwnershipError,
  fetchStockOwnershipRequest,
  fetchStockOwnershipSuccess,
  fetchUbViolationError,
  fetchUbViolationRequest,
  fetchUbViolationSuccess,
} from "./accountManagementSlice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* fetchAbnormalLimitSaga(
  action: ReturnType<typeof fetchAbnormalLimitRequest>,
): Generator<GeneratorYield, void, AbnormalLimit[]> {
  try {
    const data = (yield call(
      apiFetchAbnormalLimit,
      action.payload,
    )) as AbnormalLimit[];
    yield put(fetchAbnormalLimitSuccess(data));
  } catch (error) {
    yield put(fetchAbnormalLimitError());
  }
}

function* fetchAccountFilterSaga(
  action: ReturnType<typeof fetchAccountFilterRequest>,
): Generator<GeneratorYield, void, AccountFilter[]> {
  try {
    const data = (yield call(
      apiFetchAccountFilter,
      action.payload,
    )) as AccountFilter[];
    yield put(fetchAccountFilterSuccess(data));
  } catch (error) {
    yield put(fetchAccountFilterError());
  }
}

function* fetchCollateralAssetsSaga(
  action: ReturnType<typeof fetchCollateralAssetsRequest>,
): Generator<GeneratorYield, void, CollateralAssets[]> {
  try {
    const data = (yield call(
      apiFetchCollateralAssets,
      action.payload,
    )) as CollateralAssets[];
    yield put(fetchCollateralAssetsSuccess(data));
  } catch (error) {
    yield put(fetchCollateralAssetsError());
  }
}

function* fetchLoanableSecuritiesSaga(
  action: ReturnType<typeof fetchLoanableSecuritiesRequest>,
): Generator<GeneratorYield, void, LoanableSecurities[]> {
  try {
    const data = (yield call(
      apiFetchLoanableSecurities,
      action.payload,
    )) as LoanableSecurities[];
    yield put(fetchLoanableSecuritiesSuccess(data));
  } catch (error) {
    yield put(fetchLoanableSecuritiesError());
  }
}

function* fetchResourceManagementSaga(
  action: ReturnType<typeof fetchResourceManagementRequest>,
): Generator<GeneratorYield, void, ResourceManagement[]> {
  try {
    const data = (yield call(
      apiFetchResourceManagement,
      action.payload,
    )) as ResourceManagement[];
    yield put(fetchResourceManagementSuccess(data));
  } catch (error) {
    yield put(fetchResourceManagementError());
  }
}

function* fetchRegularAccountSaga(
  action: ReturnType<typeof fetchRegularAccountRequest>,
): Generator<GeneratorYield, void, RegularAccount[]> {
  try {
    const data = (yield call(
      apiFetchRegularAccount,
      action.payload,
    )) as RegularAccount[];
    yield put(fetchRegularAccountSuccess(data));
  } catch (error) {
    yield put(fetchRegularAccountError());
  }
}

function* fetchMarginAccountSaga(
  action: ReturnType<typeof fetchMarginAccountRequest>,
): Generator<GeneratorYield, void, MarginAccount[]> {
  try {
    const data = (yield call(
      apiFetchMarginAccount,
      action.payload,
    )) as MarginAccount[];
    yield put(fetchMarginAccountSuccess(data));
  } catch (error) {
    yield put(fetchMarginAccountError());
  }
}

function* fetchStockOwnershipSaga(
  action: ReturnType<typeof fetchStockOwnershipRequest>,
): Generator<GeneratorYield, void, StockOwnership[]> {
  try {
    const data = (yield call(
      apiFetchStockOwnership,
      action.payload,
    )) as StockOwnership[];
    yield put(fetchStockOwnershipSuccess(data));
  } catch (error) {
    yield put(fetchStockOwnershipError());
  }
}

function* fetchUbViolationSaga(
  action: ReturnType<typeof fetchUbViolationRequest>,
): Generator<GeneratorYield, void, UbViolation[]> {
  try {
    const data = (yield call(
      apiFetchUbViolation,
      action.payload,
    )) as UbViolation[];
    yield put(fetchUbViolationSuccess(data));
  } catch (error) {
    yield put(fetchUbViolationError());
  }
}

export default function* AccountManagementWatcher() {
  yield all([
    takeLatest(fetchAbnormalLimitRequest.type, fetchAbnormalLimitSaga),
    takeLatest(fetchAccountFilterRequest.type, fetchAccountFilterSaga),
    takeLatest(fetchCollateralAssetsRequest.type, fetchCollateralAssetsSaga),
    takeLatest(fetchLoanableSecuritiesRequest.type, fetchLoanableSecuritiesSaga),
    takeLatest(fetchMarginAccountRequest.type, fetchMarginAccountSaga),
    takeLatest(fetchRegularAccountRequest.type, fetchRegularAccountSaga),
    takeLatest(fetchResourceManagementRequest.type, fetchResourceManagementSaga),
    takeLatest(fetchStockOwnershipRequest.type, fetchStockOwnershipSaga),
    takeLatest(fetchUbViolationRequest.type, fetchUbViolationSaga),
  ]);
}
