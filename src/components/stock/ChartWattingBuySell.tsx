import { usePerfectScrollbar } from "@/hooks/usePerfectScrollbar.ts";
import { useAppSelector } from "@/store/hook";
import { selectSnapshotsBySymbols } from "@/store/slices/stock/selector";
import { formatPrice, formatVolPrice, StringToInt } from "@/utils";
import { useMemo } from "react";

export default function ChartWaitingBuySell({
  symbol,
  className,
}: {
  symbol: string;
  className?: string;
  height?: number;
}) {
  const snapshots = useAppSelector((state) =>
    selectSnapshotsBySymbols(state, symbol.split(",").filter(Boolean)),
  );

  const orderBook = snapshots[symbol]?.orderBook;

  const { containerRef } = usePerfectScrollbar();

  const { totalBuy, totalSell, buyData, sellData } = useMemo(() => {
    if (!orderBook?.["22"] || !orderBook?.["23"]) {
      return {
        totalBuy: 0,
        totalSell: 0,
        buyLevels: 0,
        sellLevels: 0,
        buyData: [],
        sellData: [],
      };
    }

    const buyParts = orderBook["22"].split("|");
    const sellParts = orderBook["23"].split("|");

    const buyLevels = buyParts.length / 3;
    const sellLevels = sellParts.length / 3;

    let totalBuy = 0;
    let totalSell = 0;

    const buyData = [];
    const sellData = [];

    for (let i = 0; i < buyLevels; i++) {
      const vol = StringToInt(buyParts[i * 3 + 1]);
      totalBuy += vol;
      buyData.push({
        price: buyParts[i * 3],
        vol,
        colorClass: buyParts[i * 3 + 2] || "text-text-base",
      });
    }

    for (let i = 0; i < sellLevels; i++) {
      const vol = StringToInt(sellParts[i * 3 + 1]);
      totalSell += vol;
      sellData.push({
        price: sellParts[i * 3],
        vol,
        colorClass: sellParts[i * 3 + 2] || "text-text-base",
      });
    }

    return { totalBuy, totalSell, buyLevels, sellLevels, buyData, sellData };
  }, [orderBook]);

  if (!orderBook || (totalBuy === 0 && totalSell === 0)) {
    return (
      <div
        className={`${className} flex items-center justify-center text-xs text-text-title`}
      >
        Không có dữ liệu!
      </div>
    );
  }

  const totalAll = totalBuy + totalSell;

  return (
    <div
      className={`${className ?? ""} flex flex-col gap-1 h-full`}
      ref={containerRef}
    >
      {/* Header */}
      <div className="grid grid-cols-2">
        <div className="h-10 max-2xl:h-8 bg-gray-300 flex items-center justify-between px-2">
          <span className="text-xs text-text-base">KL</span>
          <span className="text-xs text-text-base">Giá mua</span>
        </div>
        <div className="h-10 max-2xl:h-8 bg-gray-300 flex items-center justify-between px-2">
          <span className="text-xs text-text-base">KL</span>
          <span className="text-xs text-text-base">Giá bán</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-1 flex-1 h-full">
        {/* Mua */}
        <div className="flex flex-col gap-1">
          {buyData.map(({ price, vol, colorClass }, index) => {
            const ratio = totalBuy > 0 ? (vol / totalBuy) * 100 : 0;
            return (
              <div
                key={index}
                className="relative flex items-center justify-between flex-1 max-h-9"
              >
                <div
                  className="absolute right-0 h-full bg-gray-300/50 rounded"
                  style={{ width: `${ratio}%` }}
                />
                <div className="relative z-10 w-full flex justify-between px-1">
                  <span className="text-xs text-text-base">
                    {formatVolPrice(vol)}
                  </span>
                  <span className={`text-xs ${colorClass}`}>
                    {formatPrice(price)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bán */}
        <div className="flex flex-col gap-1">
          {sellData.map(({ price, vol, colorClass }, index) => {
            const ratio = totalSell > 0 ? (vol / totalSell) * 100 : 0;
            return (
              <div
                key={index}
                className="relative flex items-center justify-between flex-1 max-h-9"
              >
                <div
                  className="absolute left-0 h-full bg-gray-300/50 rounded"
                  style={{ width: `${ratio}%` }}
                />
                <div className="relative z-10 w-full flex justify-between px-1">
                  <span className={`text-xs ${colorClass}`}>
                    {formatPrice(price)}
                  </span>
                  <span className="text-xs text-text-base">
                    {formatVolPrice(vol)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tổng KL */}
      <div className="flex h-8 max-2xl:h-5!">
        <div
          className="bg-green-500 rounded-l flex items-center px-1 text-sm"
          style={{
            width: totalAll > 0 ? `${(totalBuy / totalAll) * 100}%` : "50%",
          }}
        >
          {formatVolPrice(totalBuy)}
        </div>
        <div
          className="bg-red-500 rounded-r flex items-center justify-end px-1 text-sm"
          style={{
            width: totalAll > 0 ? `${(totalSell / totalAll) * 100}%` : "50%",
          }}
        >
          {formatVolPrice(totalSell)}
        </div>
      </div>
    </div>
  );
}
