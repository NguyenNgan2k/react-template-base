import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";
import { format, parse } from "date-fns";
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import type { ErrorInput } from "@/types";

const DATE_DD_MM_YYYY_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;


type Props = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>
  className?: string;
  iClassName?: string;
  placeholder?: string;
  error?: ErrorInput;
  disabled?: boolean;
};

const DatePicker = ({
  className,
  iClassName,
  placeholder,
  disabled,
  error,
  value,
  onChange,
  onBlur,
}: Props
) => {
  const showRef = useRef<HTMLDivElement>(null);
  const [showSelect, setShowSelect] = useState(false);
  const [selected, setSelected] = useState<Date>();
  const [month, setMonth] = useState<Date>(new Date());

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
    if (!value) return
    handleInputChange(value)
  }, [value]);

  const handleSelect = (val?: Date) => {
    if (!val) return;
    const formatted = format(val, "dd/MM/yyyy");
    if (formatted === value) return;

    setSelected(val);
    onChange?.(formatted);
  };


  const handleInputChange = (
    val: string
  ) => {
    onChange?.(val);

    if (DATE_DD_MM_YYYY_REGEX.test(val)) {
      const parsed = parse(val, "dd/MM/yyyy", new Date(), {
        locale: vi,
      });
      if (!isNaN(parsed.getTime())) {
        setSelected(parsed);
        setMonth(parsed);
      } else {
        setSelected(undefined);
        setMonth(new Date());
      }
    } else {
      setSelected(undefined);
      setMonth(new Date());
    }
  };

  return (
    <div ref={showRef} className={clsx('flex flex-col gap-1 relative', className)}>
      <input
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          iClassName,
          'form-control',
          disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-yellow-500! hover:bg-neutral-800',
          error && 'border-red-500!'
        )}
        autoComplete="off"
        onClick={() => !disabled && setShowSelect((s) => !s)}
      />
      {
        showSelect &&
        <div className="p-2 absolute left-0 mt-1 top-full z-20 bg-dark-blue rounded-lg border border-none">
          <DayPicker
            animate
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            locale={vi}
            formatters={{
              formatCaption: (date) =>
                `Tháng ${format(date, "MM")} / ${format(date, "yyyy")}`,
            }}
          />
        </div>
      }
      {
        error && error.message && (
          <span className="text-red-500 text-xs font-medium">
            * {error.message}
          </span>
        )
      }
    </div >
  )
}
export default DatePicker