import CheckBox from "./CheckBox";
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & React.ComponentProps<typeof CheckBox>;

const CheckBoxFormField = (props: Props) => {
  const {
    register,
  } = useFormContext();
  return (
    <CheckBox
      {...register(props.name)}
      {...props}
    />
  );
};


export default CheckBoxFormField; 