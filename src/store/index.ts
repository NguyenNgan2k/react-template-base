import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import loginSaga from "@/features/auth/login/redux/loginSaga";
import loginSlice from "@/features/auth/login/redux/loginSlice";

import accountSaga from "@/features/account/redux/accountSaga";
import accountSlice from "@/features/account/redux/accountSlice";

import stockSaga from "@/features/stock/redux/stockSaga";
import stockSlice from "@/features/stock/redux/stockSlice";

import orderSaga from "@/features/order/redux/orderSaga";
import orderSlice from "@/features/order/redux/orderSlice";

import orderBookSaga from "@/features/order-book/redux/orderBookSaga";
import orderBookSlice from "@/features/order-book/redux/orderBookSlice";

import putThroughSaga from "@/features/putthrough/redux/putthroughSaga";
import putThroughSlice from "@/features/putthrough/redux/putthroughSlice";

import msgSessionSaga from "@/features/msg-session/redux/msgSessionSaga";
import msgSessionSlice from "@/features/msg-session/redux/msgSessionSlice";

import stockListSaga from "@/features/stock_list/redux/stockListSaga";
import stockListSlice from "@/features/stock_list/redux/stockListSlice";

import accountManagementSaga from "@/features/account-mgmt/redux/accountManagementSaga";
import accountManagementSlice from "@/features/account-mgmt/redux/accountManagementSlice";

import summarySaga from "@/features/summary/redux/summarySaga";
import summarySlice from "@/features/summary/redux/summarySlice";

import clientSaga from "./slices/client/saga";
import clientSlice from "./slices/client/slice";

import priceBoardSlice from "./slices/priceboard/slice";

function* rootSaga() {
  yield all([
    loginSaga(),
    accountSaga(),
    stockSaga(),
    orderSaga(),
    orderBookSaga(),
    putThroughSaga(),
    msgSessionSaga(),
    stockListSaga(),
    accountManagementSaga(),
    summarySaga(),
    clientSaga(),
  ]);
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
    order: orderSlice,
    orderBook: orderBookSlice,
    putThrough: putThroughSlice,
    msgSession: msgSessionSlice,
    stockList: stockListSlice,
    accountManagement: accountManagementSlice,
    summary: summarySlice,
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
