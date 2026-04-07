import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearchLayout";
import MaskFormField from "@/components/inputs/mask/MaskFormField";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useAppDispatch } from "@/store/hook";
import { useForm } from "react-hook-form";

type FormValues = {
  account: string;
  symbol: string;
  no: string;
  channel: string;
  status: string;
  type: string;
}

const OrderBookForm = () => {
  const dispatch = useAppDispatch()
  const form = useForm<FormValues>()

  const onSubmit = (data: FormValues) => { }

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.FormField lable="Tài khoản">
          <MaskFormField
            name='account'
            maxLength={7}
          />
        </FormSearch.FormField>
        <FormSearch.FormField
          lable="Mã CK"
        >
          <TextFormField name="symbol" />
        </FormSearch.FormField>
        <FormSearch.FormField
          lable="Sổ hiệu lệnh"
        >
          <TextFormField name="no" />
        </FormSearch.FormField>
        <FormSearch.FormField
          lable="Kênh giao dịch"
        >
          <TextFormField name="channel" />
        </FormSearch.FormField>
        <FormSearch.FormField
          lable="Trạng thái lệnh"
        >
          <SelectFormField
            name="status"
            options={[]}
          />
        </FormSearch.FormField>
        <FormSearch.FormField
          lable="Loại lệnh"
        >
          <SelectFormField
            name="type"
            options={[]}
          />
        </FormSearch.FormField>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch >
  );
}
export default OrderBookForm;