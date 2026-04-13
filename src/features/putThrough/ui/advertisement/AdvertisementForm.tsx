import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useAppDispatch } from "@/store/hook";
import { useForm } from "react-hook-form";
import type { AdvertisementRequest } from "../../putthroughType";
import { fetchAdvertisementRequest } from "../../redux/putthroughSlice";

type FormValues = {
  firm: '',
  orderNo: '',
}

const AdvertisementForm = () => {
  const dispatch = useAppDispatch()
  const form = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    const params: AdvertisementRequest = {
      firm: data.firm,
      orderNo: data.orderNo,
      page: 1,
      size: 1000,
    }
    dispatch(fetchAdvertisementRequest(params))
  }

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.Field label="Firm">
          <TextFormField name='firm' />
        </FormSearch.Field>
        <FormSearch.Field label="Sổ hiệu lệnh">
          <TextFormField name="orderNo" />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  )
};
export default AdvertisementForm;