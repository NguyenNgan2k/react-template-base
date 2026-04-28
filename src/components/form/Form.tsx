import clsx from "clsx";
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

const Field = (props: { className?: string, label: string, children?: React.ReactNode }) => {
  return <div className={clsx("flex gap-1 items-center", props.className)}>
    <div className="w-28">{props.label}</div>
    <div className="w-40">{props.children}</div>
  </div >;
};

Form.Field = Field;

export default Form;
