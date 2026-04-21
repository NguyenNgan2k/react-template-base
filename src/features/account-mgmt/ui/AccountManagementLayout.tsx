import TabNav from "@/components/common/TabNav";
import { sideBarAccountManagementItems } from "@/configs/sidebar";
import { Outlet } from "react-router-dom";

const AccountManagementLayout = () => {
  return (
    <div>
      <TabNav
        items={sideBarAccountManagementItems}
      />
      <div className="h-[calc(100vh-112px)]">
        <Outlet />
      </div>
    </div>
  )
};
export default AccountManagementLayout;