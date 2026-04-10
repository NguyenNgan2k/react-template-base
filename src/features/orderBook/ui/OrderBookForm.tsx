import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearchLayout";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useAppDispatch } from "@/store/hook";
import { useForm } from "react-hook-form";
import { orderStatusOptions, orderTypeOptions } from "../orderBookConfig";
import type { OrderBookRequest } from "../orderBookType";
import { fetchOrderBookRequest } from "../redux/orderBookSlice";
import { useEffect } from "react";

type FormValues = {
  account: string;
  symbol: string;
  no: string;
  side: string;
  status: string;
  channel: string
}

const OrderBookForm = () => {
  const dispatch = useAppDispatch()
  const form = useForm<FormValues>({
    defaultValues: {
      account: '',
      symbol: '',
      no: '',
      side: 'ALL',
      status: 'ALL',
      channel: ''
    }
  }
  )

  useEffect(() => {
    handleFetchOrderBook()
  }, [])

  const onSubmit = () => {
    handleFetchOrderBook()
  }

  const handleFetchOrderBook = () => {
    const data = form.getValues()
    const params: OrderBookRequest = {
      symbol: data?.symbol,
      account: data.symbol,
      orderStatus: data.status,
      channel: data.channel,
      side: data.side,
      enter: '',
      mktId: '',
      page: 1,
      size: 1000,
    }
    dispatch(fetchOrderBookRequest(params))
  }

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.FormField label="Tài khoản">
          <TextFormField
            name='account'
            maxLength={7}
          />
        </FormSearch.FormField>
        <FormSearch.FormField
          label="Mã CK"
        >
          <TextFormField name="symbol" />
        </FormSearch.FormField>
        <FormSearch.FormField
          label="Sổ hiệu lệnh"
        >
          <TextFormField name="no" />
        </FormSearch.FormField>
        <FormSearch.FormField
          label="Kênh giao dịch"
        >
          <TextFormField name="channel" />
        </FormSearch.FormField>
        <FormSearch.FormField
          label="Trạng thái lệnh"
        >
          <SelectFormField
            name="status"
            options={orderStatusOptions}
            mode='label'
          />
        </FormSearch.FormField>
        <FormSearch.FormField
          label="Loại lệnh"
        >
          <SelectFormField
            name="side"
            options={orderTypeOptions}
            mode='label'
          />
        </FormSearch.FormField>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch >
  );
}
export default OrderBookForm;