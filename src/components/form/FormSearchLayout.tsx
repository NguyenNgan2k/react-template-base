import Form, { type FormProps } from "./FormLayout";

const FormSearch = (props: FormProps) => {
  return (
    <Form {...props} />
  );
};

const Body = (props: { children?: React.ReactNode }) => {
  return <div className="h-10 p-2 flex gap-2 items-center">
    {props.children}
  </div>;
};


const FormField = (props: { lable: string, children?: React.ReactNode }) => {
  return <div className="grid grid-cols-[auto_80px] gap-1 items-center">
    <div>{props.lable}</div>
    <div>{props.children}</div>
  </div>;
};

FormSearch.Body = Body;
FormSearch.FormField = FormField;

export default FormSearch;
