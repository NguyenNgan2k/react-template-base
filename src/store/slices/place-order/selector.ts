import type { RootState } from "../..";
import type { ApiStatus } from "../../../types";
import type {
  CashBalance,
  FetchShareCodeResponse,
  FetchShareStockItem,
  OrderIndayItem,
  OrderOvertimeItem,
  SymbolOrder,
  TradeHistoryValue,
} from "../../../types/placeOrder";

export const selectShareStock = (
  state: RootState
): FetchShareCodeResponse["data"] | null =>
  state.placeOrder.data.shareStockCode;

export const selectShareStockStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchShareStockCode;

export const selectListShareStock = (
  state: RootState
): FetchShareStockItem[] | null => state.placeOrder.data.listShareStock;

export const selectSymbolOrder = (state: RootState): SymbolOrder | null =>
  state.placeOrder.data.symbolOrder;

export const selectOrdersStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchOrders;

export const selectChangeOrdersStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchChangeOrder;

export const selectCancelOrdersStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchCancelOrder;

//Lịch sử lệnh trng ngày
export const selectListOrdersIndayStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchListOrdersInday;

export const selectListOrdersInday = (
  state: RootState
): OrderIndayItem[] | null => state.placeOrder.data.listOrdersInday;

//Lịch sử lệnh ngoài giờ
export const selectListOrdersOvertimeStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchListOrdersOvertime;

export const selectListOrdersOvertime = (
  state: RootState
): OrderOvertimeItem[] | null => state.placeOrder.data.listOrdersOvertime;

export const selectCashBalance = (state: RootState): CashBalance | null =>
  state.placeOrder.data.cashBalance;

export const selectCashBalanceStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchCashBalance;

export const selectTradeHistory = (
  state: RootState
): TradeHistoryValue[] | null => state.placeOrder.data.tradeHistory;

export const selectTradeHistorySymbol = (state: RootState): string | null =>
  state.placeOrder.data.tradeHistorySymbol;

export const selectTradeHistoryStatus = (state: RootState): ApiStatus =>
  state.placeOrder.status.fetchTradeHistory;
