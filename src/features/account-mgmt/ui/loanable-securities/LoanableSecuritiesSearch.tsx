import Button from "@/components/common/Button";
import FormSearch from "@/components/form/FormSearch";
import TextFormField from "@/components/inputs/text/TextFormField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { LoanableSecuritiesParams } from "../../accountManagementType";
import SelectFormField from "@/components/inputs/select/standard/SelectFormField";
import MenuDashboard from "@/features/priceboard/components/menu-board";

type FormValues = {
    symbol: string;
    group: string;
};

const LoanableSecuritiesSearch = (props: {
    handleSearch: (data: LoanableSecuritiesParams) => void;
}) => {
    const [active, setActive] = useState<string>("fav_default");

    const form = useForm<FormValues>({
        defaultValues: {
            symbol: "",
            group: "",
        },
    });

    const handleSearch = () => {
        const data = form.getValues();
        props.handleSearch({
            symbol: data.symbol || "",
            group: data.group || "",
        });
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <FormSearch form={form} onSubmit={handleSearch}>
            <FormSearch.Body>
                <MenuDashboard active={active} onChange={(tab) => setActive(tab)} />
                <FormSearch.Field label="Mã CK">
                    <TextFormField name="symbol" />
                </FormSearch.Field>
                <FormSearch.Field label="Group">
                    <SelectFormField name="group" options={[]} />
                </FormSearch.Field>
                <Button type="submit">Tìm kiếm</Button>
            </FormSearch.Body>
        </FormSearch>
    );
};

export default LoanableSecuritiesSearch;
