import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { StockOwnershipParams } from "../../accountManagementType";

type FormValues = {
    symbol: string;
};

const StockOwnershipSearch = (props: {
    handleSearch: (data: StockOwnershipParams) => void;
}) => {
    const form = useForm<FormValues>({
        defaultValues: {
            symbol: "",
        },
    });

    const handleSearch = () => {
        const data = form.getValues();
        props.handleSearch({
            symbol: data.symbol || "",
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
                <Button type="submit">Tìm kiếm</Button>
            </FormSearch.Body>
        </FormSearch>
    );
};

export default StockOwnershipSearch;
