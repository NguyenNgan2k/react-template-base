import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderDetail, OrderDetailRequest, OrderValue } from "../orderType";
import type { RootState } from "@/store";

export interface OrderState {
  selectedSymbol: string;
  selectedOrder: OrderValue | null;
  orderDetail: OrderDetail[] | null;
}

const initialState: OrderState = {
  selectedSymbol: '',
  selectedOrder: null,
  orderDetail: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    selectedSymbol: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload
    },

    selectedOrder: (state, action: PayloadAction<OrderValue>) => {
      state.selectedOrder = action.payload
    },

    fetchOrderDetailRequest: (state, action: PayloadAction<OrderDetailRequest>) => {
    },
    fetchOrderDetailSuccess: (state, action: PayloadAction<OrderDetail[]>) => {
      state.orderDetail = action.payload
    },
    fetchOrderDetailError: () => {

    }
  },
});

export const { selectedSymbol, selectedOrder, fetchOrderDetailRequest, fetchOrderDetailSuccess, fetchOrderDetailError } = orderSlice.actions;

export default orderSlice.reducer;

export const selectSelectedSymbol = (state: RootState): string =>
  state.order.selectedSymbol;

export const selectSelectedOrder = (state: RootState): OrderValue | null =>
  state.order.selectedOrder;

export const selectOrderDetail = (state: RootState) =>
  state.order.orderDetail;