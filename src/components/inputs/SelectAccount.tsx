import type { ListAccountItem } from "@/types";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { type FieldError } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import clsx from 'clsx';

type Props = {
  className?: string;
  iClassName?: string;
  placeholder?: string;
  error?: FieldError;
  disabled?: boolean;
  value?: string;
  name?: string;
  options: ListAccountItem[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: string) => void;
};

const CustomSelect = ({
  className,
  iClassName,
  placeholder,
  disabled,
  error,
  value,
  onChange,
  onSelect,
  options,
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
      const selected = _.find(options, (o) => o.acccode === value);
      if (selected) setTxtSearch(clsx('TK', '-', selected.acccode, '(', selected.acctype, ')'));
    } else {
      setTxtSearch(placeholder || "Chọn");
    }
  }, [value]);

  useEffect(() => {
    if (options) {
      onChange?.({
        target: { value: options[0]?.acccode },
      } as React.ChangeEvent<HTMLInputElement>);
      onSelect?.(options[0]?.acccode || "")
    }
  }, [options]);

  const handleSelect = (val: string) => {
    setShowSelect(false);
    onChange?.({
      target: { value: val },
    } as React.ChangeEvent<HTMLInputElement>);
    onSelect?.(val)
  };

  return (
    <div ref={showRef} className={clsx('relative min-w-40 ', className)} >
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
        <span>{txtSearch ? txtSearch : placeholder || ""}</span>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${showSelect ? "rotate-180" : ""
            }`}
        />
      </div>
      {
        showSelect && (
          <ul className="absolute w-full max-h-60 p-2 left-0 mt-1 top-full z-20 bg-dark-blue rounded-lg border border-none shadow-lg animate-fadeInDown">
            {options && options.length ? (
              options.map((item) => {
                return (
                  <li
                    key={item?.acccode}
                    onClick={() => handleSelect(item?.acccode || '')}
                    className={clsx(
                      'p-2 mb-1 rounded-md flex items-center cursor-pointer',
                      value === item?.acccode ? "bg-DTND-500" : "hover:bg-DTND-500",
                      disabled && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    <span>{clsx('TK', '-', item.acccode, '(', item.acctype, ')')}</span>
                  </li>
                );
              })
            ) : (
              <li className="text-center">Không có dữ liệu</li>
            )}
          </ul>
        )
      }
      {error && <p className="text-red-500 mt-1">*{error?.message}</p>}
    </div >
  );
};
export default CustomSelect;
