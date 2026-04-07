import { useState } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

type RadioProps = {
  label?: string;
  value: string; // giá trị của radio này
  name: string; // name chung cho group radio
  error?: FieldError;
  txtError?: string;
  registration?: UseFormRegisterReturn;
  className?: string;
  classNameLabel?: string;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean; // controlled từ bên ngoài (nếu cần)
  defaultChecked?: boolean; // uncontrolled mặc định
  onChange?: (value: string) => void;
};

export default function RadioField({
  label,
  value,
  name,
  error,
  txtError,
  registration,
  className = "",
  classNameLabel = "",
  required = false,
  disabled = false,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
}: RadioProps) {
  // Xác định trạng thái checked
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = () => {
    if (disabled || isChecked) return;
    setInternalChecked(true);
    onChange?.(value);
  };

  const hasError = !!error || !!txtError;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        {/* Radio custom */}
        <div className="relative">
          <input
            type="radio"
            name={name}
            value={value}
            className="absolute opacity-0 w-0 h-0"
            checked={isChecked}
            onChange={() => {}}
            disabled={disabled}
            {...registration}
          />

          <div
            onClick={handleClick}
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all
              ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              ${
                isChecked
                  ? "bg-DTND-500 border-transparent"
                  : "bg-input border-text-subtitle hover:border-DTND-600"
              }
              ${hasError ? "border-red-500" : ""} 
              ${className}
            `}
          >
            {isChecked && <div className="w-3 h-3 bg-white rounded-full" />}
          </div>
        </div>

        {/* Label */}
        {label && (
          <label
            onClick={handleClick}
            className={`${classNameLabel} text-sm font-medium text-text-title select-none ${
              disabled ? "opacity-60" : "cursor-pointer"
            }`}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
      </div>

      {hasError && (
        <span className="text-red-500 text-xs font-medium ml-8">
          * {error?.message || txtError}
        </span>
      )}
    </div>
  );
}
