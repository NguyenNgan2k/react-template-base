import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useForm } from "react-hook-form";
import type { AdvertisementParams } from "../../putthroughType";
import { useEffect } from "react";

type FormValues = {
  firm: '',
  orderNo: '',
}

const AdvertisementForm = (props: { handleSearch: (data: AdvertisementParams) => void }) => {
  const form = useForm<FormValues>()

  useEffect(() => {
    _handleSearch()
  }, [])

  const onSubmit = () => {
    _handleSearch()
  }

  const _handleSearch = () => {
    const data = form.getValues()
    const params: AdvertisementParams = {
      firm: data.firm,
      orderNo: data.orderNo,
    }
    props.handleSearch(params)
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