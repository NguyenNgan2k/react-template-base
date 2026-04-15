import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { PutThroughParams } from "../../putthroughType";

type FormValues = {
  account: '',
  orderNo: '',
}

const PutThroughForm = (props: { handleSearch: (data: PutThroughParams) => void }) => {
  const form = useForm<FormValues>()

  useEffect(() => {
    _handleSearch()
  }, [])

  const onSubmit = () => {
    _handleSearch()
  }

  const _handleSearch = () => {
    const data = form.getValues()
    const params: PutThroughParams = {
      account: data.account,
      orderNo: data.orderNo,
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
        <FormSearch.Field label="Sổ hiệu lệnh">
          <TextFormField name="orderNo" />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  )
};
export default PutThroughForm;