import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadUserDataFromStorage } from "@/utils/userData";
import { SESSION_ID_KEY, USER_DATA_KEY } from "@/configs/auth";
import type { UserData, LoginRequest, ChangePassRequest, ChangePassResponse } from "../loginType";

type LoginState = {
  userData: UserData | null;
};

const initialState: LoginState = {
  userData: loadUserDataFromStorage(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (
      state: LoginState,
      action: PayloadAction<LoginRequest>,
    ) => { },
    loginSuccess: (state: LoginState, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    loginError: (state: LoginState) => { },
    logout: (state: LoginState) => {
      if (!state.userData) return;
      state.userData = null;
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(SESSION_ID_KEY);
    },

    changePassRequest: (
      state: LoginState,
      action: PayloadAction<ChangePassRequest>,
    ) => { },
    changePassSuccess: (state: LoginState, action: PayloadAction<ChangePassResponse>) => {
    },
    changePassError: (state: LoginState) => { },

  },
});

export const { loginRequest, loginSuccess, loginError, logout, changePassRequest, changePassSuccess, changePassError } =
  authSlice.actions;
export default authSlice.reducer;

export const selectUserData = (state: { login: LoginState }) =>
  state.login.userData;
export const selectUserId = (state: { login: LoginState }) =>
  state.login.userData?.userId;
