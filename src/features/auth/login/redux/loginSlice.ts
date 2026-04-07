import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadUserDataFromStorage } from "@/utils/userData";
import { SESSION_ID_KEY, USER_DATA_KEY } from "@/configs/auth";
import type { UserData, LoginRequest } from "../loginType";

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
    ) => {},
    loginSuccess: (state: LoginState, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    loginError: (state: LoginState) => {},
    logout: (state: LoginState) => {
      if (!state.userData) return;
      state.userData = null;
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(SESSION_ID_KEY);
    },
  },
});

export const { loginRequest, loginSuccess, loginError, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const selectUserData = (state: { login: LoginState }) =>
  state.login.userData;
export const selectUserId = (state: { login: LoginState }) =>
  state.login.userData?.userId;
