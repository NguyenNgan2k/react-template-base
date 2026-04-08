import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AccountInfo,
  AccountInfoRequest,
  AccountBalance,
  AccountBalanceRequest,
  AccountPortfolio,
  AccountPortfolioRequest,
} from "../accountType";

type AccountState = {
  accountInfo: AccountInfo | null;
  accountBalance: AccountBalance | null;
  accountPortfolio: AccountPortfolio[] | null;
};

const initialState: AccountState = {
  accountInfo: null,
  accountBalance: null,
  accountPortfolio: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountInfoRequest: (
      state: AccountState,
      action: PayloadAction<AccountInfoRequest>,
    ) => {},
    fetchAccountInfoSuccess: (
      state: AccountState,
      action: PayloadAction<AccountInfo>,
    ) => {
      state.accountInfo = action.payload;
    },
    fetchAccountInfoError: (state: AccountState) => {},
    fetchAccountBalanceRequest: (
      state: AccountState,
      action: PayloadAction<AccountBalanceRequest>,
    ) => {},
    fetchAccountBalanceSuccess: (
      state: AccountState,
      action: PayloadAction<AccountBalance>,
    ) => {
      state.accountBalance = action.payload;
    },
    fetchAccountBalanceError: (state: AccountState) => {},
    fetchAccountPortfolioRequest: (
      state: AccountState,
      action: PayloadAction<AccountPortfolioRequest>,
    ) => {},
    fetchAccountPortfolioSuccess: (
      state: AccountState,
      action: PayloadAction<AccountPortfolio[]>,
    ) => {
      state.accountPortfolio = action.payload;
    },
    fetchAccountPortfolioError: (state: AccountState) => {},
  },
});

export const {
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchAccountInfoError,
  fetchAccountBalanceRequest,
  fetchAccountBalanceSuccess,
  fetchAccountBalanceError,
  fetchAccountPortfolioRequest,
  fetchAccountPortfolioSuccess,
  fetchAccountPortfolioError,
} = accountSlice.actions;
export default accountSlice.reducer;

export const selectAccountInfo = (state: { account: AccountState }) =>
  state.account.accountInfo;

export const selectAccountBalance = (state: { account: AccountState }) =>
  state.account.accountBalance;

export const selectAccountPortfolio = (state: { account: AccountState }) =>
  state.account.accountPortfolio;
