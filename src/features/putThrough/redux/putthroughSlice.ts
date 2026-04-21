import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Advertisement,
  AdvertisementRequest,
  PutThrough,
  PutThroughRequest,
} from "../putthroughType";

type PutThroughState = {
  putThrough: PutThrough[];
  advertisement: Advertisement[];
};

const initialState: PutThroughState = {
  putThrough: [],
  advertisement: [],
};

export const putThroughSlice = createSlice({
  name: "putThrough",
  initialState,
  reducers: {
    fetchPutThroughRequest: (
      state: PutThroughState,
      action: PayloadAction<PutThroughRequest>,
    ) => {},
    fetchPutThroughSuccess: (
      state: PutThroughState,
      action: PayloadAction<PutThrough[]>,
    ) => {
      state.putThrough = action.payload;
    },
    fetchPutThroughError: () => {},

    fetchAdvertisementRequest: (
      state: PutThroughState,
      action: PayloadAction<AdvertisementRequest>,
    ) => {},
    fetchAdvertisementSuccess: (
      state: PutThroughState,
      action: PayloadAction<PutThrough[]>,
    ) => {
      state.advertisement = action.payload;
    },
    fetchAdvertisementError: () => {},
  },
});

export const {
  fetchPutThroughRequest,
  fetchPutThroughSuccess,
  fetchPutThroughError,

  fetchAdvertisementRequest,
  fetchAdvertisementSuccess,
  fetchAdvertisementError,
} = putThroughSlice.actions;
export default putThroughSlice.reducer;

export const selectPutThrough = (state: { putThrough: PutThroughState }) =>
  state.putThrough.putThrough;

export const selectAdvertisement = (state: { putThrough: PutThroughState }) =>
  state.putThrough.advertisement;
