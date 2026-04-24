import Descriptions from "@/components/desctiption/Descriptions-v2";
import { selectAccountStatus } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import { numberFormat } from "@/utils";

const AccountStatusPresent = () => {
  const accountStatus = useAppSelector(selectAccountStatus);

  const accountStatusPresentItems = [
    { label: "Tỷ lệ", children: numberFormat(accountStatus?.margin_ratio, 0, "-") },
    { label: "Tổng tài sản", children: numberFormat(accountStatus?.assets, 0, "-") },
    { label: "Trạng thái", children: numberFormat(accountStatus?.action, 0, "-") },
    { label: "Nợ", children: numberFormat(accountStatus?.debt, 0, "-") },
    { label: "Nộp tiền mặt", children: numberFormat(accountStatus?.a2, 0, "-") },
    { label: "TS ròng", children: numberFormat(accountStatus?.equity, 0, "-") },
    { label: "Bán CK cho vay", children: numberFormat(accountStatus?.a5, 0, "-") },
    { label: "ΣAP - AdvWithdraw", children: numberFormat(accountStatus?.sum_ap, 0, "-") },
    { label: "TTS giảm về Force sell", children: numberFormat(accountStatus?.a6, 0, "-") },
    { label: "Nợ quá hạn", children: numberFormat(accountStatus?.debtExpire, 0, "-") },
  ];

  return (
    <Descriptions items={accountStatusPresentItems} column={2} />
  )
}

export default AccountStatusPresent;