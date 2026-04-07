import Descriptions, { type DescriptionsProps } from "@/components/desctiption/Descriptions";
import ModalLayout from "@/components/layout/ModalLayout";

type OrderConfirmProps = {
  onClose: () => void
}

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Tài khoản',
    children: '0000451',
  },
  {
    key: '2',
    label: 'MÃ CK',
    children: 'AAA',
  },
  {
    key: '3',
    label: 'Loại lệnh',
    children: 'Mua',
  },
  {
    key: '4',
    label: 'Giá đặt',
    children: '2.2',
  },
  {
    key: '5',
    label: 'Khối lượng đặt',
    children: '100',
  },
];

const OrderConfirm = (props: OrderConfirmProps) => {
  return (
    <ModalLayout
      title="Xác nhận đặt lệnh"
      onClose={props.onClose}
    >
      <div>
        <Descriptions
          className="flex flex-col gap-4"
          items={items}
        />
      </div>
    </ModalLayout>
  )
}
export default OrderConfirm;  
