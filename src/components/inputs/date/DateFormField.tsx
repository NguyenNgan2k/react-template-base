import Date from "./Date";
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  className?: string;
  iClassName?: string;
  placeholder?: string;
  disabled?: boolean;
}

const DateFormField = ({ name, ...props }: Props) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Date
          {...field}
          {...props}
          error={error}
        />
      )}
    />

  );
};

export default DateFormField;