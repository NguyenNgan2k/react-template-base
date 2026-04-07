interface Props {
  children: React.ReactNode;
  title?: any
}

function PageLayout({ children, title }: Props) {
  return (
    <div
      className="flex flex-col w-full h-full p-4 gap-4 bg-surface rounded-xl"
    >
      <p className="text-sm font-semibold">{title}</p>
      {children}
    </div >
  );
}

export default PageLayout;