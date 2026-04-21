import Descriptions from "@/components/desctiption/Descriptions-v2";
import { fetchAccountStatusRequest, fetchAccountLMVRequest, fetchAccountLMVEERequest, fetchAccountLMVUBRequest, fetchAccountDebtRequest, selectAccountSelected, selectAccountStatus } from "@/features/account/redux/accountSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { formatDate, numberFormat } from "@/utils";
import { useEffect, useState } from "react";
import PaymentValue from "../PaymentValueTable";
import type { Option } from "@/types";
import Tabs from "@/components/common/Tabs";
import AccountLMVTable from "./AccountLMVTable";
import AccountLMVEETable from "./AccountLMVEETable";
import AccountLMVUBTable from "./AccountLMVUBTable";
import AccountDebtTable from "./AcoountDebtTable";

const accountFinancialTabs: Option[] = [
  {
    value: "payment-value",
    label: "Giá trị thanh toán Mua/Bán CK",
  },
  {
    value: "lmv",
    label: "Chi tiết giá trị kỹ quỹ",
  },
  {
    value: "lmv-ee",
    label: "Chi tiết sức mua",
  },
  {
    value: "lmv-ub",
    label: "Tài sản ủy ban",
  },

] as const

type TabValue = typeof accountFinancialTabs[number]['value']

const AccountStatusMargin = () => {
  const dispatch = useAppDispatch();
  const accountSelected = useAppSelector(selectAccountSelected);
  const accountStatus = useAppSelector(selectAccountStatus);
  const [tabActive, setTabActive] = useState<TabValue>('payment-value')

  useEffect(() => {
    if (!accountSelected) return;
    dispatch(fetchAccountStatusRequest({ account: accountSelected }));
    dispatch(fetchAccountDebtRequest({ account: accountSelected }));
  }, [accountSelected, dispatch]);

  useEffect(() => {
    if (!accountSelected) return;
    switch (tabActive) {
      case "lmv":
        dispatch(fetchAccountLMVRequest({ account: accountSelected }));
        break;
      case "lmv-ee":
        dispatch(fetchAccountLMVEERequest({ account: accountSelected }));
        break;
      case "lmv-ub":
        dispatch(fetchAccountLMVUBRequest({ account: accountSelected }));
        break;
      default:
        dispatch(fetchAccountDebtRequest({ account: accountSelected }));
        break;
    }
  }, [tabActive, accountSelected, dispatch]);

  const generalInfoItems = [
    { label: "Mã nhóm", children: accountStatus?.group || "-" },
    { label: "Imkh", children: accountStatus?.imKH || "-" },
    { label: "Call Rate", children: Number(accountStatus?.call_lmv) },
    { label: "Datetime", children: formatDate(new Date()) },
    { label: "Phí max", children: `${Number(accountStatus?.max_rate)}%` },
    { label: "H", children: `${Number(accountStatus?.h) * 100}%` },
    { label: "Sell Rate", children: Number(accountStatus?.sell_lmv) },
    { label: "NAV", children: numberFormat(accountStatus?.total_equity, 0, "-") },
    { label: "Ba bên", children: accountStatus?.tdck || "-" },
    { label: "Rút EE", children: accountStatus?.overDraft === "1" ? "YES" : "NO" },
    { label: "Hạn mức bảo lãnh", children: numberFormat(accountStatus?.temp_ee, 0, "-") },
    { label: "Số tiền cần nộp", children: numberFormat(accountStatus?.payment, 0, "-") },
  ];

  const moneyItems = [
    { label: "Tổng tài sản", children: numberFormat(accountStatus?.assets, 0, "-") },
    { label: "Tiền bán chờ về", children: numberFormat(accountStatus?.sum_ap, 0, "-") },
    { label: "EE có thể rút", children: numberFormat(accountStatus?.withdrawal_ee, 0, "-") },
    {
      label: "Tỷ lệ tài khoản",
      children: (
        <span
          className={
            accountStatus?.action === "CALL_FORCE"
              ? "bg-primary-dbl text-white px-1 rounded"
              : accountStatus?.action === "CALL_MARGIN"
                ? "bg-primary text-white px-1 rounded"
                : ""
          }
        >
          {accountStatus?.margin_ratio || "-"}
        </span>
      ),
    },
    { label: "Tổng nợ", children: numberFormat(accountStatus?.debt, 0, "-") },
    { label: "AP T0", children: numberFormat(accountStatus?.ap_t0, 0, "-") },
    { label: "Mua đã khớp", children: numberFormat(accountStatus?.ar_t0, 0, "-") },
    { label: "Tỷ lệ uỷ ban", children: accountStatus?.margin_ratio_ub || "-" },
    {
      label: "Tài sản ròng",
      children: (
        <span className={Number(accountStatus?.equity || 0) < 0 ? "text-red-500" : "text-green-500"}>
          {numberFormat(accountStatus?.equity, 0, "-")}
        </span>
      ),
    },
    { label: "AP T1", children: numberFormat(accountStatus?.ap_t1, 0, "-") },
    { label: "Mua chờ khớp", children: numberFormat(accountStatus?.buy_unmatch, 0, "-") },
    { label: "TSR giảm về callmargin", children: numberFormat(accountStatus?.a1, 0, "-") },
    { label: "Tiền mặt", children: numberFormat(accountStatus?.cash_balance, 0, "-") },
    { label: "AP T2", children: numberFormat(accountStatus?.ap_t2, 0, "-") },
    { label: "Ký quỹ chờ khớp", children: numberFormat(accountStatus?.buy_mr, 0, "-") },
    { label: "Số tiền cần nộp call", children: numberFormat(accountStatus?.a2, 0, "-") },
    { label: "Cổ tức", children: numberFormat(accountStatus?.collateral, 0, "-") },
    { label: "Tiền đã ứng", children: numberFormat(accountStatus?.withdraw, 0, "-") },
    { label: "EE + Hạn mức bảo lãnh", children: numberFormat(accountStatus?.ee_inc_app, 0, "-") },
    { label: "TSR giảm về call forcesell", children: numberFormat(accountStatus?.a3, 0, "-") },
    { label: "CK cho vay", children: numberFormat(accountStatus?.lmv, 0, "-") },
    { label: "Có thể ứng", children: numberFormat(accountStatus?.cash_advance_avai, 0, "-") },
    { label: "Lãi tạm tính", children: numberFormat(accountStatus?.loan_fee, 0, "-") },
    { label: "Số tiền cần nộp force", children: numberFormat(accountStatus?.a4, 0, "-") },
    { label: "Ký quỹ", children: numberFormat(accountStatus?.mr, 0, "-") },
    { label: "Tiền mặt có thể rút", children: numberFormat(accountStatus?.withdrawal_cash, 0, "-") },
    { label: "Phí lưu ký", children: numberFormat(accountStatus?.deposit_fee, 0, "-") },
    { label: "GT CK cho vay cần bán", children: numberFormat(accountStatus?.a5, 0, "-") },
    { label: "Số tiền phong toả", children: numberFormat(accountStatus?.cash_block, 0, "-") },
  ];

  return (
    <div className="flex flex-col gap-1">
      <div className="shrink-0">
        <p className="text-sm font-bold">Thông tin chung</p>
        <Descriptions column={4} items={generalInfoItems} />
      </div>
      <div className="shrink-0">
        <p className="text-sm font-bold">Tiền</p>
        <Descriptions column={4} items={moneyItems} />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-3">
            <Tabs
              className="h-8!"
              tabs={accountFinancialTabs}
              tabActive={tabActive}
              handleChangeTab={(tab) => setTabActive(tab)}
            />
            {tabActive === "payment-value" && accountStatus && <PaymentValue accountStatus={accountStatus} />}
            {tabActive === "lmv" && <AccountLMVTable />}
            {tabActive === "lmv-ee" && <AccountLMVEETable />}
            {tabActive === "lmv-ub" && <AccountLMVUBTable />}
          </div>
          <div className="col-span-1">
            <p className="h-8! text-sm font-bold text-center">Chi tiết nợ</p>
            <AccountDebtTable />
          </div>
        </div>
      </div>
    </div >
  );
}
export default AccountStatusMargin;