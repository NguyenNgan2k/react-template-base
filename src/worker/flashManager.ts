import type { FlashResult } from "../types";
import { visibleCells } from "../utils/visibleRegistry";

const flashGroups = new Map<string, Set<HTMLElement>>();
let rafId: number | null = null;
const FLASH_DURATION = 450; // ms

const applyFlashes = () => {
  for (const [type, cells] of flashGroups) {
    cells.forEach((cell) => {
      if (cell.isConnected) {
        cell.dataset.flash = type;
      }
    });

    setTimeout(() => {
      cells.forEach((cell) => {
        if (cell.isConnected && cell.dataset.flash === type) {
          delete cell.dataset.flash;
        }
      });
    }, FLASH_DURATION);
  }

  flashGroups.clear();
  rafId = null;
};

export const queueFlash = (results: FlashResult[]) => {
  if (!results.length) return;

  for (const r of results) {
    if (!r.flashClass || r.flashClass === "x") continue;

    const cell = visibleCells.get(r.symbol)?.get(r.key);
    if (!cell) continue;

    const type = r.flashClass;
    let set = flashGroups.get(type);
    if (!set) {
      set = new Set();
      flashGroups.set(type, set);
    }
    set.add(cell);
  }

  if (rafId === null) {
    rafId = requestAnimationFrame(applyFlashes);
  }
};
