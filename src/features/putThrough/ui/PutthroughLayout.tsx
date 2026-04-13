import TabNav from "@/components/common/TabNav";
import { sideBarPutThroughItems } from "@/configs/sidebar";
import { Outlet } from "react-router-dom";
import OrderPutthrough from "./order/OrderPutthrough";

const PutThroughPage = () => {
  return (
    <div>
      <TabNav
        items={sideBarPutThroughItems}
      />
      <div className="h-[calc(100vh-370px)]">
        <Outlet />
      </div>
      <OrderPutthrough />
    </div>
  )
};
export default PutThroughPage;