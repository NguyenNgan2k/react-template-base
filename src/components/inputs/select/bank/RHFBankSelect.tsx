import type { Option } from "@/types";
import CardSelect from "./BankSelect";
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  options: readonly Option[];
}

const RHFCardSelect = ({ name, ...props }: Props) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CardSelect
          {...field}
          {...props}
          error={error}
        />
      )}
    />

  );
};


export default RHFCardSelect;