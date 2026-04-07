import { KEYS_QUICK_ORDER } from "@/configs";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectToken } from "@/store/slices/auth/selector";
import { openLoginModal } from "@/store/slices/client/slice";
import { setQuickOrderSymbol } from "@/store/slices/priceboard/slice";
import { setDetailSymbol } from "@/store/slices/stock/slice";
import type { PriceCompare, SnapshotDataCompact } from "@/types";
import {
  getColumnValueCompact,
  getMappedPriceKey,
  registerVisibleCell,
  unregisterVisibleCell,
} from "@/utils";
import { memo, useEffect, useRef } from "react";

interface PriceCellProps {
  symbol: string;
  cellKey: string;
  width?: string;
  snapshot: SnapshotDataCompact;
  disableFlash?: boolean; // tắt flash cho symbolc
}

const PriceCell = memo(function PriceCell({
  symbol,
  cellKey,
  width,
  snapshot,
  disableFlash = false,
}: PriceCellProps) {
  const dispatch = useAppDispatch();
  const cellRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector(selectToken);

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
  const colorClass = (() => {
    if (cellKey === "ceil") return "c";
    if (cellKey === "floor") return "f";
    if (cellKey === "ref") return "r";

    const tradeCmp = snapshot.trade?.[13] as PriceCompare | undefined;
    const orderBook = snapshot.orderBook;

    const getArr = (value: string | string[] | undefined): string[] => {
      if (typeof value === "string") return value.split("|");
      if (Array.isArray(value)) {
        return value.every((v): v is string => typeof v === "string")
          ? value
          : [];
      }
      return [];
    };

    const bids = getArr(orderBook?.[22]);
    const asks = getArr(orderBook?.[23]);

    // SYMBOL: dùng màu trade
    if (cellKey === "symbol") {
      return `${tradeCmp} cursor-pointer stock-row`;
    }

    // CÁC CỘT GIAO DỊCH
    if (
      ["lastPrice", "change", "changePercent", "lastVolume"].some((k) =>
        cellKey.includes(k),
      )
    ) {
      return tradeCmp ?? "";
    }

    // ORDERBOOK
    if (orderBook) {
      if (cellKey.startsWith("priceBuy") || cellKey.startsWith("volumeBuy")) {
        const i = parseInt(cellKey.slice(-1), 10) - 1;
        return (bids[i * 3 + 2] as PriceCompare) ?? "";
      }
      if (cellKey.startsWith("priceSell") || cellKey.startsWith("volumeSell")) {
        const i = parseInt(cellKey.slice(-1), 10) - 1;
        return (asks[i * 3 + 2] as PriceCompare) ?? "";
      }
      if (cellKey === "high")
        return (orderBook[24]?.split("|")[1] as PriceCompare) ?? "";
      if (cellKey === "low")
        return (orderBook[25]?.split("|")[1] as PriceCompare) ?? "";
      if (cellKey === "avg")
        return (orderBook[28]?.split("|")[1] as PriceCompare) ?? "";
    }

    return "";
  })();

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
    <>
      <div
        ref={cellRef}
        data-symbol={symbol}
        data-key={cellKey}
        className={className}
        style={{ width: width }}
      >
        <span
          {...(KEYS_QUICK_ORDER.includes(cellKey)
            ? {
                id: "global-tooltip",
                "data-tooltip-id": "global-tooltip",
                "data-tooltip-content": "Click đúp để đặt lệnh",
                "data-tooltip-place": "right",
              }
            : {})}
          onClick={() => {
            if (cellKey === "symbol") {
              dispatch(setDetailSymbol(symbol + ""));
            }
          }}
          onDoubleClick={() => {
            if (token) {
              if (KEYS_QUICK_ORDER.includes(cellKey)) {
                const priceKey = getMappedPriceKey(cellKey);
                const priceValue = getColumnValueCompact(snapshot, priceKey);

                if (priceValue && symbol)
                  dispatch(setQuickOrderSymbol({ symbol, price: priceValue }));
              }
            } else {
              dispatch(openLoginModal());
            }
          }}
        >
          {value ?? ""}
        </span>
      </div>
    </>
  );
});

export default PriceCell;
