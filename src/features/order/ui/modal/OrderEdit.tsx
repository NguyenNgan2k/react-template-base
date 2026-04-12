import Button from "@/components/common/Button";
import Descriptions from "@/components/desctiption/Descriptions";
import Form from "@/components/form/Form";
import TextFormField from "@/components/inputs/text/TextFormField";
import ModalLayout from "@/components/layout/ModalLayout";
import { fetchStockInfoRequest, selectStockInfo } from "@/features/stock/redux/stockSlice";
import type { StockInfoRequest } from "@/features/stock/stockType";
import { showToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { validatePrice, validateVolume } from "../../orderBusiness";
import type { OrderDetail } from "../../orderType";
import MaskFormField from "@/components/inputs/mask/MaskFormField";

type OrderChangeProps = {
    selectedOrder: OrderDetail
    onClose: () => void
}

type FormValues = {
    price: string;
    volume: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
    price: yup
        .string()
        .required("Nhập giá"),
    volume: yup
        .string()
        .required("Nhập khối lượng")
        .matches(/^\d+$/, "Khối lượng phải là số nguyên dương")
})

const OrderChange = (props: OrderChangeProps) => {
    const dispatch = useAppDispatch()
    const stockInfo = useAppSelector(selectStockInfo)

    const form = useForm<FormValues>({
        defaultValues: {
            price: props.selectedOrder.orderShowPrice,
            volume: props.selectedOrder.orderVolume.toString()
        },
        resolver: yupResolver(schema),
    })


    useEffect(() => {
        if (!props.selectedOrder) return
        handleFetchStockInfo()
    }, [])

    const handleFetchStockInfo = () => {
        if (!props.selectedOrder.shareCode) return;
        const params: StockInfoRequest = {
            stock: props.selectedOrder.shareCode,
            data: {
                account: props.selectedOrder.accountCode,
                volume: props.selectedOrder.orderVolume.toString(),
                type: 'N'
            }
        }
        dispatch(fetchStockInfoRequest(params))
    }

    const onSubmit = (data: FormValues) => {
        if (!stockInfo) return showToast('Không có dữ liệu mã chứng khoán', 'error')
        let validPrice = validatePrice(data.price, stockInfo?.c, stockInfo?.f, stockInfo?.market_price);
        if (!validPrice.isValid) {
            form.setError("price", { type: "error" });
            validPrice.message && showToast(validPrice.message, "warning");
            return;
        }

        let validVolume = validateVolume(data.volume);
        if (!validVolume.isValid) {
            form.setError("volume", { type: "error" });
            validVolume.message && showToast(validVolume.message, "warning");
            return;
        }
    }

    return (
        <ModalLayout
            title="Xác nhận sửa lệnh"
            onClose={props.onClose}
        >
            <Form form={form} onSubmit={onSubmit}>
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
                        <div className="flex flex-col">
                            {props.selectedOrder.shareCode}
                            <div className='flex gap-2'>
                                <span className='pill c'>{stockInfo?.c || '...'}</span>
                                <span className='pill f'>{stockInfo?.f || '...'}</span>
                                <span className='pill r'>{stockInfo?.r || '...'}</span>
                                <span className='pill'>Bảng:{stockInfo?.board_id || '...'}</span>
                            </div>
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='Loại lệnh'
                    >
                        <span className={props.selectedOrder.side === 'B' ? 'text-text-buy' : 'text-text-sell'}>{props.selectedOrder.side === 'B' ? "MUA" : "BÁN"}</span>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='Giá đặt'
                    >
                        <TextFormField name='price' />
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='Khối lượng đặt'
                    >
                        <MaskFormField name='volume' />
                    </Descriptions.Item>
                </Descriptions>
            </Form>
            <div className="flex gap-2 justify-center">
                <Button
                    variant="close"
                    className="w-22"
                    onClick={props.onClose}
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    variant="success"
                    className="w-22"
                >
                    Xác nhận
                </Button>
            </div>
        </ModalLayout>
    )
}
export default OrderChange;  
