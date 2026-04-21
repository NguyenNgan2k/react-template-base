import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useForm } from "react-hook-form";
import { orderStatusOptions, orderTypeOptions } from "../orderBookConfig";
import type { OrderBookParams } from "../orderBookType";
import { useEffect } from "react";

type FormValues = {
  account: string;
  symbol: string;
  no: string;
  side: string;
  status: string;
  channel: string
}

const OrderBookSearch = (props: { handleSearch: (data: OrderBookParams) => void }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      account: '',
      symbol: '',
      no: '',
      side: 'ALL',
      status: 'ALL',
      channel: ''
    }
  })

  useEffect(() => {
    _handleSearch()
  }, [])

  const onSubmit = () => {
    _handleSearch()
  }

  const _handleSearch = () => {
    const data = form.getValues()
    const params: OrderBookParams = {
      symbol: data?.symbol,
      account: data.account,
      orderStatus: data.status,
      channel: data.channel,
      side: data.side,
      enter: '',
      mktId: '',
    }
    props.handleSearch(params)
  }

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.Field label="Tài khoản">
          <TextFormField
            name='account'
            maxLength={7}
          />
        </FormSearch.Field>
        <FormSearch.Field
          label="Mã CK"
        >
          <TextFormField name="symbol" />
        </FormSearch.Field>
        <FormSearch.Field
          label="Sổ hiệu lệnh"
        >
          <TextFormField name="no" />
        </FormSearch.Field>
        <FormSearch.Field
          label="Kênh giao dịch"
        >
          <TextFormField name="channel" />
        </FormSearch.Field>
        <FormSearch.Field
          label="Trạng thái lệnh"
        >
          <SelectFormField
            name="status"
            options={orderStatusOptions}
            mode='label'
          />
        </FormSearch.Field>
        <FormSearch.Field
          label="Loại lệnh"
        >
          <SelectFormField
            name="side"
            options={orderTypeOptions}
            mode='label'
          />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch >
  );
}
export default OrderBookSearch;