import clsx from "clsx";

interface Props<T extends string> {
  tabs: ReadonlyArray<{ value: T; label: string }>
  tabActive: T
  handleChangeTab: (tab: T) => void
  mode?: "navigation" | ""
}

function Tab<T extends string>({
  tabs,
  tabActive,
  handleChangeTab,
  mode,
}: Props<T>) {

  return (
    <>
      {
        mode === 'navigation' ? (
          <div className="w-full h-10 px-1 flex items-center gap-4 bg-bg-surface-strong" >
            {
              tabs && !!tabs.length && tabs.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "px-2 h-8 flex items-center justify-center cursor-pointer",
                    tabActive === item?.value && 'font-bold text-white border-b border-bd-default'
                  )}
                  onClick={() => handleChangeTab(item?.value)}
                >
                  {item?.label}
                </div>
              ))
            }
          </div >
        ) : (
          <div className="w-64 h-10 px-1 rounded-xl flex items-center border" >
            {
              tabs && !!tabs.length && tabs.map((item, index) => (
                <div
                  key={index}
                  className={"w-1/2 h-8 flex items-center justify-center rounded-xl cursor-pointer " + (tabActive === item?.value && 'bg-DTND-500')}
                  onClick={() => handleChangeTab(item?.value)}
                >
                  {item?.label}
                </div>
              ))
            }
          </div >
        )
      }
    </>
  );
}

export default Tab;
