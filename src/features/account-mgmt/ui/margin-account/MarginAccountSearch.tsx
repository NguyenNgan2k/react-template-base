import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { MarginAccountParams } from "../../accountManagementType";
import { useAppDispatch } from "@/store/hook";
import { fetchListProductRequest } from "../../redux/accountManagementSlice";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import { accountMarginOverdueDebtOptions, accountMarginStatusOptions } from "../../accountManagementConfigs";

type FormValues = {
  marketingId: string;
  groupProduct: string;
  overdueDebt: string;
  status: string;
};

const MarginAccountSearch = (props: {
  handleSearch: (data: MarginAccountParams) => void;
}) => {
  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    defaultValues: {
      marketingId: "",
      groupProduct: "",
      overdueDebt: "",
      status: "",
    },
  });

  useEffect(() => {
    handleSearch();
    // dispatch(fetchListProductRequest({ page: 1, size: 1000 }));
  }, []);

  const onSubmit = () => {
    handleSearch();
  };

  const handleSearch = () => {
    const data = form.getValues();
    const params: MarginAccountParams = {
      marketingId: data.marketingId || "",
      // groupProduct: data.groupProduct || "",
      // overdueDebt: data.overdueDebt || "",
      // status: data.status || "",
    };
    props.handleSearch(params);
  };

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.Field label="Marketting ID">
          <TextFormField name="marketingId" />
        </FormSearch.Field>
        <FormSearch.Field label="Group">
          <SelectFormField name="groupProduct" options={[]} mode='label' />
        </FormSearch.Field>
        <FormSearch.Field label="Trạng thái">
          <SelectFormField name="status" options={accountMarginStatusOptions} mode='label' />
        </FormSearch.Field>
        <FormSearch.Field label="Nợ quá hạn">
          <SelectFormField name="overdueDebt" options={accountMarginOverdueDebtOptions} mode='label' />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  );
};

export default MarginAccountSearch;
