import { lazy, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import StockDetailModal from "./components/stock-detail";
import { selectDetailSymbol } from "../stock/redux/stockSelector";
import { setDetailSymbol } from "../stock/redux/stockSlice";

const Board = lazy(() => import("./components/board"));
const MenuDashboard = lazy(() => import("./components/menu-board"));
const SynAnalysisPriceBoard = lazy(
  () => import("./components/synthetic-analysis"),
);

export default function PriceBoard() {
  const dispatch = useAppDispatch();

  const detailSymbol = useAppSelector(selectDetailSymbol);

  const [active, setActive] = useState<string>("vn30");

  const handleTabChange = (newTab: string) => {
    setActive(newTab);
  };

  const handleCloseModalDetailSym = () => {
    dispatch(setDetailSymbol(""));
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="w-full h-[148px] flex flex-col gap-3">
        <SynAnalysisPriceBoard />
      </div>
      <div className="flex flex-col gap-3">
        <MenuDashboard active={active} onChange={handleTabChange} />

        {/* Bảng giá */}
        <Board id={active} />
      </div>

      {/* Chi tiết mã chứng khoán */}
      {detailSymbol && (
        <StockDetailModal
          isOpen={detailSymbol ? true : false}
          onClose={() => handleCloseModalDetailSym()}
          symbol={detailSymbol || ""}
        />
      )}
    </div>
  );
}
