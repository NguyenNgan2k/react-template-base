import Button from "@/components/common/Button";
import Form from "@/components/form/Form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { AccountFilterParams } from "../../accountManagementType";
import MaskFormField from "@/components/inputs/mask/MaskFormField";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import { stockFilterOptions } from "../../accountManagementConfigs";

type FormValues = {
    symbol: string;
    debt: string;
    weight: string;
};

const StockFilterSearch = (props: {
    handleSearch: (data: AccountFilterParams) => void;
}) => {
    const form = useForm<FormValues>({
        defaultValues: {
            symbol: "",
            debt: "",
            weight: "",
        },
    });

    const handleSearch = () => {
        const data = form.getValues();
        props.handleSearch({
            symbol: data.symbol || "",
            debt: data.debt || "",
            weight: data.weight || "",
        });
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <Form form={form} onSubmit={handleSearch}>
            <div className="w-full">
                <Form.Field label="Số CK >=">
                    <MaskFormField name="stockNumber" />
                </Form.Field>
                <Form.Field label="Dư nợ >=">
                    <MaskFormField name="debt" />
                </Form.Field>
                <Form.Field label="Tỷ trọng >=">
                    <SelectFormField name="weight" options={stockFilterOptions} mode='label' />
                </Form.Field>
                <Button type="submit" className="m-auto mt-1">Tìm kiếm</Button>
            </div>
        </Form>
    );
};

export default StockFilterSearch;
