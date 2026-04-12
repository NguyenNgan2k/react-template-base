import Descriptions, { type DescriptionsProps } from "@/components/desctiption/Descriptions";
import { selectAccountBalance, selectAccountInfo } from "@/features/account/redux/accountSlice";
import { useAppSelector } from "@/store/hook";
import { numberFormat } from "@/utils";


const AccountInfo = () => {
  const accountInfo = useAppSelector(selectAccountInfo)
  const accountBalance = useAppSelector(selectAccountBalance)

  const items_1: DescriptionsProps['items'] = [
    {
      label: 'Mã lưu ký',
      children: accountInfo?.custCode,
    },
    {
      label: 'Tên KH',
      children: accountInfo?.accountName,
    },
    {
      label: 'MKTID',
      children: accountInfo?.marketingId,
    },
    {
      label: 'EE',
      children: numberFormat(accountBalance?.accType === 'N' ? accountBalance?.cashAvaiable : accountBalance?.ee)
    },
    {
      label: 'Mua max',
      children: numberFormat(accountBalance?.volumeAvaiable)
    },
  ];
  const items_2: DescriptionsProps['items'] = [
    {
      label: 'Mật khẩu CC',
      children: accountInfo?.cc ? "Đã có" : "Chưa có",
    },
    {
      label: '',
      children: '',
    },
    {
      label: 'Tỷ lệ',
      children: accountBalance?.marginratio
    },
    {
      label: 'Sức mua',
      children: numberFormat(accountBalance?.accType === 'N' ? accountBalance?.cashAvaiable : accountBalance?.pp)
    },
    {
      label: 'Bán max',
      children: numberFormat(accountBalance?.balance)
    },
  ];

  return (
    <div className="grid grid-cols-2">
      <Descriptions
        className="divide-y divide-bd-default border border-bd-default"
        items={items_1}
      />
      <Descriptions
        className="divide-y divide-bd-default border border-bd-default"
        items={items_2}
      />
    </div>
  )
}
export default AccountInfo