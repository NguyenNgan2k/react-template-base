import ModalLayout from "@/components/layout/ModalLayout";
import AccountDetailSearch from "./AccoutDetailSearch";
import Tabs from "@/components/common/Tabs";
import { useEffect, useState } from "react";
import type { Option } from "@/types";
import Trading from "./tabs/tradding/Trading";
import ProfitLoss from "./tabs/profit-loss/ProfitLoss";
import Portfolio from "./tabs/portfolio/Portfolio";
import {
  fetchAccountInfoRequest,
  fetchCustomerInfoRequest,
  selectAccountSelected,
} from "../../redux/accountSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import AccountStatus from "./tabs/account-status/AccountStatus";
import AccountInfo from "./tabs/account-info/AccountInfo";
import Risk from "./tabs/risk/Risk";
import Right from "./tabs/right/RightsIssue";

const accountDetailTabs: Option[] = [
  {
    value: "trading",
    label: "Giao dịch",
  },
  {
    value: "portfolio",
    label: "Trạng thái danh mục",
  },
  {
    value: "account-status",
    label: "Trạng thái tài khoản",
  },
  {
    value: "account-info",
    label: "Thông tin tài khoản",
  },
  {
    value: "risk-info",
    label: "Rủi ro",
  },
  {
    value: "right-info",
    label: "Thông tin quyền",
  },
  {
    value: "profit-loss",
    label: "Lãi lỗ thực hiện",
  },
] as const

type TabValue = typeof accountDetailTabs[number]['value']

const AccountDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const [tabActive, setTabActive] = useState<TabValue>('trading')

  useEffect(() => {
    if (!accountSelected) return;
    dispatch(fetchAccountInfoRequest({ account: accountSelected }));
    dispatch(fetchCustomerInfoRequest({ account: accountSelected }));
  }, [accountSelected, dispatch])

  return (
    <ModalLayout
      title='Thông tin trạng thái tài khoản'
      classContent="min-h-[800px] w-[1440px]"
      onClose={() => { }}
    >
      <div>
        <AccountDetailSearch />
        <Tabs
          tabs={accountDetailTabs}
          tabActive={tabActive}
          handleChangeTab={(tab) => setTabActive(tab)}
        />
        <div className="mt-2">
          {
            tabActive === 'trading' && <Trading />
          }
          {tabActive === 'portfolio' && <Portfolio />}
          {tabActive === 'account-status' && <AccountStatus />}
          {tabActive === 'account-info' && <AccountInfo />}
          {tabActive === 'risk-info' && <Risk />}
          {tabActive === 'profit-loss' && <ProfitLoss />}
          {tabActive === 'right-info' && <Right />}
        </div>
      </div>
    </ModalLayout >
  )
}
export default AccountDetailModal;