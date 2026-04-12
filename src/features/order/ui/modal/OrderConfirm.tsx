import Descriptions from "@/components/desctiption/Descriptions";
import ModalLayout from "@/components/layout/ModalLayout";
import type { OrderValue } from "../../orderType";
import Button from "@/components/common/Button";

type OrderConfirmProps = {
  order: OrderValue,
  onClose: () => void
  onAccept: () => void
}

const OrderConfirm = (props: OrderConfirmProps) => {
  return (
    <ModalLayout
      title="Xác nhận đặt lệnh"
      onClose={props.onClose}
    >
      <Descriptions className="flex flex-col gap-4">
        <Descriptions.Item
          label='Tài khoản'
        >
          {props.order.account}
        </Descriptions.Item>
        <Descriptions.Item
          label='Mã CK'
        >
          {props.order.symbol}
        </Descriptions.Item>
        <Descriptions.Item
          label='Loại lệnh'
        >
          <span className={props.order.side === 'B' ? 'text-text-buy' : 'text-text-sell'}>{props.order.side === 'B' ? "MUA" : "BÁN"}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label='Giá đặt'
        >
          {props.order.price}
        </Descriptions.Item>
        <Descriptions.Item
          label='Khối lượng đặt'
        >
          {props.order.volume}
        </Descriptions.Item>
      </Descriptions>
      <div className="flex gap-2 justify-center">
        <Button
          variant="close"
          className="w-22"
          onClick={props.onClose}
        >
          Hủy
        </Button>
        <Button
          variant="success"
          className="w-22"
          onClick={props.onAccept}>
          Xác nhận
        </Button>
      </div>
    </ModalLayout>
  )
}
export default OrderConfirm;  
