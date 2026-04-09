import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderBook, OrderBookRequest } from "../orderBookType";

type OrderBookState = {
  orderBook: OrderBook | null;
};

const initialState: OrderBookState = {
  orderBook: null,
};

export const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    fetchOrderBookRequest: (
      state: OrderBookState,
      action: PayloadAction<OrderBookRequest>,
    ) => {},
    fetchOrderBookSuccess: (
      state: OrderBookState,
      action: PayloadAction<OrderBook>,
    ) => {
      state.orderBook = action.payload;
    },
    fetchOrderBookError: () => {},
  },
});

export const {
  fetchOrderBookRequest,
  fetchOrderBookSuccess,
  fetchOrderBookError,
} = orderBookSlice.actions;
export default orderBookSlice.reducer;

export const selectOrderBook = (state: { orderBook: OrderBookState }) =>
  state.orderBook.orderBook;
