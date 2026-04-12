import Form, { type FormProps } from "./Form";

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


const Field = (props: { label: string, children?: React.ReactNode }) => {
  return <div className="flex gap-1 items-center">
    <div>{props.label}</div>
    <div className="w-28">{props.children}</div>
  </div>;
};

FormSearch.Body = Body;
FormSearch.Field = Field;

export default FormSearch;
