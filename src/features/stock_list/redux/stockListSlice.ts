import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  HaltRequest,
  HaltStock,
  TradingRequest,
  TradingStock,
} from "../stockListType";

type StockListState = {
  halt: HaltStock[];
  trading: TradingStock[];
};

const initialState: StockListState = {
  halt: [],
  trading: [],
};

export const stockListSlice = createSlice({
  name: "stockList",
  initialState,
  reducers: {
    fetchHaltStockListRequest: (
      _state: StockListState,
      _action: PayloadAction<HaltRequest>,
    ) => {},
    fetchHaltStockListSuccess: (
      state: StockListState,
      action: PayloadAction<HaltStock[]>,
    ) => {
      state.halt = action.payload;
    },
    fetchHaltStockListError: () => {},

    fetchTradingStockListRequest: (
      _state: StockListState,
      _action: PayloadAction<TradingRequest>,
    ) => {},
    fetchTradingStockListSuccess: (
      state: StockListState,
      action: PayloadAction<TradingStock[]>,
    ) => {
      state.trading = action.payload;
    },
    fetchTradingStockListError: () => {},
  },
});

export const {
  fetchHaltStockListRequest,
  fetchHaltStockListSuccess,
  fetchHaltStockListError,
  fetchTradingStockListRequest,
  fetchTradingStockListSuccess,
  fetchTradingStockListError,
} = stockListSlice.actions;

export default stockListSlice.reducer;

export const selectHaltStockList = (state: { stockList: StockListState }) =>
  state.stockList.halt;

export const selectTradingStockList = (state: { stockList: StockListState }) =>
  state.stockList.trading;
