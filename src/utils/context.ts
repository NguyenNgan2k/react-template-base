import { createContext } from "react";

export type ModePriceBoard = "BASE" | "DERIVATIVE";

export interface ModePriceBoardContextType {
  mode: ModePriceBoard;
  setMode: (value: ModePriceBoard) => void;
}

export const ModePriceBoardContext =
  createContext<ModePriceBoardContextType | null>(null);
