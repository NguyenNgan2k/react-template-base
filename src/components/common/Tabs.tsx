import clsx from "clsx";

interface Props<T extends string> {
  tabs: ReadonlyArray<{ value: T; label: string }>
  tabActive: T
  handleChangeTab: (tab: T) => void
  className?: string
}

function Tab<T extends string>({
  tabs,
  tabActive,
  handleChangeTab,
  className
}: Props<T>) {

  return (
    <div className={clsx("h-10 px-1 flex items-center gap-4 bg-bg-surface", className)} >
      {
        tabs && !!tabs.length && tabs.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "h-8 flex items-center justify-center rounded-xl cursor-pointer text-text-subtitle",
              tabActive === item?.value && 'text-white font-bold'
            )}
            onClick={() => handleChangeTab(item?.value)}
          >
            {item?.label}
          </div>
        ))
      }
    </div >
  );
}

export default Tab;
