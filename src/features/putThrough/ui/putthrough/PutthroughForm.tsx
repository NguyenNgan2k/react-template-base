import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
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
        <FormSearch.Field label="Tài khoản">
        </FormSearch.Field>
        <FormSearch.Field label="Sổ hiệu lệnh">
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  )
};
export default PutthroughForm;