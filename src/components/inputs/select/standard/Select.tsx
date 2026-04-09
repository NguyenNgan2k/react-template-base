import type { ErrorInput, Option } from "@/types";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import clsx from 'clsx';


type Props = {
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  className?: string;
  iClassName?: string;
  placeholder?: string;
  error?: ErrorInput;
  disabled?: boolean;
  mode?: 'full' | 'value' | 'label'
};

const Select = ({
  className,
  iClassName,
  placeholder,
  disabled,
  error,
  value,
  onChange,
  options,
  mode = 'full',
}: Props) => {
  const [showSelect, setShowSelect] = useState(false);
  const [txtSearch, setTxtSearch] = useState<string>();
  const showRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showRef.current && !showRef.current.contains(event.target as Node)) {
        setShowSelect(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      const selected = _.find(options, (o) => o.value === value);
      if (selected) {
        if (mode === 'label') {
          setTxtSearch(selected.label);
        } else setTxtSearch(selected.value);
      }
    } else {
      setTxtSearch(placeholder || "Chọn");
    }
  }, [value]);

  const handleSelect = (val: string) => {
    setShowSelect(false);
    if (val === value) return;
    onChange?.(val);
  };

  return (
    <div ref={showRef} className={clsx('relative', className)} >
      <div
        className={clsx(
          iClassName,
          'form-control',
          disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-yellow-500! hover:bg-neutral-800',
          showSelect ? "border-yellow-500" : "border-neutral-700",
          error && "border-red-500!",
        )}
        onClick={() => !disabled && setShowSelect((s) => !s)}
      >
        <span>{txtSearch || placeholder || ""}</span>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${showSelect ? "rotate-180" : ""
            }`}
        />
      </div>
      {
        showSelect && (
          <ul className="absolute w-full max-h-60 p-2 left-0 mt-1 top-full z-20 bg-bg-elevated rounded-lg border border-none">
            {options && options.length ? (
              options.map((item) => {
                return (
                  <li
                    key={item.value}
                    onClick={() => handleSelect(item.value)}
                    className={clsx(
                      'p-1 mb-1 rounded-md flex items-center cursor-pointer',
                      value === item.value ? "bg-bg-elevated-active" : "hover:bg-bg-elevated-active",
                      item.disabled && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    {mode === "full" && (
                      <>
                        <span className="w-1/3">{item?.value}</span>
                        <span className="flex-1">{item?.label}</span>
                      </>
                    )}
                    {mode !== "full" && (
                      <span className="flex-1">
                        {item?.[mode]}
                      </span>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="text-xs text-center">Không có dữ liệu</li>
            )}
          </ul>
        )
      }
      {error && <p className="text-red-500 text-xs mt-1">*{error.message}</p>}
    </div >
  );
};
export default Select;
