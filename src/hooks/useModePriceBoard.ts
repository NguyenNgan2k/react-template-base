import { ModePriceBoardContext } from "@/utils";
import { useContext } from "react";

export const useModePriceBoard = () => {
  const ctx = useContext(ModePriceBoardContext);
  if (!ctx) {
    throw new Error(
      "useModePriceBoard must be used within ModePriceBoardProvider",
    );
  }
  return ctx;
};
