import { handleRequestError } from "@/utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  changeNicknameApi,
  checkCardIdApi,
  checkNicknameApi,
  checkPassApi,
  fetchAccountProfileAPI,
  fetchChangeAccAvaApi,
  fetchChangeAccInfoApi,
  fetchChangePassApi,
  fetchChangeSaleIdApi,
  fetchDeleteBeneficiaryApi,
  fetchListAccountAPI,
  fetchListBankApi,
  fetchListBeneficiaryApi,
  fetchSaleInforAPI,
  fetchUpdateBeneficiaryApi,
  fetchUpdateBeneficiaryDefApi,
} from "../../../api/clientApi";
import type {
  AccountProfileResponse,
  ChangeAccountAvaPayload,
  ChangeAccountAvaResponse,
  ChangeAccountInfoActionPayload,
  ChangeAccountInfoResponse,
  ChangeNicknamePayload,
  ChangeNicknameResponse,
  ChangePassActionPayload,
  ChangePassResponse,
  ChangeSaleIdActionPayload,
  ChangeSaleIdResponse,
  CheckCardIdPayload,
  CheckCardIdResponse,
  CheckPassPayload,
  CheckPassResponse,
  DeleteBeneficiaryActionPayload,
  DeleteBeneficiaryResponse,
  ListAccountResponse,
  ListBank,
  ListBeneficiary,
  SaleInforResponse,
  UpdateBeneficiaryActionPayload,
  UpdateBeneficiaryDefActionPayload,
  UpdateBeneficiaryDefResponse,
  UpdateBeneficiaryResponse,
} from "../../../types/client";
import {
  fetchAccountProfileFailure,
  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
  fetchChangeAccountImgFailure,
  fetchChangeAccountImgRequest,
  fetchChangeAccountImgSuccess,
  fetchChangeAccountInfoFailure,
  fetchChangeAccountInfoRequest,
  fetchChangeAccountInfoSuccess,
  fetchChangeNicknameFailure,
  fetchChangeNicknameRequest,
  fetchChangeNicknameSuccess,
  fetchChangePassFailure,
  fetchChangePassRequest,
  fetchChangePassSuccess,
  fetchChangeSaleIdFailure,
  fetchChangeSaleIdRequest,
  fetchChangeSaleIdSuccess,
  fetchCheckCardIdFailure,
  fetchCheckCardIdRequest,
  fetchCheckCardIdSuccess,
  fetchCheckNicknameFailure,
  fetchCheckNicknameRequest,
  fetchCheckNicknameSuccess,
  fetchCheckPassFailure,
  fetchCheckPassRequest,
  fetchCheckPassSuccess,
  fetchDeleteBeneficiaryFailure,
  fetchDeleteBeneficiaryRequest,
  fetchDeleteBeneficiarySuccess,
  fetchListAccountFailure,
  fetchListAccountRequest,
  fetchListAccountSuccess,
  fetchListBankFailure,
  fetchListBankRequest,
  fetchListBankSuccess,
  fetchListBeneficiaryFailure,
  fetchListBeneficiaryRequest,
  fetchListBeneficiarySuccess,
  fetchSaleInforFailure,
  fetchSaleInforRequest,
  fetchSaleInforSuccess,
  fetchUpdateBeneficiaryDefFailure,
  fetchUpdateBeneficiaryDefRequest,
  fetchUpdateBeneficiaryDefSuccess,
  fetchUpdateBeneficiaryFailure,
  fetchUpdateBeneficiaryRequest,
  fetchUpdateBeneficiarySuccess,
} from "./slice";

function* fetchAccountProfileSaga() {
  try {
    const res: AccountProfileResponse = yield call(fetchAccountProfileAPI);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    if (res.data) yield put(fetchAccountProfileSuccess(res.data));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchAccountProfileFailure);
  }
}

function* fetchListAccountSaga() {
  try {
    const res: ListAccountResponse = yield call(fetchListAccountAPI);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    if (res.data) yield put(fetchListAccountSuccess(res.data));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchListAccountFailure);
  }
}

function* fetchCheckNicknameSaga(action: PayloadAction<string>) {
  try {
    const res: ChangeNicknameResponse = yield call(
      checkNicknameApi,
      action.payload,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchCheckNicknameSuccess(res.data));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchCheckNicknameFailure);
  }
}

function* fetchChangeNicknameSaga(
  action: PayloadAction<ChangeNicknamePayload>,
) {
  try {
    const res: ChangeNicknameResponse = yield call(
      changeNicknameApi,
      action.payload,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchChangeNicknameSuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchChangeNicknameFailure);
  }
}

function* fetchChangeAccountInfoSaga(
  action: PayloadAction<ChangeAccountInfoActionPayload>,
) {
  try {
    const { otp, ...payload } = action.payload;

    const res: ChangeAccountInfoResponse = yield call(
      fetchChangeAccInfoApi,
      payload,
      otp,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }
    yield put(fetchChangeAccountInfoSuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchChangeAccountInfoFailure);
  }
}

function* fetchChangeAccountAvaSaga(
  action: PayloadAction<ChangeAccountAvaPayload>,
) {
  try {
    const res: ChangeAccountAvaResponse = yield call(
      fetchChangeAccAvaApi,
      action.payload,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }
    yield put(fetchChangeAccountImgSuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchChangeAccountImgFailure);
  }
}

function* fetchListBankSaga() {
  try {
    const res: ListBank = yield call(fetchListBankApi);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchListBankSuccess(res.data ?? []));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchListBankFailure);
  }
}

function* fetchUpdateBeneficiarySaga(
  action: PayloadAction<UpdateBeneficiaryActionPayload>,
) {
  try {
    const { otp, params } = action.payload;

    const res: UpdateBeneficiaryResponse = yield call(
      fetchUpdateBeneficiaryApi,
      params,
      otp,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchUpdateBeneficiarySuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchUpdateBeneficiaryFailure);
  }
}

function* fetchUpdateBeneficiaryDefSaga(
  action: PayloadAction<UpdateBeneficiaryDefActionPayload>,
) {
  try {
    const { otp, params } = action.payload;

    const res: UpdateBeneficiaryDefResponse = yield call(
      fetchUpdateBeneficiaryDefApi,
      params,
      otp,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchUpdateBeneficiaryDefSuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchUpdateBeneficiaryDefFailure);
  }
}

function* fetchListBeneficiarySaga() {
  try {
    const res: ListBeneficiary = yield call(fetchListBeneficiaryApi);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchListBeneficiarySuccess(res.data ?? []));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchListBeneficiaryFailure);
  }
}

function* fetchDeleteBeneficiarySaga(
  action: PayloadAction<DeleteBeneficiaryActionPayload>,
) {
  try {
    const { otp, params } = action.payload;

    const res: DeleteBeneficiaryResponse = yield call(
      fetchDeleteBeneficiaryApi,
      params,
      otp,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchDeleteBeneficiarySuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchDeleteBeneficiaryFailure);
  }
}

function* fetchCheckPassSaga(action: PayloadAction<CheckPassPayload>) {
  try {
    const res: CheckPassResponse = yield call(checkPassApi, action.payload);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchCheckPassSuccess(res));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchCheckPassFailure);
  }
}

function* fetchChangePassSaga(action: PayloadAction<ChangePassActionPayload>) {
  try {
    const { otp, params } = action.payload;

    const res: ChangePassResponse = yield call(fetchChangePassApi, params, otp);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchChangePassSuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchChangePassFailure);
  }
}

function* fetchCheckCardIdSaga(action: PayloadAction<CheckCardIdPayload>) {
  try {
    const res: CheckCardIdResponse = yield call(checkCardIdApi, action.payload);

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    if (res.data) {
      yield put(fetchCheckCardIdSuccess(res.data ?? null));
    }
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchCheckCardIdFailure);
  }
}

function* fetchSaleInforSaga(action: PayloadAction<string>) {
  try {
    const res: SaleInforResponse = yield call(
      fetchSaleInforAPI,
      action.payload,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    if (res.data) yield put(fetchSaleInforSuccess(res.data));
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchSaleInforFailure);
  }
}

function* fetchChangeSaleIdSaga(
  action: PayloadAction<ChangeSaleIdActionPayload>,
) {
  try {
    const { otp, params } = action.payload;

    const res: ChangeSaleIdResponse = yield call(
      fetchChangeSaleIdApi,
      params,
      otp,
    );

    if (res.rc !== 1) {
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchChangeSaleIdSuccess());
  } catch (error: unknown) {
    yield* handleRequestError(error, fetchChangeSaleIdFailure);
  }
}

export default function* clientSaga() {
  yield takeLatest(fetchAccountProfileRequest, fetchAccountProfileSaga);
  yield takeLatest(fetchListAccountRequest, fetchListAccountSaga);
  yield takeLatest(fetchCheckNicknameRequest, fetchCheckNicknameSaga);
  yield takeLatest(fetchChangeNicknameRequest, fetchChangeNicknameSaga);
  yield takeLatest(fetchChangeAccountInfoRequest, fetchChangeAccountInfoSaga);
  yield takeLatest(fetchChangeAccountImgRequest, fetchChangeAccountAvaSaga);
  yield takeLatest(fetchListBankRequest, fetchListBankSaga);
  yield takeLatest(fetchUpdateBeneficiaryRequest, fetchUpdateBeneficiarySaga);
  yield takeLatest(
    fetchUpdateBeneficiaryDefRequest,
    fetchUpdateBeneficiaryDefSaga,
  );
  yield takeLatest(fetchListBeneficiaryRequest, fetchListBeneficiarySaga);
  yield takeLatest(fetchDeleteBeneficiaryRequest, fetchDeleteBeneficiarySaga);
  yield takeLatest(fetchCheckPassRequest, fetchCheckPassSaga);
  yield takeLatest(fetchChangePassRequest, fetchChangePassSaga);
  yield takeLatest(fetchCheckCardIdRequest, fetchCheckCardIdSaga);
  yield takeLatest(fetchSaleInforRequest, fetchSaleInforSaga);
  yield takeLatest(fetchChangeSaleIdRequest, fetchChangeSaleIdSaga);
}
