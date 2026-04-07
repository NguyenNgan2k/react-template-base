import type { Option } from "@/types";
import Select from "./Select";
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  options: readonly Option[];
  className?: string;
  iClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  mode?: 'full' | 'value' | 'label'
}

const SelectFormField = ({ name, ...props }: Props) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          {...props}
          error={error}
        />
      )}
    />

  );
};


export default SelectFormField;