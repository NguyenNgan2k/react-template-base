import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StockInfo, StockInfoRequest } from "../stockType";

type StockState = {
  stockInfo: StockInfo | null;
};

const initialState: StockState = {
  stockInfo: null,
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStockInfoRequest: (
      state: StockState,
      action: PayloadAction<StockInfoRequest>,
    ) => {},
    fetchStockInfoSuccess: (
      state: StockState,
      action: PayloadAction<StockInfo>,
    ) => {
      state.stockInfo = action.payload;
    },
    fetchStockInfoError: (state: StockState) => {},
  },
});

export const {
  fetchStockInfoRequest,
  fetchStockInfoSuccess,
  fetchStockInfoError,
} = stockSlice.actions;
export default stockSlice.reducer;

export const selectStockInfo = (state: { stockInfo: StockState }) =>
  state.stockInfo.stockInfo;
