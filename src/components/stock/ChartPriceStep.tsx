import { COLOR_BY_STATUS } from "@/configs/stock";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectVolumeByPriceMap } from "@/store/slices/priceboard/selector";
import { fetchVolumeByPrice } from "@/store/slices/priceboard/thunks";
import type { VolumeByPriceData } from "@/types";
import { formatPrice } from "@/utils";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useEffect, useMemo } from "react";

const BASE_OPTION = {
  title: { show: false },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    formatter: (params: echarts.TooltipComponentFormatterCallbackParams) => {
      if (!Array.isArray(params) || params.length === 0) return "";
      const item = params[0];
      const price = item.name;
      const vol = item.value;

      return `
        <div>
          <div>Giá: <b>${echarts.format.encodeHTML(
            formatPrice(price)
          )}</b></div>
          <div>Khối lượng: <b>${vol?.toLocaleString()}</b></div>
        </div>
      `;
    },
  },
  textStyle: { color: "#ffffffe0" },
  grid: { left: "5%", right: "0%", top: "0%", bottom: "0%" },
  legend: { show: false },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    splitLine: {
      show: true,
      lineStyle: { type: "dashed", color: "#2a2e3b" },
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: "category",
    axisLine: { show: false },
    axisLabel: {
      color: "#ffffffa3",
      formatter: (value: number) => formatPrice(value),
    },
    data: [],
  },
  series: [
    {
      name: "volume",
      type: "bar",
      barWidth: "60%",
      data: [],
      itemStyle: {
        borderRadius: 4,
      },
    },
  ],
};

export default function ChartPriceStep({ symbol }: { symbol: string }) {
  const dispatch = useAppDispatch();

  const volumeByPriceMap = useAppSelector(selectVolumeByPriceMap);

  useEffect(() => {
    if (symbol) {
      dispatch(fetchVolumeByPrice(symbol));
    }
  }, [symbol, dispatch]);

  const option = useMemo(() => {
    const currentLevels: VolumeByPriceData[] =
      volumeByPriceMap[symbol]?.data?.volByPriceLevels ?? [];

    if (currentLevels.length === 0) {
      return BASE_OPTION;
    }

    const prices: number[] = currentLevels.map((item) => item.price);

    const seriesData: echarts.SeriesOption["data"] = currentLevels.map(
      (item) => ({
        value: item.vol,
        itemStyle: {
          color: COLOR_BY_STATUS[item.priceChangeStatus] ?? "#888",
          borderRadius: 4,
        },
      })
    );

    return {
      ...BASE_OPTION,
      yAxis: {
        ...BASE_OPTION.yAxis,
        data: prices,
      },
      series: [
        {
          ...(BASE_OPTION.series as echarts.SeriesOption[])[0],
          data: seriesData,
        },
      ],
    };
  }, [volumeByPriceMap, symbol]);

  return (
    <div className={`w-full hide-scrollbar h-full relative`}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
}
