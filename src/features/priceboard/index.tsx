import { lazy, useState } from "react";
import SynAnalysisPriceBoard from "./components/synthetic-analysis";

const Board = lazy(() => import("./components/board"));
const MenuDashboard = lazy(() => import("./components/menu-board"));

export default function PriceBoard() {
  const [active, setActive] = useState<string>("fav_default");

  const handleTabChange = (newTab: string) => {
    setActive(newTab);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 mt-2">
      <div className="w-full h-[148px] flex flex-col gap-3">
        <SynAnalysisPriceBoard />
      </div>
      <div className="flex flex-col gap-3 flex-1 min-h-0">
        <MenuDashboard active={active} onChange={handleTabChange} />

        {/* Bảng giá */}
        <Board id={active} />
      </div>
    </div>
  );
}
