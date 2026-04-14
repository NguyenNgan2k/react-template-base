import { lazy, useState } from "react";

const Board = lazy(() => import("./components/board"));
const MenuDashboard = lazy(() => import("./components/menu-board"));

export default function PriceBoard() {
  const [active, setActive] = useState<string>("fav_default");

  const handleTabChange = (newTab: string) => {
    setActive(newTab);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex flex-col gap-3 flex-1 mt-2">
        <MenuDashboard active={active} onChange={handleTabChange} />

        {/* Bảng giá */}
        <Board id={active} />
      </div>
    </div>
  );
}
