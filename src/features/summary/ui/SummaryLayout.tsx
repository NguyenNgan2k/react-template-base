import TabNav from "@/components/common/TabNav";
import { sideBarsummaryItems } from "@/configs/sidebar";
import { Outlet } from "react-router-dom";

const summaryLayout = () => {
  return (
    <div>
      <TabNav
        items={sideBarsummaryItems}
      />
      <div className="h-[calc(100vh-370px)]">
        <Outlet />
      </div>
    </div>
  )
};
export default summaryLayout;