import Tab from "@/components/common/Tabs";
import { useState } from "react";
import OrderPutThroughForm from "./OrderPutthroughForm";
import ConfirmPutThroughForm from "./ConfirmPutthroughForm";
import OrderAdvertisementForm from "./OrderAdvertisementForm";

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
      <div className="h-[calc(100%-40px)] p-2">
        {
          tabActive === 'create' && <OrderPutThroughForm />
        }
        {
          tabActive === 'confirm' && <ConfirmPutThroughForm />
        }
        {
          tabActive === 'adv' && <OrderAdvertisementForm />
        }
      </div>
    </div>
  )
};
export default OrderPutThrough;