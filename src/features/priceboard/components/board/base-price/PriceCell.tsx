import { KEYS_COLOR_BASE } from "@/configs";
import type { PriceCompare, SnapshotDataCompact } from "@/types";
import { registerVisibleCell, unregisterVisibleCell } from "@/utils";
import { getArr, getColumnValueCompact } from "@/utils/priceboard";
import { memo, useEffect, useMemo, useRef } from "react";

interface PriceCellProps {
  symbol: string;
  cellKey: string;
  width?: string;
  snapshot: SnapshotDataCompact;
  disableFlash?: boolean; // tắt flash cho symbol
  pinned?: boolean; // đỏi màu mark
  handlePinSymbol?: (symbol: string) => void;
}

const PriceCell = memo(function PriceCell({
  symbol,
  cellKey,
  width,
  snapshot,
  disableFlash = false,
}: PriceCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disableFlash) return;
    const el = cellRef.current;
    if (el) {
      registerVisibleCell(symbol, cellKey, el);
    }
    return () => {
      unregisterVisibleCell(symbol, cellKey);
    };
  }, [symbol, cellKey, disableFlash]);

  // === TÍNH MÀU ===
  const colorClass = useMemo(() => {
    let color = "";
    if (cellKey === "ceil") color = "c";
    if (cellKey === "floor") color = "f";
    if (cellKey === "ref") color = "r";

    const tradeCmp = snapshot.trade?.[13] as PriceCompare | undefined;
    const orderBook = snapshot.orderBook;

    const bids = getArr(orderBook?.[22]);
    const asks = getArr(orderBook?.[23]);

    // SYMBOL: dùng màu trade
    if (cellKey === "symbol") {
      color = `${tradeCmp ?? "x"} cursor-pointer`;
    }

    // CÁC CỘT GIAO DỊCH
    if (
      ["lastPrice", "change", "changePercent", "lastVolume"].some((k) =>
        cellKey.includes(k),
      )
    ) {
      color = tradeCmp ?? "";
    }

    // ORDERBOOK
    if (orderBook) {
      if (cellKey.startsWith("priceBuy") || cellKey.startsWith("volumeBuy")) {
        const i = parseInt(cellKey.slice(-1), 10) - 1;
        color = (bids[i * 3 + 2] as PriceCompare) ?? "";
      }
      if (cellKey.startsWith("priceSell") || cellKey.startsWith("volumeSell")) {
        const i = parseInt(cellKey.slice(-1), 10) - 1;
        color = (asks[i * 3 + 2] as PriceCompare) ?? "";
      }
      if (cellKey === "high")
        color = (orderBook[24]?.split("|")[1] as PriceCompare) ?? "";
      if (cellKey === "low")
        color = (orderBook[25]?.split("|")[1] as PriceCompare) ?? "";
      if (cellKey === "avg")
        color = (orderBook[28]?.split("|")[1] as PriceCompare) ?? "";
    }

    const colorBase = KEYS_COLOR_BASE.includes(cellKey) ? "x" : "";

    const finalClass = [
      "flex items-center justify-center text-xs font-medium h-7 cell",
      "transition-colors duration-75",
      color,
      colorBase,
    ]
      .filter(Boolean)
      .join(" ");

    return finalClass;
  }, [snapshot, cellKey]);

  // === TÍNH GIÁ TRỊ ===
  const value = getColumnValueCompact(snapshot, cellKey);

  const className = [
    "flex items-center justify-center text-xs font-medium h-7 cell",
    "transition-colors duration-75",
    colorClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={cellRef}
      data-symbol={symbol}
      data-key={cellKey}
      className={className}
      style={{ width: width }}
    >
      <span
      // onClick={() => {
      //   if (cellKey === "symbol") {
      //     dispatch(setDetailSymbol(symbol + ""));
      //   }
      // }}
      >
        {value ?? ""}
      </span>
    </div>
  );
});

export default PriceCell;
