import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderPayload, OrderResponse } from "../orderType";
import type { RootState } from "@/store";

export interface OrderState {
  orderResult: OrderResponse["data"] | null;
  selectedSymbol: string;
}

const initialState: OrderState = {
  orderResult: null,
  selectedSymbol: '',
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state, action: PayloadAction<OrderPayload>) => {
    },
    orderSuccess: (state, action: PayloadAction<OrderResponse["data"]>) => {
      state.orderResult = action.payload;
    },
    orderFailure: (state, action: PayloadAction<string>) => {
      state.orderResult = null;
    },

    selectedSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload
    }
  },
});

export const { orderRequest, orderSuccess, orderFailure, selectedSymbol } = orderSlice.actions;

export default orderSlice.reducer;

export const selectSelectedSymbol = (state: RootState): string =>
  state.order.selectedSymbol;