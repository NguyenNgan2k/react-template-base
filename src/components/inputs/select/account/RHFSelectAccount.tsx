import { Controller, useFormContext } from 'react-hook-form';
import SelectAccount from "@/components/inputs/SelectAccount";

type Props = {
  name: string;
} & React.ComponentProps<typeof SelectAccount>;

const RHFSelect = ({ name, ...props }: Props) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <SelectAccount
          {...field}
          {...props}
          error={error}
        />
      )}
    />

  );
};


export default RHFSelect;