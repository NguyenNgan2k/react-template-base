import { Controller, useFormContext } from 'react-hook-form';
import InputSearchFieldStock from "@/components/inputs/InputSearchFieldStock";


type Props = {
  name: string;
  className?: string;
  placeholder?: string;
  typeInput?: string;
  autoFocus?: boolean;
  isClearable?: boolean
}

const RHFSelectStock = ({ name, ...props }: Props) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputSearchFieldStock
          {...field}
          {...props}
        />
      )}
    />

  );
};


export default RHFSelectStock;