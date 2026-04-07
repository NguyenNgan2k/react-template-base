import clsx from "clsx";

export type DescriptionsProps = {
  items: Array<{
    key: React.Key;
    label: React.ReactNode;
    children?: React.ReactNode;
  }>,
  className?: string;
}

const Descriptions: React.FC<DescriptionsProps> = (props) => {
  return (
    <div className={clsx(
      props.className
    )}>
      {props.items.map((item) => (
        <div key={item.key} className="grid grid-cols-[100px_auto]">
          <span className="p-0.5">{item.label}</span>
          <span className="p-0.5">{item.children}</span>
        </div>
      ))}
    </div>
  );

}
export default Descriptions