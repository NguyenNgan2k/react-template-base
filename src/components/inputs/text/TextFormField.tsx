import Text from "./Text";
import { get, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & React.ComponentProps<typeof Text>;

const TextFormField = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Text
      {...register(props.name)}
      {...props}
      error={get(errors, props.name)}
    />
  );
};


export default TextFormField; 