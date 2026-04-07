import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AccountInfo,
  AccountInfoRequest,
  AccountBalance,
  AccountBalanceRequest,
} from "../accountType";

type AccountState = {
  accountInfo: AccountInfo | null;
  accountBalance: AccountBalance | null;
};

const initialState: AccountState = {
  accountInfo: null,
  accountBalance: null,
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
  },
});

export const {
  fetchAccountInfoRequest,
  fetchAccountInfoSuccess,
  fetchAccountInfoError,
  fetchAccountBalanceRequest,
  fetchAccountBalanceSuccess,
  fetchAccountBalanceError,
} = accountSlice.actions;
export default accountSlice.reducer;

export const selectAccountInfo = (state: { account: AccountState }) =>
  state.account.accountInfo;

export const selectAccountBalance = (state: { account: AccountState }) =>
  state.account.accountBalance;
