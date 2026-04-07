import { ModePriceBoardContext, type ModePriceBoard } from "@/utils";
import React, { useState } from "react";

export function ModePriceBoardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modePriceBoard, setModePriceBoardState] = useState<ModePriceBoard>(
    () => {
      return (
        (localStorage.getItem("modePriceBoard") as ModePriceBoard) || "BASE"
      );
    },
  );

  const setModePriceBoard = (value: ModePriceBoard) => {
    setModePriceBoardState(value);
    localStorage.setItem("modePriceBoard", value);
  };

  return (
    <ModePriceBoardContext.Provider
      value={{ mode: modePriceBoard, setMode: setModePriceBoard }}
    >
      {children}
    </ModePriceBoardContext.Provider>
  );
}
