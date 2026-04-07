import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderPayload, OrderResponse } from "../orderType";
import type { ApiStatus } from "@/types/common";

export interface OrderState {
  data: {
    orderResult: OrderResponse["data"] | null;
  };
  status: { placeOrder: ApiStatus };
}

const initialState: OrderState = {
  data: {
    orderResult: null,
  },
  status: {
    placeOrder: { loading: false, error: null },
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state, action: PayloadAction<OrderPayload>) => {
      state.status.placeOrder = { loading: true, error: null };
    },
    orderSuccess: (state, action: PayloadAction<OrderResponse["data"]>) => {
      state.data.orderResult = action.payload;
      state.status.placeOrder = { loading: false, error: null };
    },
    orderFailure: (state, action: PayloadAction<string>) => {
      state.data.orderResult = null;
      state.status.placeOrder = { loading: false, error: action.payload };
    },
  },
});

export const { orderRequest, orderSuccess, orderFailure } = orderSlice.actions;

export default orderSlice.reducer;
