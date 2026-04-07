import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ApiStatus,
  Favorite,
  QuickOrderSymbol,
  SocketState,
  VolumeByPriceResponse,
} from "../../../types";
import { fetchListStockById, fetchVolumeByPrice } from "./thunks";

export interface PriceBoardState {
  data: {
    lists: Record<string, string[]>;
    scrollToSymbol: string | null;
    favorites: Favorite[];
    quickOrderSymbol: QuickOrderSymbol | null;

    volumeByPrice: Record<string, VolumeByPriceResponse>;

    reconnectAttempts: number;
    status: "connecting" | "open" | "closed" | "error" | "reconnecting";
    error?: string;
  };
  status: {
    fetchListStockById: Record<string, ApiStatus>;
    fetchVolumeByPrice: Record<string, ApiStatus>;
  };
}

const initialState: PriceBoardState = {
  data: {
    lists: {},
    scrollToSymbol: null,
    favorites: [],
    quickOrderSymbol: null,
    volumeByPrice: {},

    status: "closed",
    reconnectAttempts: 0,
  },
  status: { fetchListStockById: {}, fetchVolumeByPrice: {} },
};

const priceBoardSlice = createSlice({
  name: "priceBoard",
  initialState,
  reducers: {
    setListStockByIdFromCache: {
      prepare: (groupId: string, symbols: string[]) => ({
        payload: { groupId, symbols },
      }),
      reducer: (
        state,
        action: PayloadAction<{ groupId: string; symbols: string[] }>,
      ) => {
        const { groupId, symbols } = action.payload;
        state.data.lists[groupId] = symbols;
        state.status.fetchListStockById[groupId] = {
          loading: false,
          error: null,
        };
      },
    },
    setScrollToSymbol(state, action: PayloadAction<string | null>) {
      state.data.scrollToSymbol = action.payload;
    },
    setFavoriteSymbol(state, action: PayloadAction<Favorite[]>) {
      state.data.favorites = action.payload;
    },
    setQuickOrderSymbol(state, action: PayloadAction<QuickOrderSymbol>) {
      state.data.quickOrderSymbol = action.payload;
    },
    setStatusSocket: (
      state,
      action: PayloadAction<{
        status: SocketState["status"];
        error?: string;
        reconnectAttempts?: number;
      }>,
    ) => {
      state.data.status = action.payload.status;
      if (action.payload.error !== undefined) {
        state.data.error = action.payload.error;
      }
      if (action.payload.reconnectAttempts !== undefined) {
        state.data.reconnectAttempts = action.payload.reconnectAttempts;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListStockById.pending, (state, action) => {
        const groupId = action.meta.arg;
        state.status.fetchListStockById[groupId] = {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchListStockById.fulfilled, (state, action) => {
        const { groupId, symbols } = action.payload;
        state.data.lists[groupId] = symbols;
        state.status.fetchListStockById[groupId] = {
          loading: false,
          error: null,
        };
      })
      .addCase(fetchListStockById.rejected, (state, action) => {
        const groupId = action.meta.arg;
        state.status.fetchListStockById[groupId] = {
          loading: false,
          error: action.payload ?? "Error",
        };
      })

      // ===== Volume by price =====
      .addCase(fetchVolumeByPrice.pending, (state, action) => {
        const stockId = action.meta.arg;
        state.status.fetchVolumeByPrice[stockId] = {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchVolumeByPrice.fulfilled, (state, action) => {
        const stockId = action.meta.arg;
        state.data.volumeByPrice[stockId] = action.payload;
        state.status.fetchVolumeByPrice[stockId] = {
          loading: false,
          error: null,
        };
      })
      .addCase(fetchVolumeByPrice.rejected, (state, action) => {
        const stockId = action.meta.arg;
        state.status.fetchVolumeByPrice[stockId] = {
          loading: false,
          error: action.payload ?? "Error",
        };
      });
  },
});

export const {
  setListStockByIdFromCache,
  setScrollToSymbol,
  setFavoriteSymbol,
  setQuickOrderSymbol,
  setStatusSocket,
} = priceBoardSlice.actions;
export default priceBoardSlice.reducer;
