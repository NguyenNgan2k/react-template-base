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
import { memo, useEffect, useRef, useState } from "react";
import { List, type ListRowProps } from "react-virtualized";

import NoData from "@/components/common/NoData.tsx";
import { HEADER_HEIGHT, ROW_HEIGHT } from "@/configs/headerPriceBoard.ts";
import { selectSnapshotsBySymbols } from "@/features/stock/redux/stockSelector.ts";
import { usePerfectScrollbar } from "@/hooks/usePerfectScrollbar.ts.ts";
import { useToast } from "@/hooks/useToast.ts";
import { socketClient } from "@/networks/socket";
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
import type { Favorite } from "@/types/priceBoard.ts";
import type { SnapshotDataCompact } from "@/types/socketCient.ts";
import { getFavoritePriceboard } from "@/utils/priceboard.ts";
import BodyTableFavorite from "./BodyTable.tsx";
import HeaderColumnsFavorite from "./HeaderTable.tsx";

// =====SORTABLE ROW======
interface SortableRowProps {
  symbol: string;
  snapshot: SnapshotDataCompact;
  index: number;
  boardId: string;
  highlight: boolean;
  handleRemoveSymbol: (symbol: string) => void;
}

function SortableRow({
  symbol,
  snapshot,
  index,
  boardId,
  highlight,
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

  // Lấy list mã pinned
  useEffect(() => {
    const favorites: Favorite[] = getFavoritePriceboard();
    const favorite = favorites.find((f) => f.id === boardId);

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

  // === SCROLL SYMBOL ===
  useEffect(() => {
    if (!scrollTarget) return;

    const allSymbols = [...symbols];
    const fullSymbol = allSymbols.find((s) => s.startsWith(scrollTarget));
    if (!fullSymbol) {
      dispatch(setScrollToSymbol(null));
      return;
    }

    let targetIndex = -1;

    const normalIndex = symbols.indexOf(fullSymbol);
    if (normalIndex !== -1) {
      targetIndex = normalIndex;
    }

    if (targetIndex !== -1) {
      listRef.current?.scrollToRow(targetIndex);
      setHighlightSymbol(fullSymbol);
      setTimeout(() => setHighlightSymbol(null), 800);
    }

    dispatch(setScrollToSymbol(null));
  }, [scrollTarget, symbols, dispatch]);

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

    const displaySymbols = [...symbols];

    const oldIndex = displaySymbols.indexOf(active.id as string);
    const newIndex = displaySymbols.indexOf(over.id as string);

    const newOrder = arrayMove(displaySymbols, oldIndex, newIndex);

    const newNormal: string[] = [];

    newOrder.forEach((sym) => {
      newNormal.push(sym);
    });

    // Lưu localStorage
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites: Favorite[] = JSON.parse(stored);
      const favorite = favorites.find((f) => f.id === boardId);
      if (favorite) {
        favorite.symbols = newNormal;
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    }

    setSymbols(newNormal);
  };

  const handleRemoveSymbol = (symbolToRemove: string) => {
    const stored = getFavoritePriceboard();
    if (!stored || !boardId || boardId !== "fav_default") return;

    const favorites: Favorite[] = stored;
    const favorite = favorites.find((f) => f.id === boardId);
    if (!favorite) return;

    favorite.symbols = favorite.symbols.filter((s) => s !== symbolToRemove);

    // Lưu lại
    localStorage.setItem("favorites", JSON.stringify(favorites));

    const updatedSymbols = [...favorite.symbols];
    dispatch(setListStockByIdFromCache(boardId, updatedSymbols));

    socketClient.unsubscribe({ symbols: [symbolToRemove] });

    toast(`${symbolToRemove.split(":")[0]} đã xóa khỏi danh mục`, `success`);
  };

  // === ROW RENDERER ===
  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    // Tính symbol theo index tổng
    const symbol = symbols[index];

    if (!symbol) return null;

    const snapshot = snapshots[symbol] ?? { symbol };

    return (
      <div key={key} style={style}>
        <SortableRow
          symbol={symbol}
          snapshot={snapshot}
          index={index}
          boardId={boardId}
          highlight={highlightSymbol === symbol}
          handleRemoveSymbol={handleRemoveSymbol}
        />
      </div>
    );
  };

  return (
    <div className="overflow-hidden relative flex-1" ref={containerRef}>
      <div className="min-w-7xl flex flex-col w-full h-full">
        <div style={{ height: HEADER_HEIGHT }}>
          <HeaderColumnsFavorite />
        </div>
        <div className="w-full h-full">
          {!baseSymbols || baseSymbols.length === 0 ? (
            <div className="w-full h-full grid place-items-center">
              <NoData message="Không có mã nào trong danh mục!" />
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={[...symbols]}
                strategy={verticalListSortingStrategy}
              >
                <List
                  ref={listRef}
                  height={listHeight}
                  rowCount={symbols.length} // TỔNG SỐ DÒNG
                  rowHeight={ROW_HEIGHT}
                  rowRenderer={rowRenderer} // DÙNG CHUNG 1 HÀM
                  width={Math.max(containerWidth, 1280)}
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
