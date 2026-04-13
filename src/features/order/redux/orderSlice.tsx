import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderHistory, OrderHistoryRequest, OrderValue } from "../orderType";
import type { RootState } from "@/store";

export interface OrderState {
  selectedSymbol: string;
  selectedOrder: OrderValue | null;
  orderHistory: OrderHistory[] | null;
}

const initialState: OrderState = {
  selectedSymbol: '',
  selectedOrder: null,
  orderHistory: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload
    },

    setSelectedOrder: (state, action: PayloadAction<OrderValue>) => {
      state.selectedOrder = action.payload
    },

    fetchOrderHistoryRequest: (state, action: PayloadAction<OrderHistoryRequest>) => {
    },
    fetchOrderHistorySuccess: (state, action: PayloadAction<OrderHistory[]>) => {
      state.orderHistory = action.payload
    },
    fetchOrderHistoryError: () => {

    }
  },
});

export const { setSelectedSymbol, setSelectedOrder, fetchOrderHistoryRequest, fetchOrderHistorySuccess, fetchOrderHistoryError } = orderSlice.actions;

export default orderSlice.reducer;

export const selectSelectedSymbol = (state: RootState): string =>
  state.order.selectedSymbol;

export const selectSelectedOrder = (state: RootState): OrderValue | null =>
  state.order.selectedOrder;

export const selectOrderHistory = (state: RootState) =>
  state.order.orderHistory?.filter((o: OrderHistory) => o.type !== 'MATCHED') || [];

export const selectOrderHistoryMatched = (state: RootState) =>
  state.order.orderHistory?.filter((o: OrderHistory) => o.type === 'MATCHED') || [];