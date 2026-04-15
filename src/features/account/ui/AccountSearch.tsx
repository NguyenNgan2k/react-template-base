import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useAppDispatch } from "@/store/hook";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormValues = {
  account: string;
  symbol: string;
  no: string;
  side: string;
  status: string;
  channel: string
}

const AccountSearch = () => {
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
    handleFetchAccount()
  }, [])

  const onSubmit = () => {
    handleFetchAccount()
  }

  const handleFetchAccount = () => {
    const data = form.getValues()
    const params: unknown = {
      page: 1,
      size: 1000,
    }
    // dispatch(fetchOrderBookRequest(params))
  }

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.Field label="Tài khoản">
          <TextFormField
            name='account'
            maxLength={7}
          />
          <FormSearch.Field label="Marketing ID">
            <TextFormField
              name='marketingId'
            />
          </FormSearch.Field>
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch >
  );
}
export default AccountSearch;