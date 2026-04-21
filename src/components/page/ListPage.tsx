import clsx from "clsx";

type ListPageProps = {
  children: React.ReactNode;
  className?: string
};

const ListPage = ({ children, className }: ListPageProps) => {
  return (
    <div className={clsx("flex flex-col h-full", className)}>
      {children}
    </div>
  );
};

ListPage.Search = ({ children }: { children: React.ReactNode }) => (
  <div className="shrink-0 h-8">
    {children}
  </div>
);

ListPage.Table = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={clsx("flex-1", className)}>
    {children}
  </div >
);

ListPage.Paging = ({ children }: { children?: React.ReactNode }) => (
  <div className="shrink-0 h-9 mt-auto p-1">
    {children}
  </div>
);

export default ListPage