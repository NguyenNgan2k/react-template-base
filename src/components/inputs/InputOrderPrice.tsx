import IMask, { InputMask, type MaskedNumberOptions } from "imask";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { FieldError } from "react-hook-form";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MARKET_ORDERS } from "../../configs";
import type { MarketOrder } from "../../utils";

export interface InputOrderPriceProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  error?: FieldError | { message: string };
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  step?: number;
  min?: number;
  max?: number;
}

function InputOrderPrice({
  label,
  placeholder = "0",
  error,
  value = "",
  onChange,
  className,
  required = false,
  step = 0.1,
  min = 0,
  max = Infinity,
  name,
  id,
}: InputOrderPriceProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<InputMask<MaskedNumberOptions> | null>(null);
  const [isMarketOrder, setIsMarketOrder] = useState(false);

  // Kiểm tra xem giá trị hiện tại có phải là lệnh thị trường không
  useEffect(() => {
    const trimmed = value.trim().toUpperCase();
    const isMarket = MARKET_ORDERS.includes(trimmed as MarketOrder);
    setIsMarketOrder(isMarket);
  }, [value]);

  // Setup IMask chỉ khi là lệnh số
  useEffect(() => {
    if (!inputRef.current) return;

    maskRef.current?.destroy();
    maskRef.current = null;

    if (isMarketOrder) {
      inputRef.current.value = value;
      return;
    }

    // Lệnh giới hạn
    maskRef.current = IMask(inputRef.current, {
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
      scale: 3,
      min,
      max,
      padFractionalZeros: false,
      normalizeZeros: true,
    });

    // Đồng bộ giá trị ban đầu
    if (value) {
      maskRef.current.value = value;
    }

    const handleAccept = () => {
      const unmasked = maskRef.current?.unmaskedValue ?? "";
      onChange?.(unmasked);
    };

    maskRef.current.on("accept", handleAccept);

    return () => {
      maskRef.current?.off("accept", handleAccept);
      maskRef.current?.destroy();
    };
  }, [isMarketOrder, value, onChange, min, max]);

  const handleIncrement = useCallback(() => {
    if (isMarketOrder || !inputRef.current) return;

    const currentStr = inputRef.current.value.replace(/,/g, "");
    const current = parseFloat(currentStr) || 0;
    const newValue = Math.min(current + step, max);
    const formatted = Number(newValue.toFixed(3)).toString();

    onChange?.(formatted);
  }, [isMarketOrder, step, max, onChange]);

  const handleDecrement = useCallback(() => {
    if (isMarketOrder || !inputRef.current) return;

    const currentStr = inputRef.current.value.replace(/,/g, "");
    const current = parseFloat(currentStr) || 0;
    const newValue = Math.max(current - step, min);
    const formatted = Number(newValue.toFixed(3)).toString();

    onChange?.(formatted);
  }, [isMarketOrder, step, min, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const upper = inputValue.trim().toUpperCase();

    // Tự động phát hiện chuyển trạng thái
    if (MARKET_ORDERS.includes(upper as MarketOrder)) {
      setIsMarketOrder(true);
    } else if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      setIsMarketOrder(false);
    }

    onChange?.(inputValue);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-sm text-text-title">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="flex flex-row items-center justify-between gap-2">
        <input
          ref={inputRef}
          id={id ?? name}
          name={name}
          type="text"
          placeholder={placeholder}
          className={`${
            className ?? ""
          } px-1 bg-input text-sm font-medium text-text-title placeholder:text-text-subtitle w-3/4 ${
            error ? "border! border-red-500!" : ""
          }`}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <div className="flex flex-row gap-2 w-1/4 items-center justify-end">
          {!isMarketOrder && (
            <>
              <button
                type="button"
                onClick={handleDecrement}
                className="h-7 w-7 bg-gray-300 hover:bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer transition-colors"
                disabled={Number(maskRef.current?.unmaskedValue || 0) <= min}
              >
                <FiMinus className="text-text-title" />
              </button>

              <button
                type="button"
                onClick={handleIncrement}
                className="h-7 w-7 bg-gray-300 hover:bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer transition-colors"
                disabled={Number(maskRef.current?.unmaskedValue || 0) >= max}
              >
                <FiPlus className="text-text-title" />
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <span className="text-red-500 text-xs font-medium">
          * {error.message}
        </span>
      )}
    </div>
  );
}

export default memo(InputOrderPrice);
