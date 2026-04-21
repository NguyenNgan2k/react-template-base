import Form, { type FormProps } from "./Form";

const FormSearch = (props: FormProps) => {
  return (
    <Form {...props} />
  );
};

FormSearch.Body = (props: { children?: React.ReactNode }) => {
  return <div className="h-full flex gap-2 items-center py-1">
    {props.children}
  </div>;
};


FormSearch.Field = (props: { label: string, children?: React.ReactNode }) => {
  return <div className="flex gap-1 items-center">
    <div > {props.label}</div >
    <div className="w-28">{props.children}</div>
  </div >;
};


export default FormSearch;
