import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearchLayout";
import { useAppDispatch } from "@/store/hook";
import { useForm } from "react-hook-form";

type FormValues = {
}

const PutthroughForm = () => {
  const dispatch = useAppDispatch()
  const form = useForm<FormValues>()

  const onSubmit = (data: FormValues) => { }
  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.FormField lable="Tài khoản">
        </FormSearch.FormField>
        <FormSearch.FormField lable="Sổ hiệu lệnh">
        </FormSearch.FormField>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  )
};
export default PutthroughForm;