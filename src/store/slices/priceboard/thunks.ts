import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListStockByIdAPI, fetchVolumeByPriceAPI } from "../../../api";
import type {
  ListStockByIdResponse,
  VolumeByPriceResponse,
} from "../../../types";

export const fetchListStockById = createAsyncThunk<
  ListStockByIdResponse,
  string,
  { rejectValue: string }
>("priceBoard/fetchListStockById", async (groupId, { rejectWithValue }) => {
  try {
    const response: ListStockByIdResponse = await fetchListStockByIdAPI(
      groupId
    );
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return rejectWithValue(message);
  }
});

export const fetchVolumeByPrice = createAsyncThunk<
  VolumeByPriceResponse,
  string,
  { rejectValue: string }
>("priceBoard/fetchVolumeByPrice", async (stockId, { rejectWithValue }) => {
  try {
    const response = await fetchVolumeByPriceAPI(stockId);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return rejectWithValue(message);
  }
});
