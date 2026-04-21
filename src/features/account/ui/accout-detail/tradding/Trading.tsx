import Tab from "@/components/common/Tabs";
import { useState } from "react";
import type { Option } from "@/types";
import OrderBook from "./OrderBook";
import MatchedByStepPrice from "./MatchedByStepPrice";
import MatchedByStock from "./MatchedByStock";

const TradingTabs: Option[] = [
  {
    value: "order-book",
    label: "Sổ lệnh",
  },
  {
    value: "matched-by-step-price",
    label: "Khớp theo bước giá",
  },
  {
    value: "matched-by-stock",
    label: "Khớp theo chứng khoán",
  },
] as const

type TabValue = typeof TradingTabs[number]['value']

const Trading: React.FC = () => {
  const [tabActive, setTabActive] = useState<TabValue>('order-book')
  return (
    <div className="border-t border-bd-default">
      <Tab
        tabs={TradingTabs}
        tabActive={tabActive}
        handleChangeTab={(tab) => setTabActive(tab)}
      />
      {
        tabActive === 'order-book' && <OrderBook />
      }
      {
        tabActive === 'matched-by-step-price' && <MatchedByStepPrice />
      }
      {
        tabActive === 'matched-by-stock' && <MatchedByStock />
      }
    </div>
  )
}
export default Trading;