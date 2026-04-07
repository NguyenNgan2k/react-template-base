import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus } from "../../../types";
import type {
  CashBalance,
  FetchCashBalanceParams,
  FetchOrdersIndayParams,
  FetchShareStockItem,
  OrderActionPayload,
  OrderCancelActionPayload,
  OrderChangeActionPayload,
  OrderIndayItem,
  OrderOvertimeItem,
  ShareStock,
  SymbolOrder,
  TradeHistoryActionPayload,
  TradeHistoryValue,
} from "../../../types/placeOrder";

export interface PlaceOrderState {
  data: {
    shareStockCode: ShareStock | null;
    listShareStock: FetchShareStockItem[] | null;

    //Lịch sử lệnh trong ngày
    listOrdersInday: OrderIndayItem[] | null;

    //Lịch sử lệnh ngoài giờ
    listOrdersOvertime: OrderOvertimeItem[] | null;

    //Balance
    cashBalance: CashBalance | null;

    symbolOrder: SymbolOrder | null;

    //Chi tiết lệnh
    tradeHistory: TradeHistoryValue[];
    tradeHistorySymbol: string | null;
  };
  status: {
    fetchShareStockCode: ApiStatus;
    fetchListShareStock: ApiStatus;
    fetchOrders: ApiStatus;
    fetchListOrdersInday: ApiStatus;
    fetchListOrdersOvertime: ApiStatus;
    fetchCashBalance: ApiStatus;
    fetchChangeOrder: ApiStatus;
    fetchCancelOrder: ApiStatus;
    fetchTradeHistory: ApiStatus;
  };
}

const initialState: PlaceOrderState = {
  data: {
    shareStockCode: null,
    listShareStock: null,
    listOrdersInday: null,
    listOrdersOvertime: null,
    tradeHistory: [],
    cashBalance: null,
    symbolOrder: null,
    tradeHistorySymbol: null,
  },
  status: {
    fetchShareStockCode: { loading: false, error: null },
    fetchListShareStock: { loading: false, error: null },
    fetchOrders: { loading: false, error: null, success: false },
    fetchChangeOrder: { loading: false, error: null, success: false },
    fetchCancelOrder: { loading: false, error: null, success: false },
    fetchListOrdersInday: { loading: false, error: null },
    fetchListOrdersOvertime: { loading: false, error: null },
    fetchCashBalance: { loading: false, error: null },
    fetchTradeHistory: { loading: false, error: null },
  },
};

const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    //Lấy detail mã ck
    fetchShareStockCodeRequest: (
      state,
      action: PayloadAction<{ shareCode: string; volume: number }>,
    ) => {
      state.status.fetchShareStockCode = { loading: true, error: null };
      state.data.shareStockCode = null;
    },
    fetchShareStockCodeSuccess: (state, action: PayloadAction<ShareStock>) => {
      state.status.fetchShareStockCode = { loading: false, error: null };
      state.data.shareStockCode = action.payload;
    },
    fetchShareStockCodeFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchShareStockCode = {
        loading: false,
        error: action.payload,
      };
      state.data.shareStockCode = null;
    },

    //Lấy list mã chứng khoán
    fetchListShareStockRequest: (state) => {
      state.status.fetchListShareStock = { loading: true, error: null };
      state.data.listShareStock = null;
    },
    fetchListShareStockSuccess: (
      state,
      action: PayloadAction<FetchShareStockItem[]>,
    ) => {
      state.status.fetchListShareStock = { loading: false, error: null };
      state.data.listShareStock = action.payload;
    },
    fetchListShareStockFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchListShareStock = {
        loading: false,
        error: action.payload,
      };
      state.data.listShareStock = null;
    },

    //Đặt lệnh
    fetchOrdersRequest: (state, action: PayloadAction<OrderActionPayload>) => {
      state.status.fetchOrders = {
        loading: true,
        error: null,
        success: false,
      };
    },
    fetchOrdersSuccess: (state) => {
      state.status.fetchOrders = { loading: false, error: null, success: true };
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchOrders = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetFetchOrders: (state) => {
      state.status.fetchOrders = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //sửa lệnh
    fetchChangeOrderRequest: (
      state,
      action: PayloadAction<OrderChangeActionPayload>,
    ) => {
      state.status.fetchChangeOrder = {
        loading: true,
        success: false,
        error: null,
      };
    },
    fetchChangeOrderSuccess: (state) => {
      state.status.fetchChangeOrder = {
        loading: false,
        success: true,
        error: null,
      };
    },
    fetchChangeOrderFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangeOrder = {
        loading: false,
        success: false,
        error: action.payload,
      };
    },
    resetChangeOrder: (state) => {
      state.status.fetchChangeOrder = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Hủy lệnh
    fetchCancelOrderRequest: (
      state,
      action: PayloadAction<OrderCancelActionPayload>,
    ) => {
      state.status.fetchCancelOrder = {
        loading: true,
        success: false,
        error: null,
      };
    },
    fetchCancelOrderSuccess: (state) => {
      state.status.fetchCancelOrder = {
        loading: false,
        success: true,
        error: null,
      };
    },
    fetchCancelOrderFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchCancelOrder = {
        loading: false,
        success: false,
        error: action.payload,
      };
    },
    resetCancelOrder: (state) => {
      state.status.fetchCancelOrder = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Lấy list lịch sử đặt lệnh
    fetchListOrdersIndayRequest: (
      state,
      action: PayloadAction<FetchOrdersIndayParams>,
    ) => {
      state.status.fetchListOrdersInday = { loading: true, error: null };
      state.data.listOrdersInday = null;
    },
    fetchListOrdersIndaySuccess: (
      state,
      action: PayloadAction<OrderIndayItem[]>,
    ) => {
      state.status.fetchListOrdersInday = { loading: false, error: null };
      state.data.listOrdersInday = action.payload;
    },
    fetchListOrdersIndayFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchListOrdersInday = {
        loading: false,
        error: action.payload,
      };
      state.data.listOrdersInday = null;
    },

    //Lấy list lịch sử đặt lệnh ngoài giờ
    fetchListOrdersOvertimeRequest: (
      state,
      action: PayloadAction<FetchOrdersIndayParams>,
    ) => {
      state.status.fetchListOrdersOvertime = { loading: true, error: null };
      state.data.listOrdersOvertime = null;
    },
    fetchListOrdersOvertimeSuccess: (
      state,
      action: PayloadAction<OrderOvertimeItem[]>,
    ) => {
      state.status.fetchListOrdersOvertime = { loading: false, error: null };
      state.data.listOrdersOvertime = action.payload;
    },
    fetchListOrdersOvertimeFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchListOrdersOvertime = {
        loading: false,
        error: action.payload,
      };
      state.data.listOrdersOvertime = null;
    },

    //Lấy balance
    fetchCashBalanceRequest: (
      state,
      action: PayloadAction<FetchCashBalanceParams>,
    ) => {
      state.status.fetchCashBalance = { loading: true, error: null };
      state.data.cashBalance = null;
    },
    fetchCashBalanceSuccess: (state, action: PayloadAction<CashBalance>) => {
      state.status.fetchCashBalance = { loading: false, error: null };
      state.data.cashBalance = action.payload;
    },
    fetchCashBalanceFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchCashBalance = {
        loading: false,
        error: action.payload,
      };
      state.data.cashBalance = null;
    },

    //Lấy mã chứng khoán
    setSymbolOrder: (state, action: PayloadAction<SymbolOrder>) => {
      state.data.symbolOrder = action.payload;
    },

    // Lấy lịch sử khớp lệnh theo mã CK
    fetchTradeHistoryRequest: (
      state,
      action: PayloadAction<TradeHistoryActionPayload>,
    ) => {
      state.status.fetchTradeHistory = { loading: true, error: null };

      const { symbol, params } = action.payload;
      const offset = params?.offset ?? 0;

      if (offset === 0 || state.data.tradeHistorySymbol !== symbol) {
        state.data.tradeHistory = []; // reset về mảng rỗng
      }

      state.data.tradeHistorySymbol = symbol;
    },

    fetchTradeHistorySuccess: (
      state,
      action: PayloadAction<TradeHistoryValue[]>,
    ) => {
      state.status.fetchTradeHistory = { loading: false, error: null };

      state.data.tradeHistory = [...state.data.tradeHistory, ...action.payload];
    },

    fetchTradeHistoryFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchTradeHistory = {
        loading: false,
        error: action.payload,
      };
    },

    resetTradeHistory: (state) => {
      state.data.tradeHistory = [];
      state.data.tradeHistorySymbol = null;
      state.status.fetchTradeHistory = { loading: false, error: null };
    },
  },
});

export const {
  fetchShareStockCodeRequest,
  fetchShareStockCodeSuccess,
  fetchShareStockCodeFailure,

  fetchListShareStockRequest,
  fetchListShareStockSuccess,
  fetchListShareStockFailure,

  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  resetFetchOrders,

  fetchChangeOrderRequest,
  fetchChangeOrderSuccess,
  fetchChangeOrderFailure,
  resetChangeOrder,

  fetchCancelOrderRequest,
  fetchCancelOrderSuccess,
  fetchCancelOrderFailure,
  resetCancelOrder,

  fetchListOrdersIndayRequest,
  fetchListOrdersIndaySuccess,
  fetchListOrdersIndayFailure,

  fetchListOrdersOvertimeRequest,
  fetchListOrdersOvertimeSuccess,
  fetchListOrdersOvertimeFailure,

  fetchCashBalanceRequest,
  fetchCashBalanceSuccess,
  fetchCashBalanceFailure,

  setSymbolOrder,

  fetchTradeHistoryRequest,
  fetchTradeHistorySuccess,
  fetchTradeHistoryFailure,
  resetTradeHistory,
} = placeOrderSlice.actions;

export default placeOrderSlice.reducer;
