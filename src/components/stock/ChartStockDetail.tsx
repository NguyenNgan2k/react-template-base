import { useAppSelector } from "@/store/hook";
import { selectSnapshotsBySymbols } from "@/store/slices/stock/selector";
import type { ChartIndexItem, PriceVolumeChart } from "@/types";
import { getChartColorDetail } from "@/utils";
import {
  AreaSeries,
  createChart,
  CrosshairMode,
  HistogramSeries,
  LastPriceAnimationMode,
  LineStyle,
  TickMarkType,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

export default function ChartStockDetail({ symbol }: { symbol: string }) {
  const abortController = new AbortController();

  const snapshots = useAppSelector((state) =>
    selectSnapshotsBySymbols(state, symbol.split(",").filter(Boolean)),
  );

  const [data, setData] = useState<PriceVolumeChart>();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const baselineSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const openIndex = 25;

  useEffect(() => {
    if (!symbol) return;
    getDataChart();
  }, [symbol]);

  const getDataChart = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/chart/symbol/candles/intraday?symbol=${symbol}&resolution=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          // body: JSON.stringify(params),
          signal: abortController.signal,
        },
      );

      const data = await response.json();

      if (
        data?.status === "ok" &&
        data?.symbol === symbol &&
        data?.data?.length > 0
      ) {
        const dataFormat: PriceVolumeChart = {
          t: [],
          o: [],
          c: [],
          h: [],
          l: [],
          v: [],
        };

        data.data.forEach((item: ChartIndexItem) => {
          dataFormat.t.push(item.t);
          dataFormat.o.push(item.o / 1000);
          dataFormat.c.push(item.c / 1000);
          dataFormat.h.push(item.h / 1000);
          dataFormat.l.push(item.l / 1000);
          dataFormat.v.push(item.v);
        });

        setData(dataFormat);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    // Tạo chart
    const chart: IChartApi = createChart(chartContainerRef.current, {
      autoSize: true,
      rightPriceScale: {
        visible: true,
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      layout: {
        background: {
          color: "#151516",
        },
        textColor: "#ffffff",
        fontFamily: "Plus Jakarta Sans",
        fontSize: 12,
        attributionLogo: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          style: LineStyle.Solid,
          width: 1,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,

        tickMarkFormatter: (time: UTCTimestamp, tickMarkType: TickMarkType) => {
          const date = new Date(time * 1000);

          const vietnameseShortMonths = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ];

          switch (tickMarkType) {
            case TickMarkType.Year:
              return date.getFullYear().toString();

            case TickMarkType.Month: {
              const monthIndex = date.getMonth(); // 0-11
              return `${vietnameseShortMonths[monthIndex]}, ${date.getFullYear()}`;
            }

            case TickMarkType.DayOfMonth:
              return date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

            case TickMarkType.Time:
            default:
              // Giờ:phút cho intraday
              return date.toLocaleTimeString("vi-VN", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
              });
          }
        },
      },
      localization: {
        timeFormatter: (time: UTCTimestamp) => {
          const date = new Date(time * 1000);
          const dateStr = date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          const timeStr = date.toLocaleTimeString("vi-VN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${dateStr} ${timeStr}`;
        },
      },
    });

    // Lưu chart vào ref
    chartRef.current = chart;

    // Tạo series
    const baselineSeries = chart.addSeries(AreaSeries, {
      topColor: "rgba(180, 160, 15, 0.15)",
      lineColor: "#fdff12",
      lineWidth: 2,
      lastPriceAnimation: LastPriceAnimationMode.Continuous,
    });
    baselineSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.15,
      },
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#0bdf39",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.9,
        bottom: 0,
      },
    });

    // Lưu series vào refs
    baselineSeriesRef.current = baselineSeries;
    volumeSeriesRef.current = volumeSeries;

    // Xử lý resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.resize(
          chartContainerRef.current.clientWidth,
          chartContainerRef.current.clientHeight,
        );
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (
      !chartRef.current ||
      !baselineSeriesRef.current ||
      !volumeSeriesRef.current ||
      (data && data.c.length <= 0) ||
      (data && data.t.length <= 0) ||
      (data && data.v.length <= 0) ||
      !data
    ) {
      return;
    }

    // Chuẩn bị dữ liệu
    const chartData: { time: UTCTimestamp; value: number }[] = [];
    const barData: { time: UTCTimestamp; value: number; color: string }[] = [];

    const chartMap = new Map<
      UTCTimestamp,
      { time: UTCTimestamp; value: number }
    >();
    const barMap = new Map<
      UTCTimestamp,
      { time: UTCTimestamp; value: number; color: string }
    >();

    for (const i in data.t) {
      const time = data.t[i] as UTCTimestamp;
      const price = data.c[i];
      const volume = data.v[i];
      const color = data.c[i] >= data.o[i] ? "#34c85a40" : "#ff001740";

      chartMap.set(time, { time, value: price });
      barMap.set(time, { time, value: volume, color });
    }

    chartData.push(
      ...Array.from(chartMap.values()).sort((a, b) => a.time - b.time),
    );
    barData.push(
      ...Array.from(barMap.values()).sort((a, b) => a.time - b.time),
    );

    // Cập nhật dữ liệu cho series
    baselineSeriesRef.current.setData(chartData);
    volumeSeriesRef.current.setData(barData);

    const lastPrice = data.c[data.c.length - 1] * 1000;
    const reference = snapshots[symbol]?.refPrices?.[4]
      ? snapshots[symbol]?.refPrices?.[4]
      : 0;
    const ceiling = snapshots[symbol]?.refPrices?.[5]
      ? snapshots[symbol]?.refPrices?.[5]
      : 0;
    const floor = snapshots[symbol]?.refPrices?.[6]
      ? snapshots[symbol]?.refPrices?.[6]
      : 0;

    // Lấy màu theo điều kiện
    const lineColor = getChartColorDetail(lastPrice, ceiling, floor, reference);
    const areaTopColor = getChartColorDetail(
      lastPrice,
      ceiling,
      floor,
      reference,
      "area",
    );

    // Cập nhật màu line và topColor của AreaSeries
    baselineSeriesRef.current.applyOptions({
      lineColor: lineColor,
      topColor: areaTopColor,
    });
  }, [data, openIndex]);

  return (
    <div ref={chartContainerRef} className="chart-container w-full h-full" />
  );
}
