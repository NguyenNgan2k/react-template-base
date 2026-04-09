import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderPayload, OrderResponse, OrderValue } from "../orderType";
import type { RootState } from "@/store";

export interface OrderState {
  orderResult: OrderResponse["data"] | null;
  selectedSymbol: string;
  selectedOrder: OrderValue | null
}

const initialState: OrderState = {
  orderResult: null,
  selectedSymbol: '',
  selectedOrder: null
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
    },

    selectedOrder: (state, action: PayloadAction<OrderValue>) => {
      state.selectedOrder = action.payload
    }
  },
});

export const { orderRequest, orderSuccess, orderFailure, selectedSymbol, selectedOrder } = orderSlice.actions;

export default orderSlice.reducer;

export const selectSelectedSymbol = (state: RootState): string =>
  state.order.selectedSymbol;

export const selectSelectedOrder = (state: RootState): OrderValue | null =>
  state.order.selectedOrder;