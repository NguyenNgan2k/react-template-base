import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { MarginAccountParams } from "../../accountManagementType";

type FormValues = {
  marketingId: string;
  groupProduct: string;
  overdueDebt: string;
  status: string;
};

const MarginAccountSearch = (props: {
  handleSearch: (data: MarginAccountParams) => void;
}) => {
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
          <TextFormField name="groupProduct" />
        </FormSearch.Field>
        <FormSearch.Field label="Trạng thái">
          <TextFormField name="status" />
        </FormSearch.Field>
        <FormSearch.Field label="Nợ quá hạn">
          <TextFormField name="overdueDebt" />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  );
};

export default MarginAccountSearch;
