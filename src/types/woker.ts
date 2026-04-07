import type { KEYS_COLOR } from "@/configs";
import type { SnapshotDataCompact } from "./socketCient";

export type PriceCompare = "u" | "d" | "c" | "f" | "r" | "x" | "g";

export interface FlashResult {
  symbol: string;
  key: string;
  flashClass: PriceCompare;
}
// === INPUT: main -> worker ===
export type WorkerInputMessage =
  | { type: "batch"; data: SnapshotDataCompact[] }
  | { type: "visible"; data: string[] }
  | { type: "clear"; data: string[] }
  | { type: "clearAll"; data?: never }
  | { type: "clearQueue"; data?: never }
  | { type: "active"; data: boolean };

// === OUTPUT: worker -> main ===
export type WorkerOutputMessage =
  | {
      type: "update";
      data: {
        flashes: FlashResult[];
        colors: Record<string, Record<string, PriceCompare | "t">>;
      };
    }
  | {
      type: "clearedAll";
    };

export type OrderBookValue = string | string[] | undefined;

export type ColorKey = (typeof KEYS_COLOR)[number];
