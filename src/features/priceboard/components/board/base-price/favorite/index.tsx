import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { List, type ListRowProps } from "react-virtualized";
import type { RenderedRows } from "react-virtualized/dist/es/List";

import { HEADER_HEIGHT, ROW_HEIGHT } from "@/configs/headerPriceBoard.ts";
import { usePerfectScrollbar } from "@/hooks/usePerfectScrollbar.ts.ts";
import { useToast } from "@/hooks/useToast.ts";
import { socketClient } from "@/services/socket/index.ts";
import { useAppDispatch, useAppSelector } from "@/store/hook.ts";
import {
  selectFavorites,
  selectScrollToSymbol,
  selectSymbolsByBoardId,
} from "@/store/slices/priceboard/selector.ts";
import {
  setListStockByIdFromCache,
  setScrollToSymbol,
} from "@/store/slices/priceboard/slice.ts";
import { selectSnapshotsBySymbols } from "@/store/slices/stock/selector.ts";
import type { Favorite } from "@/types/priceBoard.ts";
import type { SnapshotDataCompact } from "@/types/socketCient.ts";
import BodyTableFavorite from "./BodyTable.tsx";
import HeaderColumnsFavorite from "./HeaderTable.tsx";

// =====SORTABLE ROW======
interface SortableRowProps {
  symbol: string;
  snapshot: SnapshotDataCompact;
  index: number;
  boardId: string;
  pinned?: boolean;
  highlight: boolean;
  handlePinSymbol: (symbol: string) => void;
  handleRemoveSymbol: (symbol: string) => void;
}

function SortableRow({
  symbol,
  snapshot,
  index,
  boardId,
  pinned,
  highlight,
  handlePinSymbol,
  handleRemoveSymbol,
}: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging, isOver } =
    useSortable({ id: symbol });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : "all 0.2s ease",
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 999 : 1,
    position: "relative",
    boxShadow: isDragging
      ? "0 12px 24px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08)"
      : "none",
    transformOrigin: "center",
    scale: isDragging ? "0.98" : "1",
  };

  const flashStyle = highlight ? "animate-[flash-highlight_0.7s_ease]" : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${
        index % 2 === 1 ? "bg-gray-300/30" : ""
      } hover:bg-gray-300 ${flashStyle}`}
    >
      {isOver && !isDragging && (
        <div
          className="absolute inset-x-0 -top-px h-0.5 bg-linear-to-r from-DTND-500 to-DTND-400 animate-pulse"
          style={{ zIndex: 100 }}
        />
      )}
      <BodyTableFavorite
        symbol={symbol}
        snapshot={snapshot}
        dragListeners={listeners}
        dragAttributes={attributes}
        active={boardId}
        pinned={pinned}
        handlePinSymbol={handlePinSymbol}
        handleRemoveSymbol={handleRemoveSymbol}
      />
    </div>
  );
}

// ======= MAIN COMPONENT ==========

function PriceBoardFavorite({ boardId }: { boardId: string }) {
  const dispatch = useAppDispatch();

  const toast = useToast();

  const listRef = useRef<List>(null);

  const { containerRef } = usePerfectScrollbar();
  const [containerWidth, setContainerWidth] = useState(1200);
  const [listHeight, setListHeight] = useState(500);
  const [highlightSymbol, setHighlightSymbol] = useState<string | null>(null);

  // Redux
  const baseSymbols = useAppSelector((state) =>
    selectSymbolsByBoardId(state, boardId),
  );
  const snapshots = useAppSelector((state) =>
    selectSnapshotsBySymbols(state, baseSymbols),
  );
  const listFavorites = useAppSelector(selectFavorites);
  const scrollTarget = useAppSelector(selectScrollToSymbol);

  const [symbols, setSymbols] = useState<string[]>([]);
  const [pinned, setPinned] = useState<string[]>([]);

  // Lấy list mã pinned
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (!stored) return;

    const favorites: Favorite[] = JSON.parse(stored);
    const favorite = favorites.find((f) => f.id === boardId);

    setPinned(favorite?.pinned ?? []);
    setSymbols(favorite?.symbols ?? []);
  }, [boardId, baseSymbols, listFavorites]);

  // === RESIZE ===
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setContainerWidth(rect.width);
      setListHeight(rect.height - HEADER_HEIGHT);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);

  // === VISIBLE SYMBOLS ===
  const updateVisibleSymbols = useCallback(
    ({ startIndex, stopIndex }: RenderedRows) => {
      const visible = new Set<string>(pinned); // pinned luôn visible

      for (let i = startIndex; i <= stopIndex; i++) {
        const symbol =
          i < pinned.length ? pinned[i] : symbols[i - pinned.length];
        if (symbol) visible.add(symbol);
      }

      socketClient.setVisibleSymbols(Array.from(visible));
    },
    [pinned, symbols],
  );

  // === SCROLL SYMBOL ===
  useEffect(() => {
    if (!scrollTarget) return;

    const allSymbols = [...pinned, ...symbols];
    const fullSymbol = allSymbols.find((s) => s.startsWith(scrollTarget));
    if (!fullSymbol) {
      dispatch(setScrollToSymbol(null));
      return;
    }

    let targetIndex = -1;
    if (pinned.includes(fullSymbol)) {
      targetIndex = pinned.indexOf(fullSymbol);
    } else {
      const normalIndex = symbols.indexOf(fullSymbol);
      if (normalIndex !== -1) {
        targetIndex = pinned.length + normalIndex;
      }
    }

    if (targetIndex !== -1) {
      listRef.current?.scrollToRow(targetIndex);
      setHighlightSymbol(fullSymbol);
      setTimeout(() => setHighlightSymbol(null), 800);
    }

    dispatch(setScrollToSymbol(null));
  }, [scrollTarget, pinned, symbols, dispatch]);

  // === DnD SENSORS ===
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // === DRAG END ===
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const displaySymbols = [...pinned, ...symbols];

    const oldIndex = displaySymbols.indexOf(active.id as string);
    const newIndex = displaySymbols.indexOf(over.id as string);

    const newOrder = arrayMove(displaySymbols, oldIndex, newIndex);

    // Tách lại pinned và normal
    const newPinned: string[] = [];
    const newNormal: string[] = [];

    newOrder.forEach((sym) => {
      if (pinned.includes(sym)) {
        newPinned.push(sym);
      } else {
        newNormal.push(sym);
      }
    });

    // Lưu localStorage
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites: Favorite[] = JSON.parse(stored);
      const favorite = favorites.find((f) => f.id === boardId);
      if (favorite) {
        favorite.pinned = newPinned;
        favorite.symbols = newNormal;
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    }

    setPinned(newPinned);
    setSymbols(newNormal);
  };

  const handlePinSymbol = (symbolToPin: string) => {
    const stored = localStorage.getItem("favorites");
    if (!stored || !boardId) return;

    const favorites: Favorite[] = JSON.parse(stored);
    const favorite = favorites.find((f) => f.id === boardId);
    if (!favorite) return;

    const isPinned = favorite.pinned.includes(symbolToPin);

    if (isPinned) {
      // Unpin: chuyển từ pinned -> normal
      favorite.pinned = favorite.pinned.filter((s) => s !== symbolToPin);
      favorite.symbols = [...favorite.symbols, symbolToPin];
    } else {
      // Pin: chuyển từ normal -> pinned
      favorite.pinned = [...favorite.pinned, symbolToPin];
      favorite.symbols = favorite.symbols.filter((s) => s !== symbolToPin);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Cập nhật state
    setPinned(favorite.pinned);
    setSymbols(favorite.symbols);
  };

  const handleRemoveSymbol = (symbolToRemove: string) => {
    const stored = localStorage.getItem("favorites");
    if (!stored || !boardId) return;

    const favorites: Favorite[] = JSON.parse(stored);
    const favorite = favorites.find((f) => f.id === boardId);
    if (!favorite) return;

    // XÓA KHỎI CẢ PINNED VÀ NORMAL
    favorite.pinned = favorite.pinned.filter((s) => s !== symbolToRemove);
    favorite.symbols = favorite.symbols.filter((s) => s !== symbolToRemove);

    // Lưu lại
    localStorage.setItem("favorites", JSON.stringify(favorites));

    const updatedSymbols = [...favorite.pinned, ...favorite.symbols];
    dispatch(setListStockByIdFromCache(boardId, updatedSymbols));

    socketClient.unsubscribe({ symbols: [symbolToRemove] });

    toast(`${symbolToRemove.split(":")[0]} đã xóa khỏi danh mục`, `success`);
  };

  // === ROW RENDERER ===
  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    // Tính symbol theo index tổng
    const symbol =
      index < pinned.length ? pinned[index] : symbols[index - pinned.length];

    if (!symbol) return null;

    const snapshot = snapshots[symbol] ?? { symbol };
    const isPinned = index < pinned.length; // đơn giản vậy thôi!

    return (
      <div key={key} style={style}>
        <SortableRow
          symbol={symbol}
          snapshot={snapshot}
          index={index}
          boardId={boardId}
          pinned={isPinned}
          highlight={highlightSymbol === symbol}
          handlePinSymbol={handlePinSymbol}
          handleRemoveSymbol={handleRemoveSymbol}
        />
      </div>
    );
  };

  return (
    <div
      className="h-[calc(var(--app-height)-289px)] overflow-hidden relative"
      ref={containerRef}
    >
      <div className="min-w-7xl flex flex-col w-full h-full">
        <div style={{ height: HEADER_HEIGHT }}>
          <HeaderColumnsFavorite />
        </div>
        <div className="w-full h-full">
          {!baseSymbols || baseSymbols.length === 0 ? (
            <div className="w-full h-full grid place-items-center">
              <div className="loader-bar"></div>
            </div>
          ) : (
            // <NoData message="Không có mã nào trong danh mục!" />
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={[...pinned, ...symbols]}
                strategy={verticalListSortingStrategy}
              >
                <List
                  ref={listRef}
                  height={listHeight}
                  rowCount={pinned.length + symbols.length} // TỔNG SỐ DÒNG
                  rowHeight={ROW_HEIGHT}
                  rowRenderer={rowRenderer} // DÙNG CHUNG 1 HÀM
                  width={Math.max(containerWidth, 1280)}
                  onRowsRendered={updateVisibleSymbols}
                  className="hide-scrollbar"
                />
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(PriceBoardFavorite);
