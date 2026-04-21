import clsx from "clsx";

export type DescriptionItemProps = {
  className?: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

export type DescriptionsProps = {
  items?: DescriptionItemProps[],
  className?: string;
  children?: React.ReactNode;
}

const Descriptions = (props: DescriptionsProps) => {
  return (
    <div className={clsx(
      props.className
    )}>
      {props.items && props.items.map((item, index) => (
        <div key={index}>
          <Item {...item} />
        </div>
      ))}
      {props.children}
    </div>
  );

}

const Item: React.FC<DescriptionItemProps> = (props) => {
  return (
    <div
      className={clsx("flex", props.className)}
    >
      <span className="p-0.5 w-1/3" > {props.label}</span >
      <span className="p-0.5 w-2/3 font-semibold">{props.children}</span>
    </div >
  )
}

Descriptions.Item = Item;
export default Descriptions
