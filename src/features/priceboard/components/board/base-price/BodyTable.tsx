import { ALL_COLUMNS_FAVORITE } from "@/configs/headerPriceBoard";
import type { SnapshotDataCompact, TableColumn } from "@/types";
import { unregisterVisibleCell } from "@/utils";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { memo, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import PriceCell from "./PriceCell";

interface BodyTableProps {
  symbol: string;
  snapshot: SnapshotDataCompact;
  dragListeners?: DraggableSyntheticListeners;
  dragAttributes?: DraggableAttributes;
  active?: string; // id của danh mục
  pinned?: boolean;
  handleRemoveSymbol: (symbol: string) => void;
}

function BodyTableFavorite({
  symbol,
  snapshot,
  handleRemoveSymbol,
}: BodyTableProps) {
  const columns: TableColumn[] = (() => {
    const saved = localStorage.getItem("clientConfig");
    try {
      return saved ? JSON.parse(saved) : ALL_COLUMNS_FAVORITE;
    } catch {
      return ALL_COLUMNS_FAVORITE;
    }
  })();

  useEffect(() => {
    return () => {
      unregisterVisibleCell(symbol);
    };
  }, [symbol]);

  return (
    <div className="flex border-x border-b border-border divide-x divide-border w-full">
      {columns.map((col) => {
        const hasChildren = !!col.children?.length;
        if (col.key === "symbol") {
          return (
            <div
              key={col.key}
              className="h-7 grid place-items-center"
              style={{ width: col.width }}
            >
              <div className="relative w-full flex items-center justify-center h-7 group">
                <PriceCell
                  symbol={symbol}
                  cellKey={col.key}
                  snapshot={snapshot}
                  disableFlash={true}
                />
                <IoClose
                  className="absolute top-1.5 right-0 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handleRemoveSymbol(symbol)}
                />
              </div>
            </div>
          );
        }

        return (
          <div
            key={col.key}
            className="flex flex-col w-full"
            style={{ width: col.width }} // parent width
          >
            {!hasChildren ? (
              <PriceCell
                symbol={symbol}
                cellKey={col.key}
                width={"100%"}
                snapshot={snapshot}
              />
            ) : (
              <div className="flex divide-x divide-border text-xs font-medium">
                {col.children?.map((child) => (
                  <PriceCell
                    key={child.key}
                    cellKey={child.key}
                    symbol={symbol}
                    snapshot={snapshot}
                    width={`${100 / (col.children?.length || 1)}%`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(BodyTableFavorite);
