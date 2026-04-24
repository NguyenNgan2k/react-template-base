import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import DateFormField from "@/components/inputs/date/DateFormField";
import TextFormField from "@/components/inputs/text/TextFormField";
import { formatDate } from "@/utils/date";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type ProfitLossSearchParams = {
  fromDate?: string;
  toDate?: string;
  symbol?: string;
};

type ProfitLossSearchValues = {
  fromDate: Date | null;
  toDate: Date | null;
  symbol: string;
};

const ProfitLossSearch = (props: {
  handleSearch: (data: ProfitLossSearchParams) => void;
}) => {
  const form = useForm<ProfitLossSearchValues>({
    defaultValues: {
      fromDate: null,
      toDate: null,
      symbol: "",
    },
  });

  const handleSearch = () => {
    const data = form.getValues();
    props.handleSearch({
      fromDate: formatDate(data.fromDate, "-") || undefined,
      toDate: formatDate(data.toDate, "-") || undefined,
      symbol: data.symbol?.trim() || undefined,
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
        <FormSearch.Field label="Từ ngày">
          <DateFormField name="fromDate" placeholder="dd/MM/yyyy" />
        </FormSearch.Field>
        <FormSearch.Field label="Đến ngày">
          <DateFormField name="toDate" placeholder="dd/MM/yyyy" />
        </FormSearch.Field>
        <Button type="submit">Tìm kiếm</Button>
      </FormSearch.Body>
    </FormSearch>
  );
};

export default ProfitLossSearch;