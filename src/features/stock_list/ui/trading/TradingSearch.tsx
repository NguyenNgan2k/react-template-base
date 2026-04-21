import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import type { Option } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { TradingParams } from "../../stockListType";

type FormValues = {
  symbol: string;
  tradingStatus: string;
};

const statusOptions: Option[] = [
  { value: "", label: "Tất cả" },
  { value: "ACTIVE", label: "Đang giao dịch" },
  { value: "BLOCKED", label: "Bị chặn" },
];

const TradingSearch = (props: { handleSearch: (data: TradingParams) => void }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      symbol: "",
      tradingStatus: "",
    },
  });

  const handleSearch = () => {
    const data = form.getValues();
    props.handleSearch({
      symbol: data.symbol || "",
      tradingStatus: data.tradingStatus || "",
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <FormSearch form={form} onSubmit={handleSearch}>
      <FormSearch.Body>
        <FormSearch.Field label="Mã CK">
          <TextFormField name="symbol" />
        </FormSearch.Field>
        <FormSearch.Field label="Trạng thái">
          <SelectFormField name="tradingStatus" options={statusOptions} mode="label" />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  );
};

export default TradingSearch;