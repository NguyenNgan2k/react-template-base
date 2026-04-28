import Descriptions from "@/components/desctiption/Descriptions-v2";
import { selectAccountForceCell } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import { numberFormat } from "@/utils";

const AccountStatusForceSell = () => {
  const accountForceCell = useAppSelector(selectAccountForceCell);

  const accountStatusForceSellItems = [
    { label: "Tỷ lệ", children: numberFormat(accountForceCell?.margin_rate, 0, "-") },
    { label: "Tổng tài sản", children: numberFormat(accountForceCell?.asset_value, 0, "-") },
    { label: "Nợ", children: numberFormat(accountForceCell?.debt_value, 0, "-") },
    { label: "Tài sản ròng", children: numberFormat(accountForceCell?.net_value, 0, "-") }
  ]

  return (
    <Descriptions items={accountStatusForceSellItems} />
  )
}

export default AccountStatusForceSell;