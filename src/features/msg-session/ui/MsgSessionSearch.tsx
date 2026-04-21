import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { MsgSessionParams } from "../msgSessionType";

type FormValues = {
  type: string;
  data: string;
};

const MsgSessionSearch = (props: { handleSearch: (data: MsgSessionParams) => void }) => {
  const form = useForm<FormValues>();

  useEffect(() => {
    handleSearch();
  }, []);

  const onSubmit = () => {
    handleSearch();
  };

  const handleSearch = () => {
    const data = form.getValues();
    const params: MsgSessionParams = {
      type: data.type || "",
      data: data.data || "",
    };
    props.handleSearch(params);
  };

  return (
    <FormSearch form={form} onSubmit={onSubmit}>
      <FormSearch.Body>
        <FormSearch.Field label="Loại">
          <TextFormField name="type" />
        </FormSearch.Field>
        <FormSearch.Field label="Data">
          <TextFormField name="data" />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  );
};

export default MsgSessionSearch;
