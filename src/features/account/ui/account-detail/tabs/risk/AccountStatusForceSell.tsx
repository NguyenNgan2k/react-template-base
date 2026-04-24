import Descriptions from "@/components/desctiption/Descriptions-v2";

const AccountStatusForceSell = () => {
  const accountStatusForceSellItems = [
    { label: "Tỷ lệ", children: 0 },//valueAfter.afterRate
    { label: "Tổng tài sản", children: 0 },//valueAfter.afterMAsset
    { label: "Nợ", children: 0 },//valueAfter.afterDebt
    { label: "Tài sản ròng", children: 0 } //valueAfter.afterMEquity
  ]

  return (
    <Descriptions items={accountStatusForceSellItems} />
  )
}

export default AccountStatusForceSell;