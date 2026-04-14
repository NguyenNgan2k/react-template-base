import Button from "@/components/common/Button";
import Form from "@/components/form/Form";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import { BrokerID, TraderID } from "@/configs";
import { validatePrice, validateVolume } from "@/features/order/orderBusiness";
import { fetchStockInfoRequest, selectStockInfo } from "@/features/stock/redux/stockSlice";
import { getNameMarket } from "@/features/stock/stockBusiness";
import type { StockInfoRequest } from "@/features/stock/stockType";
import { showToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { orderSide } from "../../putthroughConfig";

type FormValues = {
  side: string;
  brokerId: string;
  traderId: string;
  symbol: string;
  price: string;
  volume: string;
  contact: string;
  orderId: string;
  quoteId: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  side: yup
    .string()
    .required("Chọn Mua/Bán"),
  brokerId: yup
    .string()
    .defined(),
  traderId: yup
    .string()
    .defined(),
  symbol: yup
    .string()
    .required("Nhập mã chứng khoán"),
  price: yup
    .string()
    .required("Nhập giá"),
  volume: yup
    .string()
    .required("Nhập khối lượng")
    .matches(/^\d+$/, "Khối lượng phải là số nguyên dương"),
  contact: yup
    .string()
    .required("Nhập mã số điện thoại liên hệ"),
  orderId: yup
    .string()
    .defined(),
  quoteId: yup
    .string()
    .defined(),
})

const OrderAdvertisementForm = () => {
  const dispatch = useAppDispatch()
  const stockInfo = useAppSelector(selectStockInfo)

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      side: 'B',
      brokerId: BrokerID,
      traderId: TraderID,
      symbol: '',
      price: '',
      volume: '',
      contact: '',
      orderId: '',
      quoteId: '',
    }
  })

  const side = form.watch('side')

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

  const handleOnBlurSymbol = () => {
    const symbol = form.getValues('symbol').toUpperCase();
    if (!symbol) return;
    handleFetchStockInfo(symbol);
  }

  const handleFetchStockInfo = (symbol: string) => {
    if (!symbol) return;
    const params: StockInfoRequest = {
      stock: symbol,
      data: {
        account: '',
        volume: form.getValues('volume'),
        type: 'P'
      }
    }
    dispatch(fetchStockInfoRequest(params))
  }

  const handleOnClickCancel = () => {
    form.reset()
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="p-2 flex flex-col h-full border border-bd-default rounded">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Form.Field label="Loại lệnh">
              <SelectFormField
                name='side'
                options={orderSide}
                mode="label"
                iClassName={side === "B" ? 'bg-bg-buy!' : 'bg-bg-sell!'}
              />
            </Form.Field>
            <Form.Field label="Mã CK">
              <TextFormField
                name='symbol'
                onBlur={handleOnBlurSymbol}
              />
            </Form.Field>
            <div className='flex flex-1 gap-2 items-center'>
              <span className='pill c'>{stockInfo?.c || '...'}</span>
              <span className='pill f'>{stockInfo?.f || '...'}</span>
              <span className='pill'>Sàn: {stockInfo?.mc && getNameMarket(stockInfo?.mc) || '...'}</span>
              <span className='pill'>Bảng:{stockInfo?.board_id || '...'}</span>
            </div>
          </div>
          <div>
            <Form.Field label="BrokerId">
              <TextFormField name='brokerId' disabled />
            </Form.Field>
            <Form.Field label="Giá">
              <TextFormField name='price' />
            </Form.Field>
          </div>
          <div>
            <Form.Field label="TraderId">
              <TextFormField name='traderId' disabled />
            </Form.Field>
            <Form.Field label="Khối lượng">
              <TextFormField name='volume' />
            </Form.Field>
          </div>
          <div>
            <Form.Field label="Contact">
              <TextFormField name='contact' />
            </Form.Field>
            <Form.Field label="OrderId">
              <TextFormField name='orderId' />
            </Form.Field>
            <Form.Field label="Quote ID">
              <TextFormField name='quoteId' />
            </Form.Field>
          </div>
        </div >
        <div className='flex gap-2 justify-end mt-auto p-2'>
          <Button className='w-22' variant='close' onClick={handleOnClickCancel}>Hủy</Button>
          <Button type='submit' className='w-22' variant='success'>Xác nhân</Button>
        </div>
      </div>
    </Form >
  )
};
export default OrderAdvertisementForm;