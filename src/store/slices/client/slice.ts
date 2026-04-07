import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus } from "../../../types";
import type {
  AccountProfile,
  BankDetail,
  Beneficiary,
  ChangeAccountAvaPayload,
  ChangeAccountInfoActionPayload,
  ChangeNicknameDataResponse,
  ChangeNicknamePayload,
  ChangePassActionPayload,
  ChangeSaleIdActionPayload,
  CheckCardId,
  CheckCardIdPayload,
  CheckPassPayload,
  CheckPassResponse,
  DeleteBeneficiaryActionPayload,
  ListAccountItem,
  SaleInfor,
  UpdateBeneficiaryActionPayload,
  UpdateBeneficiaryDefActionPayload,
} from "../../../types/client";

export interface ClientState {
  data: {
    loginModalOpen: boolean;
    forgotAccountModalOpen: boolean;
    accountProfile: AccountProfile | null;
    listAccount: ListAccountItem[];
    sessionExpired: boolean;
    checkNickname: ChangeNicknameDataResponse | null;
    listBank: BankDetail[];
    listBeneficiary: Beneficiary[];
    checkPass: CheckPassResponse | null;
    checkCardId: CheckCardId | null;
    saleInfor: SaleInfor | null;
    selectedAccount: string | null;
  };
  status: {
    fetchAccountProfile: ApiStatus;
    fetchListAccount: ApiStatus;
    fetchChangeNickname: ApiStatus;
    fetchCheckNickname: ApiStatus;
    fetchChangeAccountInfo: ApiStatus;
    fetchChangeAccountAva: ApiStatus;
    fetchListBank: ApiStatus;
    fetchUpdateBeneficiary: ApiStatus;
    fetchDeleteBeneficiary: ApiStatus;
    fetchUpdateBeneficiaryDef: ApiStatus;
    fetchListBeneficiary: ApiStatus;
    fetchCheckPass: ApiStatus;
    fetchChangePass: ApiStatus;
    fetchCheckCardId: ApiStatus;
    fetchSaleInfor: ApiStatus;
    fetchChangeSaleId: ApiStatus;
  };
}

const initialState: ClientState = {
  data: {
    loginModalOpen: false,
    forgotAccountModalOpen: false,
    accountProfile: null,
    listAccount: [],
    sessionExpired: false,
    checkNickname: null,
    listBank: [],
    listBeneficiary: [],
    checkPass: null,
    checkCardId: null,
    saleInfor: null,
    selectedAccount: null,
  },
  status: {
    fetchAccountProfile: { loading: false, error: null },
    fetchListAccount: { loading: false, error: null },
    fetchChangeNickname: { loading: false, error: null, success: false },
    fetchCheckNickname: { loading: false, error: null },
    fetchChangeAccountInfo: { loading: false, error: null, success: false },
    fetchChangeAccountAva: { loading: false, error: null, success: false },
    fetchListBank: { loading: false, error: null },
    fetchUpdateBeneficiary: { loading: false, error: null, success: false },
    fetchUpdateBeneficiaryDef: { loading: false, error: null, success: false },
    fetchDeleteBeneficiary: { loading: false, error: null, success: false },
    fetchListBeneficiary: { loading: false, error: null },
    fetchCheckPass: { loading: false, error: null },
    fetchChangePass: { loading: false, error: null, success: false },
    fetchCheckCardId: { loading: false, error: null },
    fetchSaleInfor: { loading: false, error: null },
    fetchChangeSaleId: { loading: false, error: null, success: false },
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.data.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.data.loginModalOpen = false;
    },

    openForgotAccountModal: (state) => {
      state.data.forgotAccountModalOpen = true;
    },
    closeForgotLoginModal: (state) => {
      state.data.forgotAccountModalOpen = false;
    },

    //Hiện modal phiên đăng nhập
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.data.sessionExpired = action.payload;
    },

    // Thông tin tài khoản
    fetchAccountProfileRequest(state) {
      state.status.fetchAccountProfile = { loading: true, error: null };
      state.data.accountProfile = null;
    },
    fetchAccountProfileSuccess(state, action: PayloadAction<AccountProfile>) {
      state.status.fetchAccountProfile = { loading: false, error: null };
      state.data.accountProfile = action.payload;
    },
    fetchAccountProfileFailure(state, action: PayloadAction<string>) {
      state.status.fetchAccountProfile = {
        loading: false,
        error: action.payload,
      };
      state.data.accountProfile = null;
    },

    // Lấy list account
    fetchListAccountRequest(state) {
      state.status.fetchListAccount = { loading: true, error: null };
      state.data.listAccount = [];
    },
    fetchListAccountSuccess(state, action: PayloadAction<ListAccountItem[]>) {
      state.status.fetchListAccount = { loading: false, error: null };
      state.data.listAccount = action.payload;
    },
    fetchListAccountFailure(state, action: PayloadAction<string>) {
      state.status.fetchListAccount = {
        loading: false,
        error: action.payload,
      };
      state.data.listAccount = [];
    },

    //Check nickname
    fetchCheckNicknameRequest(state, action: PayloadAction<string>) {
      state.status.fetchCheckNickname = { loading: true, error: null };
      state.data.checkNickname = null;
    },
    fetchCheckNicknameSuccess(
      state,
      action: PayloadAction<ChangeNicknameDataResponse | null>
    ) {
      state.status.fetchCheckNickname = { loading: false, error: null };
      state.data.checkNickname = action.payload;
    },
    fetchCheckNicknameFailure(state, action: PayloadAction<string>) {
      state.status.fetchCheckNickname = {
        loading: false,
        error: action.payload,
      };
      state.data.checkNickname = null;
    },

    //Đổi nickname
    fetchChangeNicknameRequest: (
      state,
      action: PayloadAction<ChangeNicknamePayload>
    ) => {
      state.status.fetchChangeNickname.loading = true;
      state.status.fetchChangeNickname.error = null;
      state.status.fetchChangeNickname.success = false;
    },
    fetchChangeNicknameSuccess: (state) => {
      state.status.fetchChangeNickname.loading = false;
      state.status.fetchChangeNickname.success = true;
    },
    fetchChangeNicknameFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangeNickname.loading = false;
      state.status.fetchChangeNickname.error = action.payload;
      state.status.fetchChangeNickname.success = false;
    },
    resetFetchChangeNickname: (state) => {
      state.status.fetchChangeNickname = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Đổi thông tin tài khoản
    fetchChangeAccountInfoRequest: (
      state,
      action: PayloadAction<ChangeAccountInfoActionPayload>
    ) => {
      state.status.fetchChangeAccountInfo = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchChangeAccountInfoSuccess: (state) => {
      state.status.fetchChangeAccountInfo = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchChangeAccountInfoFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangeAccountInfo = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchChangeAccountInfo: (state) => {
      state.status.fetchChangeAccountInfo = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Đổi thông ava tài khoản
    fetchChangeAccountImgRequest: (
      state,
      action: PayloadAction<ChangeAccountAvaPayload>
    ) => {
      state.status.fetchChangeAccountAva = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchChangeAccountImgSuccess: (state) => {
      state.status.fetchChangeAccountAva = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchChangeAccountImgFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangeAccountAva = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchChangeAccountImg: (state) => {
      state.status.fetchChangeAccountAva = {
        loading: false,
        success: false,
        error: null,
      };
    },

    // list ngân hàng
    fetchListBankRequest: (state) => {
      state.status.fetchListBank = { loading: true, error: null };
      state.data.listBank = [];
    },
    fetchListBankSuccess: (state, action: PayloadAction<BankDetail[]>) => {
      state.status.fetchListBank = { loading: false, error: null };
      state.data.listBank = action.payload;
    },
    fetchListBankFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchListBank = {
        loading: false,
        error: action.payload,
      };
      state.data.listBank = [];
    },

    // list tài khoản thụ hưởng
    fetchListBeneficiaryRequest: (state) => {
      state.status.fetchListBeneficiary = { loading: true, error: null };
      state.data.listBeneficiary = [];
    },
    fetchListBeneficiarySuccess: (
      state,
      action: PayloadAction<Beneficiary[]>
    ) => {
      state.status.fetchListBeneficiary = { loading: false, error: null };
      state.data.listBeneficiary = action.payload;
    },
    fetchListBeneficiaryFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchListBeneficiary = {
        loading: false,
        error: action.payload,
      };
      state.data.listBeneficiary = [];
    },

    // thêm ngân hàng
    fetchUpdateBeneficiaryRequest: (
      state,
      action: PayloadAction<UpdateBeneficiaryActionPayload>
    ) => {
      state.status.fetchUpdateBeneficiary = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchUpdateBeneficiarySuccess: (state) => {
      state.status.fetchUpdateBeneficiary = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchUpdateBeneficiaryFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchUpdateBeneficiary = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchUpdateBeneficiary: (state) => {
      state.status.fetchUpdateBeneficiary = {
        loading: false,
        success: false,
        error: null,
      };
    },

    // Đổi ngân hàng mặc định
    fetchUpdateBeneficiaryDefRequest: (
      state,
      action: PayloadAction<UpdateBeneficiaryDefActionPayload>
    ) => {
      state.status.fetchUpdateBeneficiaryDef = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchUpdateBeneficiaryDefSuccess: (state) => {
      state.status.fetchUpdateBeneficiaryDef = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchUpdateBeneficiaryDefFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.status.fetchUpdateBeneficiaryDef = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchUpdateBeneficiaryDef: (state) => {
      state.status.fetchUpdateBeneficiaryDef = {
        loading: false,
        success: false,
        error: null,
      };
    },

    // xóa ngân hàng
    fetchDeleteBeneficiaryRequest: (
      state,
      action: PayloadAction<DeleteBeneficiaryActionPayload>
    ) => {
      state.status.fetchDeleteBeneficiary = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchDeleteBeneficiarySuccess: (state) => {
      state.status.fetchDeleteBeneficiary = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchDeleteBeneficiaryFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchDeleteBeneficiary = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchDeleteAccountBen: (state) => {
      state.status.fetchDeleteBeneficiary = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Check pass
    fetchCheckPassRequest(state, action: PayloadAction<CheckPassPayload>) {
      state.status.fetchCheckPass = { loading: true, error: null };
      state.data.checkPass = null;
    },
    fetchCheckPassSuccess(
      state,
      action: PayloadAction<CheckPassResponse | null>
    ) {
      state.status.fetchCheckPass = { loading: false, error: null };
      state.data.checkPass = action.payload;
    },
    fetchCheckPassFailure(state, action: PayloadAction<string>) {
      state.status.fetchCheckPass = {
        loading: false,
        error: action.payload,
      };
      state.data.checkPass = null;
    },
    resetFetchCheckPass: (state) => {
      state.status.fetchCheckPass = {
        loading: false,
        error: null,
      };
      state.data.checkPass = null;
    },

    //Đổi mật khẩu
    fetchChangePassRequest: (
      state,
      action: PayloadAction<ChangePassActionPayload>
    ) => {
      state.status.fetchChangePass = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchChangePassSuccess: (state) => {
      state.status.fetchChangePass = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchChangePassFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangePass = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchChangePass: (state) => {
      state.status.fetchChangePass = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Check cardId
    fetchCheckCardIdRequest(state, action: PayloadAction<CheckCardIdPayload>) {
      state.status.fetchCheckCardId = { loading: true, error: null };
      state.data.checkCardId = null;
    },
    fetchCheckCardIdSuccess(state, action: PayloadAction<CheckCardId | null>) {
      state.status.fetchCheckCardId = { loading: false, error: null };
      state.data.checkCardId = action.payload;
    },
    fetchCheckCardIdFailure(state, action: PayloadAction<string>) {
      state.status.fetchCheckCardId = {
        loading: false,
        error: action.payload,
      };
      state.data.checkCardId = null;
    },
    resetFetchCheckCardId: (state) => {
      state.status.fetchCheckCardId = {
        loading: false,
        error: null,
      };
      state.data.checkCardId = null;
    },

    // Thông tin môi giới
    fetchSaleInforRequest(state, action: PayloadAction<string>) {
      state.status.fetchSaleInfor = { loading: true, error: null };
      state.data.saleInfor = null;
    },
    fetchSaleInforSuccess(state, action: PayloadAction<SaleInfor>) {
      state.status.fetchSaleInfor = { loading: false, error: null };
      state.data.saleInfor = action.payload;
    },
    fetchSaleInforFailure(state, action: PayloadAction<string>) {
      state.status.fetchSaleInfor = {
        loading: false,
        error: action.payload,
      };
      state.data.saleInfor = null;
    },

    //Thảy đổi môi giới
    fetchChangeSaleIdRequest(
      state,
      action: PayloadAction<ChangeSaleIdActionPayload>
    ) {
      state.status.fetchChangeSaleId = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchChangeSaleIdSuccess(state) {
      state.status.fetchChangeSaleId = {
        loading: false,
        error: null,
        success: true,
      };
    },
    fetchChangeSaleIdFailure(state, action: PayloadAction<string>) {
      state.status.fetchChangeSaleId = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchChangeSaleId: (state) => {
      state.status.fetchChangeSaleId = {
        loading: false,
        error: null,
        success: false,
      };
    },

    setSelectedAccount: (state, action: PayloadAction<string>) => {
      state.data.selectedAccount = action.payload;
    },
  },
});

export const {
  openLoginModal,

  closeLoginModal,

  openForgotAccountModal,

  closeForgotLoginModal,

  setSessionExpired,

  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
  fetchAccountProfileFailure,

  fetchListAccountRequest,
  fetchListAccountSuccess,
  fetchListAccountFailure,

  fetchCheckNicknameRequest,
  fetchCheckNicknameSuccess,
  fetchCheckNicknameFailure,

  fetchChangeNicknameRequest,
  fetchChangeNicknameSuccess,
  fetchChangeNicknameFailure,
  resetFetchChangeNickname,

  fetchChangeAccountInfoRequest,
  fetchChangeAccountInfoSuccess,
  fetchChangeAccountInfoFailure,
  resetFetchChangeAccountInfo,

  fetchChangeAccountImgRequest,
  fetchChangeAccountImgSuccess,
  fetchChangeAccountImgFailure,
  resetFetchChangeAccountImg,

  fetchListBankRequest,
  fetchListBankSuccess,
  fetchListBankFailure,

  fetchUpdateBeneficiaryRequest,
  fetchUpdateBeneficiarySuccess,
  fetchUpdateBeneficiaryFailure,
  resetFetchUpdateBeneficiary,

  fetchUpdateBeneficiaryDefRequest,
  fetchUpdateBeneficiaryDefSuccess,
  fetchUpdateBeneficiaryDefFailure,
  resetFetchUpdateBeneficiaryDef,

  fetchDeleteBeneficiaryRequest,
  fetchDeleteBeneficiarySuccess,
  fetchDeleteBeneficiaryFailure,
  resetFetchDeleteAccountBen,

  fetchListBeneficiaryRequest,
  fetchListBeneficiarySuccess,
  fetchListBeneficiaryFailure,

  fetchCheckPassRequest,
  fetchCheckPassSuccess,
  fetchCheckPassFailure,
  resetFetchCheckPass,

  fetchChangePassRequest,
  fetchChangePassSuccess,
  fetchChangePassFailure,
  resetFetchChangePass,

  fetchCheckCardIdRequest,
  fetchCheckCardIdSuccess,
  fetchCheckCardIdFailure,
  resetFetchCheckCardId,

  fetchSaleInforRequest,
  fetchSaleInforSuccess,
  fetchSaleInforFailure,

  fetchChangeSaleIdFailure,
  fetchChangeSaleIdRequest,
  fetchChangeSaleIdSuccess,
  resetFetchChangeSaleId,

  setSelectedAccount,
} = clientSlice.actions;
export default clientSlice.reducer;
