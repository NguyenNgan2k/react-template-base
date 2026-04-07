import type { Option } from "@/types";
import { getBankLogo } from "@/utils";
import clsx from "clsx";
import type { ErrorInput } from "@/types";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>
  options: readonly Option[];
  error?: ErrorInput;
};

const CardSelect = ({
  value,
  onChange,
  options,
  error
}: Props) => {

  return (
    <div className="grid grid-cols-5 gap-3">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <div
            key={opt.value}
            onClick={() => onChange?.({
              target: { value: opt.value },
            } as React.ChangeEvent<HTMLInputElement>)}
            className={clsx(
              'cursor-pointer rounded-lg border p-1.5 flex items-center justify-center gap-2',
              active ? 'border-yellow-500' : 'border-gray-200'
            )}
          >
            <span className="w-6 h-6 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${getBankLogo(opt.value || "")})`,
              }} />
            <span>{opt.value}</span>
          </div>
        );
      })}
      {
        error && error.message && (
          <span className="text-red-500 text-xs font-medium">
            * {error.message}
          </span>
        )
      }
    </div >
  );
};
export default CardSelect;
