import Descriptions, { type DescriptionsProps } from "@/components/desctiption/Descriptions";
import ModalLayout from "@/components/layout/ModalLayout";
import type { OrderValues } from "./OrderForm";

type OrderConfirmProps = {
  order: OrderValues,
  onClose: () => void
  onAccept: () => void
}

const OrderConfirm = (props: OrderConfirmProps) => {

  const items: DescriptionsProps['items'] = [
    {
      key: 'account',
      label: 'Tài khoản',
      children: props.order.account,
    },
    {
      key: 'symbol',
      label: 'MÃ CK',
      children: props.order.symbol,
    },
    {
      key: 'side',
      label: 'Loại lệnh',
      children: props.order.side === 'B' ? "MUA" : "BÁN",
    },
    {
      key: 'price',
      label: 'Giá đặt',
      children: props.order.price,
    },
    {
      key: 'volume',
      label: 'Khối lượng đặt',
      children: props.order.volume,
    },
  ];
  return (
    <ModalLayout
      title="Xác nhận đặt lệnh"
      onClose={props.onClose}
      onAccept={props.onAccept}
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
