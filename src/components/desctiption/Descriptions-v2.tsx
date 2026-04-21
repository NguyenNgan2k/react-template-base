import clsx from "clsx";

export type DescriptionItemProps = {
  className?: string;
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

export type DescriptionsProps = {
  items?: DescriptionItemProps[],
  className?: string;
  children?: React.ReactNode;
  column?: number;
}

const buildRows = (items: DescriptionItemProps[] = [], column: number = 1): DescriptionItemProps[][] => {
  const rows: DescriptionItemProps[][] = [];
  let currentRow: DescriptionItemProps[] = [];
  let remaining: number = column;
  items.forEach((item) => {
    const span = item.span || 1
    if (span <= remaining) {
      currentRow.push(item);
      remaining -= span;
    }
    if (remaining === 0) {
      rows.push(currentRow)
      currentRow = []
      remaining = column
    }
  })
  return rows;
}

const Descriptions = (props: DescriptionsProps) => {
  const rows: DescriptionItemProps[][] = buildRows(props.items, props.column);
  console.log(rows, "rows=============")
  return (
    <table className={clsx(
      "table-borderless",
      props.className
    )}>
      <tbody>
        {
          rows.map(row => (
            <tr>
              {row.map(col => (
                <>
                  <th className="text-left">{col.label}</th>
                  <td colSpan={col.span}>{col.children}</td>
                </>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );

}

export default Descriptions
