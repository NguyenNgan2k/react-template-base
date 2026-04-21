import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { AccountListParams } from "../accountType";

type FormValues = {
  account?: string;
  accountName?: string;
  marketingId?: string;
  cardId?: string;
}

interface AccountSearchProps {
  handleSearch: (params: AccountListParams) => void;
}

const AccountSearch = ({ handleSearch }: AccountSearchProps) => {
  const form = useForm<FormValues>()

  useEffect(() => {
    handleFetchAccount()
  }, [])

  const onSubmit = () => {
    handleFetchAccount()
  }

  const handleFetchAccount = () => {
    const data = form.getValues()
    const params: AccountListParams = {
      account: data.account,
    }
    handleSearch(params)
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
        <FormSearch.Field label="Tên khách hàng">
          <TextFormField
            name='accountName'
          />
        </FormSearch.Field>
        <FormSearch.Field label="Marketing ID">
          <TextFormField
            name='marketingId'
          />
        </FormSearch.Field>
        <FormSearch.Field label="Số ĐKSH">
          <TextFormField
            name='cardId'
          />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch >
  );
}
export default AccountSearch;