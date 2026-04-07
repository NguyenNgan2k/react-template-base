import { useState } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";

type CheckboxProps = {
  label?: string;
  error?: FieldError;
  txtError?: string;
  registration?: UseFormRegisterReturn;
  className?: string;
  classNameLabel?: string;
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function CheckboxField({
  label,
  error,
  txtError,
  registration,
  className = "",
  classNameLabel = "",
  required = false,
  disabled = false,
  defaultChecked = false,
  onChange,
}: CheckboxProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    if (disabled) return;
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  const hasError = !!error || !!txtError;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        {/* Checkbox custom */}
        <div className="relative">
          <input
            type="checkbox"
            className="absolute opacity-0 w-0 h-0"
            checked={checked}
            onChange={() => { }}
            disabled={disabled}
            {...registration}
          />

          <div
            onClick={handleClick}
            className={`
              w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              } ${checked
                ? "bg-DTND-600 border-transparent"
                : "bg-input border-text-subtitle hover:border-DTND-600"
              } ${hasError ? "border-red-500!" : ""} ${className}
            `}
          >
            {checked && (
              <IoCheckmark
                size={14}
                className="text-background-primary font-bold"
              />
            )}
          </div>
        </div>

        {/* Label */}
        {label && (
          <label
            onClick={handleClick} // click vào label cũng toggle
            className={`${classNameLabel} text-sm font-medium text-text-title select-none ${disabled ? "opacity-60" : "cursor-pointer"
              }
            `}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <span className="text-red-500 text-xs font-medium ml-8">
          * {error?.message || txtError}
        </span>
      )}
    </div>
  );
}
