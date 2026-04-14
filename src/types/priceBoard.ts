import type { ApiResponse } from "./common";

export interface Stock {
  code: string;
  name: string;
  price: number;
  change: number;
}

export interface Snapshot {
  sym: string;
  lastPrice: number;
  volume: number;
  change: number;
}

export interface InfoIndex {
  insertedAt: string;
  marketId: string;
  tradingSessionId: string;
  marketIndexClass: string;
  indexsTypeCode: string;
  currency: string;
  transactTime: string;

  openIndexes: number;
  valueIndexes: number;
  totalVolumeTraded: number;
  grossTradeAmt: number;
  contauctAccTrdvol: number;
  contauctAccTrdval: number;
  blktrdAccTrdvol: number;
  blktrdAccTrdval: number;

  fluctuationUpperLimitIssueCount: number;
  fluctuationUpIssueCount: number;
  fluctuationSteadinessIssueCount: number;
  fluctuationDownIssueCount: number;
  fluctuationLowerLimitIssueCount: number;

  fluctuationUpIssueVolume: number;
  fluctuationDownIssueVolume: number;
  fluctuationSteadinessIssueVolume: number;

  status: string;
  openIndex: number;
  change: number;
  percentChange: number;
}

export interface ChartIndexItem {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}

export interface ChartDataIndex {
  status: string;
  symbol: string;
  type: string;
  resolution: string;
  count: number;
  data: ChartIndexItem[];
}

export interface PriceVolumeChart {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
}

export interface topStockTradedItem {
  boardId: string;
  symbol: string;
  totalVolumeTraded: number;
  totalValueTraded: number;
  lastPrice: number;
  status: string;
}

export interface topForeignTradedItem {
  marketId: string;
  boardId: string;
  symbol: string;
  sellVolumeTotal: number;
  sellTradeAmountTotal: number;
  buyVolumeTotal: number;
  volumeTotal: number;
  buyTradeAmountTotal: number;
  amountTotal: number;
  lastPrice: number;
  status: string;
}

export interface PriceBoardMenuGroup {
  label: string;
  key: string;
  items: {
    id: string;
    name: string;
    market?: string;
    type?: string;
    isCustom?: boolean;
  }[];
}

export interface TableColumn {
  key: string;
  label: string;
  width: number;
  default: boolean;
  children?: TableColumn[];
}

export interface ListStockByIdResponse {
  groupId: string;
  symbols: string[];
}

export interface Favorite {
  key: string;
  label: string;
  id: string;
  symbols: string[];
}

export interface CachedBoardData {
  groupId: string;
  symbols: string[];
}

export type QuickOrderSymbol = {
  symbol: string;
  price: string;
} | null;

export type VolumeByPriceData = {
  price: number;
  vol: number;
  pct: number;
  priceChangeStatus: string;
};

export type VolumeByPrice = {
  shortStockSymbol: string;
  marketId: string;
  boardId: string;
  symbolKey: string;
  tradeDate: string;
  totalVol: number;
  volByPriceLevels: VolumeByPriceData[];
};

export type VolumeByPriceResponse = ApiResponse<VolumeByPrice>;

export interface SocketState {
  status: "connecting" | "open" | "closed" | "error" | "reconnecting";
  reconnectAttempts: number;
}
