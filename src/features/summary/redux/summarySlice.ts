import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  StockSummary,
  StockSummaryRequest,
  BrokerSummary,
  ChannelSummary,
  ChannelSummaryRequest,
  TransactionSummaryRequest,
} from "../summaryType";

type summaryState = {
  transactionSummary: BrokerSummary[];
  channelSummary: ChannelSummary[];
  stockSummary: StockSummary[];
};

const initialState: summaryState = {
  transactionSummary: [],
  channelSummary: [],
  stockSummary: [],
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    fetchTransactionSummaryRequest: (
      _state: summaryState,
      _action: PayloadAction<TransactionSummaryRequest>,
    ) => {},
    fetchTransactionSummarySuccess: (
      state: summaryState,
      action: PayloadAction<BrokerSummary[]>,
    ) => {
      state.transactionSummary = action.payload;
    },
    fetchTransactionSummaryError: () => {},

    fetchChannelSummaryRequest: (
      _state: summaryState,
      _action: PayloadAction<ChannelSummaryRequest>,
    ) => {},
    fetchChannelSummarySuccess: (
      state: summaryState,
      action: PayloadAction<ChannelSummary[]>,
    ) => {
      state.channelSummary = action.payload;
    },
    fetchChannelSummaryError: () => {},

    fetchStockSummaryRequest: (
      _state: summaryState,
      _action: PayloadAction<StockSummaryRequest>,
    ) => {},
    fetchStockSummarySuccess: (
      state: summaryState,
      action: PayloadAction<StockSummary[]>,
    ) => {
      state.stockSummary = action.payload;
    },
    fetchStockSummaryError: () => {},
  },
});

export const {
  fetchTransactionSummaryRequest,
  fetchTransactionSummarySuccess,
  fetchTransactionSummaryError,
  fetchChannelSummaryRequest,
  fetchChannelSummarySuccess,
  fetchChannelSummaryError,
  fetchStockSummaryRequest,
  fetchStockSummarySuccess,
  fetchStockSummaryError,
} = summarySlice.actions;

export default summarySlice.reducer;

export const selectTransactionSummary = (state: { summary: summaryState }) =>
  state.summary.transactionSummary;

export const selectChannelSummary = (state: { summary: summaryState }) =>
  state.summary.channelSummary;

export const selectStockSummary = (state: { summary: summaryState }) =>
  state.summary.stockSummary;
