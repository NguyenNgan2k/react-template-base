import Mask from "./Mask";
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  onBlur?: (value: string) => void;
  className?: string;
  iClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  showErrorMessage?: boolean;
  maxLength?: number;
}
const MaskFormField = ({ name, onBlur, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Mask
          {...field}
          {...props}
          error={error}
          onBlur={() => {
            field.onBlur();
            onBlur?.(field.value);
          }}
        />
      )}
    />
  );
};

export default MaskFormField;