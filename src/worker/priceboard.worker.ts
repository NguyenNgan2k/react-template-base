import { KEYS_COLOR } from "../configs";
import type {
  ColorKey,
  FlashResult,
  PriceCompare,
  SnapshotDataCompact,
  WorkerInputMessage,
} from "../types";
import { getColumnValueCompact } from "../utils/priceboard";

const BATCH_LIMIT = 800; // Giới hạn xử lý mỗi frame
const MAX_MS_PER_FRAME = 14;

// Lưu latest snapshot
const pendingLatest = new Map<string, SnapshotDataCompact>();
const prevSnapshots = new Map<string, SnapshotDataCompact>();

// Queue các symbol cần xử lý (FIFO)
let symbolQueue: string[] = [];

let visibleSymbols = new Set<string>();
let isTabActive = true;
let isProcessing = false;

const parseVolume = (v: string | null | undefined): number => {
  if (!v) return 0;
  const n = parseInt(v.replace(/,/g, ""), 10);
  return isNaN(n) ? 0 : n;
};

const processBatch = () => {
  const start = performance.now();
  let processedCount = 0;
  const flashResults: FlashResult[] = [];

  while (
    processedCount < BATCH_LIMIT &&
    performance.now() - start < MAX_MS_PER_FRAME &&
    symbolQueue.length > 0
  ) {
    const symbol = symbolQueue.shift()!;
    const snapshot = pendingLatest.get(symbol)!;
    pendingLatest.delete(symbol);

    const prev = prevSnapshots.get(symbol);

    if (visibleSymbols.has(symbol) && prev) {
      for (const key of KEYS_COLOR) {
        const newVal = getColumnValueCompact(snapshot, key);
        const oldVal = getColumnValueCompact(prev, key);

        if (newVal === oldVal) continue;

        let flashClass: PriceCompare | "u" | "d" | "t" | null = null;

        // XỬ LÝ priceBuy1,2,3 và priceSell1,2,3
        if (key.startsWith("priceBuy") || key.startsWith("priceSell")) {
          const isBuy = key.startsWith("priceBuy");
          const levelStr = key.slice(-1);
          const level = Number(levelStr);

          if (level >= 1 && level <= 3 && !isNaN(level)) {
            const obKey = isBuy ? "22" : "23";
            const obData = snapshot.orderBook?.[obKey];

            if (typeof obData === "string") {
              const parts = obData.split("|");
              const flashIndex = (level - 1) * 3 + 2;
              if (flashIndex < parts.length) {
                flashClass = parts[flashIndex] as
                  | PriceCompare
                  | "u"
                  | "d"
                  | "r"
                  | null;
              }
            }
          }
        } else if (key.includes("volume")) {
          const n = parseVolume(newVal);
          const o = parseVolume(oldVal);

          if (oldVal == null && newVal != null) {
            flashClass = "u";
          } else if (oldVal != null && newVal == null) {
            flashClass = "d";
          } else if (n > o) {
            flashClass = "u";
          } else if (n < o) {
            flashClass = "d";
          }
        } else if (key === "totalVol") {
          flashClass = "g";
        } else if (key === "foreignBuy") {
          flashClass = "g";
        } else if (key === "foreignSell") {
          flashClass = "g";
        } else if (key === "foreignRoom") {
          flashClass = "g";
        } else if (key === "high") {
          flashClass =
            (snapshot.orderBook?.[24]?.split("|")[1] as PriceCompare) ?? null;
        } else if (key === "low") {
          flashClass =
            (snapshot.orderBook?.[25]?.split("|")[1] as PriceCompare) ?? null;
        } else if (key === "avg") {
          flashClass =
            (snapshot.orderBook?.[28]?.split("|")[1] as PriceCompare) ?? null;
        } else if (key.includes("lastPrice")) {
          const tradeFlash = snapshot.trade?.[13] ?? prev.trade?.[13] ?? null;
          if (tradeFlash && isTabActive) {
            const flashClass = tradeFlash;

            // Danh sách các key cần flash cùng flashClass
            const keysToFlash: ColorKey[] = [
              "lastVolume",
              "change",
              "changePc",
              "lastPrice",
            ];

            for (const k of keysToFlash) {
              if (KEYS_COLOR.includes(k)) {
                flashResults.push({ symbol, key: k, flashClass });
              }
            }

            continue;
          }
        } else if (key.includes("lastVolume")) {
          const tradeFlash = snapshot.trade?.[13] ?? prev.trade?.[13] ?? null;
          if (tradeFlash) {
            flashClass = tradeFlash;
          }
        }

        if (flashClass && isTabActive) {
          flashResults.push({ symbol, key, flashClass });
        }
      }
    }

    prevSnapshots.set(symbol, snapshot);
    processedCount++;
  }

  if (flashResults.length > 0) {
    self.postMessage({
      type: "update",
      data: { flashes: flashResults, colors: {} },
    });
  }

  if (symbolQueue.length > 0) {
    requestAnimationFrame(processBatch);
  } else {
    isProcessing = false;
  }
};
const scheduleProcessing = () => {
  if (!isProcessing && symbolQueue.length > 0) {
    isProcessing = true;
    requestAnimationFrame(processBatch);
  }
};

// ==================== NHẬN TIN NHẮN ====================
self.onmessage = (e: MessageEvent<WorkerInputMessage>) => {
  const { type, data } = e.data;

  switch (type) {
    case "batch":
      for (const snap of data) {
        const symbol = snap.symbol;
        pendingLatest.set(symbol, snap);

        // Chỉ thêm vào queue nếu tab đang active và symbol đang visible
        if (
          isTabActive &&
          visibleSymbols.has(symbol) &&
          !symbolQueue.includes(symbol)
        ) {
          symbolQueue.push(symbol);
        }
      }

      scheduleProcessing();
      break;

    case "visible": {
      const oldVisible = visibleSymbols;
      visibleSymbols = new Set(data);

      for (const sym of oldVisible) {
        if (!visibleSymbols.has(sym)) {
          prevSnapshots.delete(sym);
          pendingLatest.delete(sym);
          const idx = symbolQueue.indexOf(sym);
          if (idx !== -1) symbolQueue.splice(idx, 1);
        }
      }

      scheduleProcessing();
      break;
    }

    case "clear":
      data.forEach((sym) => {
        prevSnapshots.delete(sym);
        pendingLatest.delete(sym);
        const idx = symbolQueue.indexOf(sym);
        if (idx !== -1) symbolQueue.splice(idx, 1);
      });
      break;

    case "clearAll":
      pendingLatest.clear();
      prevSnapshots.clear();
      symbolQueue = [];
      isProcessing = false;
      self.postMessage({ type: "clearedAll" });
      break;

    case "clearQueue":
      pendingLatest.clear();
      symbolQueue = [];
      isProcessing = false;
      break;

    case "active": {
      const wasActive = isTabActive;

      isTabActive = data;

      if (data && !wasActive) {
        // Reset toàn bộ baseline
        prevSnapshots.clear();

        // Clear pending & queue
        pendingLatest.clear();
        symbolQueue = [];
        isProcessing = false;
      }

      break;
    }
  }
};
