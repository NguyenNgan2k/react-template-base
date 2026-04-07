import {
  selectTradeHistory,
  selectTradeHistoryStatus,
  selectTradeHistorySymbol,
} from "@/store/slices/place-order/selector";
import { fetchTradeHistoryRequest } from "@/store/slices/place-order/slice";
import type { TradeHistoryValue } from "@/types";
import _ from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getScrollbarSize,
  List,
  useListRef,
  type RowComponentProps,
} from "react-window";
import { usePrevious } from "../../hooks/usePrevious";
import { useAppSelector } from "../../store/hook";
import { formatPrice, formatVolPrice, numberFormat } from "../../utils";

function OrderHisDetail({ symbol }: { symbol: string }) {
  const dispatch = useDispatch();

  const tradeHistory = useAppSelector(selectTradeHistory);
  const { loading } = useAppSelector(selectTradeHistoryStatus);
  const currentSymbol = useAppSelector(selectTradeHistorySymbol);

  const listRef = useListRef(null);

  const [size] = useState(getScrollbarSize);
  const [datas, setDatas] = useState<TradeHistoryValue[]>([]);

  const preSymbol = usePrevious(symbol);
  const preTradeHistory = usePrevious(tradeHistory);

  useEffect(() => {
    if (tradeHistory && !_.isEqual(tradeHistory, preTradeHistory)) {
      setDatas(tradeHistory);
    }
  }, [tradeHistory, preTradeHistory]);

  useEffect(() => {
    if (
      typeof symbol === "string" &&
      symbol &&
      !symbol.includes("undefined") &&
      !_.isEqual(symbol, preSymbol)
    ) {
      dispatch(
        fetchTradeHistoryRequest({
          symbol: symbol,
          params: { limit: 50, offset: 0 },
        }),
      );
    }
  }, [symbol, preSymbol]);

  const handleScroll = useCallback(() => {
    if (
      !listRef ||
      !listRef.current ||
      !listRef.current.element ||
      !tradeHistory ||
      loading
    )
      return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current.element;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      if (currentSymbol === symbol && tradeHistory.length > 0) {
        dispatch(
          fetchTradeHistoryRequest({
            symbol,
            params: {
              limit: 50,
              offset: tradeHistory.length,
            },
          }),
        );
      }
    }
  }, [dispatch, symbol, currentSymbol, tradeHistory?.length, loading]);

  function RowComponent({
    index,
    datas,
    style,
  }: RowComponentProps<{
    datas: TradeHistoryValue[];
  }>) {
    const data = datas[index];

    if (tradeHistory && index === tradeHistory.length) {
      return (
        <div
          style={style}
          className="flex items-center justify-center text-xs text-text-subtitle py-2"
        >
          {loading ? "Đang tải thêm..." : "Đã tải hết"}
        </div>
      );
    }

    return (
      <div
        style={style}
        role="row"
        aria-rowindex={index + 2}
        className="flex flex-row border-b border-border/30 px-2"
      >
        <div
          role="cell"
          className="text-[10px] text-text-base text-center min-w-[50.5px] flex-1 py-1"
        >
          {data.transactTime}
        </div>
        <div
          role="cell"
          className={`text-[10px] text-center min-w-[55px] flex-1 py-1 ${data.priceChangeStatus || ""
            }`}
        >
          {formatPrice(data.price)}
        </div>
        <div
          role="cell"
          className="text-[10px] text-text-base text-center min-w-[55px] flex-1 py-1"
        >
          {formatVolPrice(data.volume || 0)}
        </div>
        <div
          role="cell"
          className={`text-[10px] text-center min-w-[45px] flex-1 py-1 ${data.priceChangeStatus || ""
            }`}
        >
          {data.priceChangeAmount != null
            ? data.priceChangeAmount > 0
              ? `+${data.priceChangeAmount}`
              : data.priceChangeAmount
            : "-"}
        </div>
        <div
          role="cell"
          className={`text-[10px] text-center min-w-[50px] flex-1 py-1 ${data.priceChangeStatus || ""
            }`}
        >
          {data.priceChangePct != null
            ? `${numberFormat(data.priceChangePct, 2)}%`
            : "-"}
        </div>
        <div
          role="cell"
          className="text-[10px] text-text-base text-center min-w-[45px] flex-1 py-1"
        >
          -
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full">
        <div className="flex flex-row w-full">
          <div
            role="row"
            className="flex flex-row bg-surface/50 border-b border-border p-2 text-xs text-text-base font-medium w-full"
          >
            <div
              role="columnheader"
              className="text-center min-w-[50.5px] flex-1"
            >
              Thời gian
            </div>
            <div
              role="columnheader"
              className="text-center min-w-[55px] flex-1"
            >
              Giá
            </div>
            <div
              role="columnheader"
              className="text-center min-w-[55px] flex-1"
            >
              KL
            </div>
            <div
              role="columnheader"
              className="text-center min-w-[45px] flex-1"
            >
              +/-
            </div>
            <div
              role="columnheader"
              className="text-center min-w-[50px] flex-1"
            >
              +/-(%)
            </div>
            <div
              role="columnheader"
              className="text-center min-w-[45px] flex-1"
            >
              M/B
            </div>
          </div>
          <div className="shrink" style={{ minWidth: size, width: size }} />
        </div>

        <div className="overflow-hidden flex-1">
          <List
            listRef={listRef}
            tagName="div"
            rowComponent={RowComponent}
            rowCount={datas.length || 0}
            rowHeight={25}
            rowProps={{ datas }}
            onScroll={handleScroll}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(OrderHisDetail);
