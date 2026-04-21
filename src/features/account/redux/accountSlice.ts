import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AccountInfo,
  AccountInfoRequest,
  AccountStatus,
  AccountStatusRequest,
  AccountBalance,
  AccountBalanceRequest,
  AccountPortfolio,
  AccountPortfolioRequest,
  AccountListRequest,
  AccountList,
  AccountOrderBook,
  AccountOrderBookRequest,
  AccountMatchedByStepPrice,
  AccountMatchedByStepPriceRequest,
  AccountMatchedByStock,
  AccountMatchedByStockRequest,
  AccountProfitLoss,
  AccountProfitLossRequest,
  AccountLMV,
  AccountLMVRequest,
  AccountLMVEE,
  AccountLMVEERequest,
  AccountLMVUB,
  AccountLMVUBRequest,
  AccountDebt,
  AccountDebtRequest,
} from "../accountType";

type AccountState = {
  accountInfo: AccountInfo | null;
  accountStatus: AccountStatus | null;
  accountBalance: AccountBalance | null;
  accountPortfolio: AccountPortfolio[];
  accountList: AccountList[];
  accountOrderBook: AccountOrderBook[];
  accountMatchedByStepPrice: AccountMatchedByStepPrice[];
  accountMatchedByStock: AccountMatchedByStock[];
  accountProfitLoss: AccountProfitLoss[];
  accountLMV: AccountLMV[];
  accountLMVEE: AccountLMVEE[];
  accountLMVUB: AccountLMVUB;
  accountDebt: AccountDebt[];
  accountSelected: string | null;
};

const initialState: AccountState = {
  accountInfo: null,
  accountStatus: null,
  accountBalance: null,
  accountPortfolio: [],
  accountList: [],
  accountOrderBook: [],
  accountMatchedByStepPrice: [],
  accountMatchedByStock: [],
  accountProfitLoss: [],
  accountLMV: [],
  accountLMVEE: [],
  accountLMVUB: {
    eeUb: 0,
    items: [],
  },
  accountDebt: [],
  accountSelected: "0004156",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountListRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountListRequest>,
    ) => {},
    fetchAccountListSuccess: (
      state: AccountState,
      action: PayloadAction<AccountList[]>,
    ) => {
      state.accountList = action.payload;
    },
    fetchAccountListError: () => {},

    fetchAccountInfoRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountInfoRequest>,
    ) => {},
    fetchAccountInfoSuccess: (
      state: AccountState,
      action: PayloadAction<AccountInfo>,
    ) => {
      state.accountInfo = action.payload;
    },
    fetchAccountInfoError: () => {},

    fetchAccountStatusRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountStatusRequest>,
    ) => {},
    fetchAccountStatusSuccess: (
      state: AccountState,
      action: PayloadAction<AccountStatus>,
    ) => {
      state.accountStatus = action.payload;
    },
    fetchAccountStatusError: () => {},

    fetchAccountBalanceRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountBalanceRequest>,
    ) => {},
    fetchAccountBalanceSuccess: (
      state: AccountState,
      action: PayloadAction<AccountBalance>,
    ) => {
      state.accountBalance = action.payload;
    },
    fetchAccountBalanceError: () => {},

    fetchAccountPortfolioRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountPortfolioRequest>,
    ) => {},
    fetchAccountPortfolioSuccess: (
      state: AccountState,
      action: PayloadAction<AccountPortfolio[]>,
    ) => {
      state.accountPortfolio = action.payload;
    },
    fetchAccountPortfolioError: () => {},

    fetchAccountOrderBookRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountOrderBookRequest>,
    ) => {},
    fetchAccountOrderBookSuccess: (
      state: AccountState,
      action: PayloadAction<AccountOrderBook[]>,
    ) => {
      state.accountOrderBook = action.payload;
    },
    fetchAccountOrderBookError: () => {},

    fetchAccountMatchedByStepPriceRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountMatchedByStepPriceRequest>,
    ) => {},
    fetchAccountMatchedByStepPriceSuccess: (
      state: AccountState,
      action: PayloadAction<AccountMatchedByStepPrice[]>,
    ) => {
      state.accountMatchedByStepPrice = action.payload;
    },
    fetchAccountMatchedByStepPriceError: () => {},

    fetchAccountMatchedByStockRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountMatchedByStockRequest>,
    ) => {},
    fetchAccountMatchedByStockSuccess: (
      state: AccountState,
      action: PayloadAction<AccountMatchedByStock[]>,
    ) => {
      state.accountMatchedByStock = action.payload;
    },
    fetchAccountMatchedByStockError: () => {},

    fetchAccountProfitLossRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountProfitLossRequest>,
    ) => {},
    fetchAccountProfitLossSuccess: (
      state: AccountState,
      action: PayloadAction<AccountProfitLoss[]>,
    ) => {
      state.accountProfitLoss = action.payload;
    },
    fetchAccountProfitLossError: () => {},

    fetchAccountLMVRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountLMVRequest>,
    ) => {},
    fetchAccountLMVSuccess: (
      state: AccountState,
      action: PayloadAction<AccountLMV[]>,
    ) => {
      state.accountLMV = action.payload;
    },
    fetchAccountLMVError: () => {},

    fetchAccountLMVEERequest: (
      _state: AccountState,
      _action: PayloadAction<AccountLMVEERequest>,
    ) => {},
    fetchAccountLMVEESuccess: (
      state: AccountState,
      action: PayloadAction<AccountLMVEE[]>,
    ) => {
      state.accountLMVEE = action.payload;
    },
    fetchAccountLMVEEError: () => {},

    fetchAccountLMVUBRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountLMVUBRequest>,
    ) => {},
    fetchAccountLMVUBSuccess: (
      state: AccountState,
      action: PayloadAction<AccountLMVUB>,
    ) => {
      state.accountLMVUB = action.payload;
    },
    fetchAccountLMVUBError: () => {},

    fetchAccountDebtRequest: (
      _state: AccountState,
      _action: PayloadAction<AccountDebtRequest>,
    ) => {},
    fetchAccountDebtSuccess: (
      state: AccountState,
      action: PayloadAction<AccountDebt[]>,
    ) => {
      state.accountDebt = action.payload;
    },
    fetchAccountDebtError: () => {},

    setAccountSelected: (
      state: AccountState,
      action: PayloadAction<string>,
    ) => {
      state.accountSelected = action.payload;
    },
  },
});

export const {
  fetchAccountListRequest,
  fetchAccountListSuccess,
  fetchAccountListError,
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchAccountInfoError,
  fetchAccountStatusRequest,
  fetchAccountStatusSuccess,
  fetchAccountStatusError,
  fetchAccountBalanceRequest,
  fetchAccountBalanceSuccess,
  fetchAccountBalanceError,
  fetchAccountPortfolioRequest,
  fetchAccountPortfolioSuccess,
  fetchAccountPortfolioError,
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
  setAccountSelected,
} = accountSlice.actions;
export default accountSlice.reducer;

export const selectAccountList = (state: { account: AccountState }) =>
  state.account.accountList;

export const selectAccountInfo = (state: { account: AccountState }) =>
  state.account.accountInfo;

export const selectAccountStatus = (state: { account: AccountState }) =>
  state.account.accountStatus;

export const selectAccountBalance = (state: { account: AccountState }) =>
  state.account.accountBalance;

export const selectAccountPortfolio = (state: { account: AccountState }) =>
  state.account.accountPortfolio.slice(1);

export const selectAccountPortfolioTotal = (state: { account: AccountState }) =>
  state.account.accountPortfolio[0] || [];

export const selectAccountOrderBook = (state: { account: AccountState }) =>
  state.account.accountOrderBook;

export const selectAccountMatchedByStepPrice = (state: {
  account: AccountState;
}) => state.account.accountMatchedByStepPrice;

export const selectAccountMatchedByStock = (state: { account: AccountState }) =>
  state.account.accountMatchedByStock;

export const selectAccountProfitLoss = (state: { account: AccountState }) =>
  state.account.accountProfitLoss;

export const selectAccountLMV = (state: { account: AccountState }) =>
  state.account.accountLMV;

export const selectAccountLMVEE = (state: { account: AccountState }) =>
  state.account.accountLMVEE;

export const selectAccountLMVUB = (state: { account: AccountState }) =>
  state.account.accountLMVUB;

export const selectAccountDebt = (state: { account: AccountState }) =>
  state.account.accountDebt;

export const selectAccountSelected = (state: { account: AccountState }) =>
  state.account.accountSelected;
