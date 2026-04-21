import TabNav from "@/components/common/TabNav";
import { sideBarStockListItems } from "@/configs/sidebar";
import { Outlet } from "react-router-dom";

const StockListLayout = () => {
  return (
    <div>
      <TabNav
        items={sideBarStockListItems}
      />
      <div className="h-[calc(100vh-370px)]">
        <Outlet />
      </div>
    </div>
  )
};
export default StockListLayout;