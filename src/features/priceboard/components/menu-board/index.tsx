import MenuBoard from "./MenuBoard";

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function MenuDashboard(props: Props) {
  const { active, onChange } = props;

  // const [isOpenConfig, setIsOpenConfig] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between">
      <MenuBoard active={active} onChange={onChange} />
      <div className="flex flex-row gap-1 items-center">
        {/* <FormSearchStock active={active} /> */}
      </div>
    </div>
  );
}
