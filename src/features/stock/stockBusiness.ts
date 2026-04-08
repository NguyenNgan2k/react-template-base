import {
  formatPrice,
  formatVolPrice,
  getColumnValueCompact,
  StringToDouble,
} from "@/utils";
import type { StockInfo, StockInfoResponse } from "./stockType";
import type { SnapshotDataCompact } from "@/types";

/**
 * Lấy giá thị trường dựa trên tham số đầu vào sàn
 *
 * @param mc -  Sàn
 * @returns - Danh sách giá thị trường
 */
export const getMarketPrice = (mc: string) => {
  if (mc === "STO") {
    return ["ATO", "ATC", "MTL"];
  } else if (mc === "STX") {
    return ["ATC", "MTL", "MOK", "MAK", "PLO"];
  }
  return [];
};

/**
 * Lấy bước giá dựa trên tham số đầu vào như sàn, giá tham chiếu
 *
 * @param mc -  Sàn
 * @param ref - Giá tham chiếu.
 * @returns - Bước giá
 */
export const getStepPrice = (mc: string, ref: number) => {
  if (mc === "STO") {
    // san HO
    if (ref < 10) {
      return 0.01;
    } else if (ref < 50) {
      return 0.05;
    } else {
      return 0.1;
    }
  } else if (mc === "STX") {
    return 0.1;
  } else {
    return 0.1;
  }
};

/**
 * Lấy tên của sàn dựa trên tham số đầu vào ký hiệu viết tắt sàn
 *
 * @param mc - ký hiệu viết tắt sàn
 * @returns - Tên của sàn
 */
export const getNameMarket = (mc: string) => {
  const marketNames: Record<string, string> = {
    HCX: "Trái phiếu HNX",
    STX: "Cổ phiếu HNX",
    UPX: "Cổ phiếu UPCOM",
    STO: "Cổ phiếu HO",
    FIO: "Index Future",
    BDO: "Bond HO",
    BDX: "Bond HNX",
    DVX: "Phái sinh",
  };
  return marketNames[mc];
};

export const mapDataStockInfo = (stockInfo: StockInfoResponse): StockInfo => ({
  id: stockInfo.id,
  sym: stockInfo.sym,
  fullName: stockInfo.fullName,
  name_vn: stockInfo.name_vn,
  c: StringToDouble(stockInfo.c),
  f: StringToDouble(stockInfo.f),
  r: StringToDouble(stockInfo.r),
  mc: stockInfo.mc,
  board_id: stockInfo.board_id,
  step: getStepPrice(stockInfo.mc, StringToDouble(stockInfo.r)),
  market_price: getMarketPrice(stockInfo.mc),
});

export const mapDataSnapshot = (snapshot: SnapshotDataCompact) => {
  const keys = [
    "ref",
    "ceiling",
    "floor",
    "high",
    "low",
    "avg",
    "totalVol",
    "foreignBuy",
    "foreignSell",
    "foreignRoom",
    "priceBuy1",
    "volumeBuy1",
    "priceBuy2",
    "volumeBuy2",
    "priceBuy3",
    "volumeBuy3",
    "priceSell1",
    "volumeSell1",
    "priceSell2",
    "volumeSell2",
    "priceSell3",
    "volumeSell3",
  ];
  return Object.fromEntries(
    keys.map((key) => [key, getColumnValueCompact(snapshot, key)]),
  );
};
