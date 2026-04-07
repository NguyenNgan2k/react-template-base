import { type ForwardedRef, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { type FieldError } from "react-hook-form";
import { IoCalendarOutline } from "react-icons/io5";

type DateInputFieldProps = {
  label?: string;
  placeholder?: string;
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  error?: FieldError;
  txtError?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

type CustomDateInputProps = {
  placeholder?: string;
  error?: FieldError;
  txtError?: string;
  className?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomDateInput = forwardRef(
  (
    {
      placeholder,
      error,
      txtError,
      className,
      disabled,
      ...rest
    }: CustomDateInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className="relative">
      <input
        {...rest}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl bg-input text-sm font-medium text-text-title placeholder:text-text-subtitle focus:outline-none focus:border focus:border-yellow-500 focus:shadow-[0_0_0_2px_rgba(250,204,21,0.3)] caret-yellow-500 ${
          error || txtError ? "border border-red-500" : ""
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-text"} ${
          className ?? ""
        }`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtitle pointer-events-none">
        <IoCalendarOutline size={22} />
      </span>
    </div>
  )
);

CustomDateInput.displayName = "CustomDateInput";

export default function DateInputField({
  label,
  placeholder = "dd/MM/yyyy",
  selectedDate,
  onDateChange,
  error,
  txtError,
  className = "",
  required,
  disabled,
}: DateInputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-sm text-text-title">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        customInput={
          <CustomDateInput
            placeholder={placeholder}
            error={error}
            txtError={txtError}
            className={className}
            disabled={disabled}
          />
        }
        dateFormat="dd/MM/yyyy" // Hiển thị trong input
        placeholderText={placeholder}
        showPopperArrow={false}
        disabled={disabled}
        popperClassName="z-50"
        autoComplete="off"
        formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
      />

      {(error || txtError) && (
        <span className="text-red-500 text-xs font-medium mt-1">
          * {error?.message || txtError}
        </span>
      )}
    </div>
  );
}
