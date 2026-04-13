import Tab from "@/components/common/Tabs";
import { useState } from "react";
import OrderPutThroughForm from "./OrderPutthroughtForm";

const TabsOrderPutthrough = [
  { value: 'create', label: 'Tạo mới' },
  { value: 'confirm', label: 'Xác nhận/ Hủy' },
  { value: 'adv', label: 'Quảng cáo' },
] as const

type TabValue = typeof TabsOrderPutthrough[number]['value']

const OrderPutThrough = () => {
  const [tabActive, setTabActive] = useState<TabValue>('create')

  const handleChangeTab = (type: TabValue) => {
    setTabActive(type);
  }

  return (
    <div className="bg-bg-elevated h-64">
      <div className="px-2 bg-bg-surface border-b border-bd-default">
        <Tab
          tabs={TabsOrderPutthrough}
          tabActive={tabActive}
          handleChangeTab={handleChangeTab}
        />
      </div>
      {
        tabActive === 'create' && <OrderPutThroughForm />
      }
    </div>
  )
};
export default OrderPutThrough;