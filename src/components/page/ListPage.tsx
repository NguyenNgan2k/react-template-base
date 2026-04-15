type ListPageProps = {
  children: React.ReactNode;
};

const ListPage = ({ children }: ListPageProps) => {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
};

ListPage.Search = ({ children }: { children: React.ReactNode }) => (
  <div className="shrink-0 h-8">
    {children}
  </div>
);

ListPage.Table = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1">
    {children}
  </div>
);

ListPage.Paging = ({ children }: { children?: React.ReactNode }) => (
  <div className="shrink-0 h-9 mt-auto p-1">
    {children}
  </div>
);

export default ListPage