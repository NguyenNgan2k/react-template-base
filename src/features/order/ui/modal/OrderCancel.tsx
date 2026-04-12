import Descriptions, { type DescriptionsProps } from "@/components/desctiption/Descriptions";
import ModalLayout from "@/components/layout/ModalLayout";
import type { OrderDetail } from "../../orderType";
import Button from "@/components/common/Button";

type OrderCancelProps = {
    selectedOrder: OrderDetail
    onClose: () => void
}

const OrderCancel = (props: OrderCancelProps) => {
    return (
        <ModalLayout
            title="Xác nhận hủy lệnh"
            onClose={props.onClose}
        >
            <Descriptions className="flex flex-col gap-4">
                <Descriptions.Item
                    label='Số hiệu lệnh'
                >
                    {props.selectedOrder.orderNo}
                </Descriptions.Item>
                <Descriptions.Item
                    label='Tài khoản'
                >
                    {props.selectedOrder.accountCode}
                </Descriptions.Item>
                <Descriptions.Item
                    label='Mã CK'
                >
                    {props.selectedOrder.shareCode}
                </Descriptions.Item>
                <Descriptions.Item
                    label='Loại lệnh'
                >
                    <span className={props.selectedOrder.side === 'B' ? 'text-text-buy' : 'text-text-sell'}>{props.selectedOrder.side === 'B' ? "MUA" : "BÁN"}</span>
                </Descriptions.Item>
                <Descriptions.Item
                    label='Giá đặt'
                >
                    {props.selectedOrder.orderShowPrice}
                </Descriptions.Item>
                <Descriptions.Item
                    label='Khối lượng đặt'
                >
                    {props.selectedOrder.orderVolume}
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
                    onClick={() => { }}>
                    Xác nhận
                </Button>
            </div>
        </ModalLayout>
    )
}
export default OrderCancel;  
