import { FormProvider } from "react-hook-form";

export type FormProps = {
  form: any
  children: React.ReactNode;
  onSubmit: (data: any) => void;
}

const Form = (props: FormProps) => {
  return (
    <FormProvider {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
};

export default Form;
