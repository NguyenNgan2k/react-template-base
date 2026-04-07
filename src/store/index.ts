import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import loginSaga from "@/features/auth/login/redux/loginSaga";
import loginSlice from "@/features/auth/login/redux/loginSlice";

import accountSaga from "@/features/account/redux/accountSaga";
import accountSlice from "@/features/account/redux/accountSlice";

import stockSaga from "@/features/stock/redux/stockSaga";
import stockSlice from "@/features/stock/redux/stockSlice";

import clientSaga from "./slices/client/saga";
import clientSlice from "./slices/client/slice";

import priceBoardSlice from "./slices/priceboard/slice";

function* rootSaga() {
  yield all([loginSaga(), accountSaga(), stockSaga(), clientSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    priceBoard: priceBoardSlice,
    login: loginSlice,
    account: accountSlice,
    stockInfo: stockSlice,
    client: clientSlice,
    stock: stockSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
