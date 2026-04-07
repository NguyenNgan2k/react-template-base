import Area from "./Area";
import { get, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & React.ComponentProps<typeof Area>;

const AreaFormField = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Area
      {...register(props.name)}
      {...props}
      error={get(errors, props.name)}
    />
  );
};


export default AreaFormField;