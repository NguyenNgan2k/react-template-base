import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "close" | "success" | "normal" | "buy" | "sell";
  fullWidth?: boolean;
  isActive?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  isActive = false,
  ...props
}) => {
  const baseStyle =
    "h-7 px-4 py-1.5 rounded font-medium transition-colors duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-btn-bg-default text-text-title disabled:bg-btn-bg-disable disabled:text-text-title",
    secondary:
      "bg-gray-600 text-text-title hover:bg-gray-500 disabled:bg-gray-300 disabled:text-text-title",
    danger:
      "bg-red-400 text-text-title hover:bg-red-300 disabled:bg-gray-300 disabled:text-text-title",
    close:
      "bg-button-gray text-text-title hover:bg-neutral-white-900 disabled:bg-gray-300 disabled:text-text-title",
    success:
      "bg-green-400 text-text-title hover:bg-green-300 disabled:bg-gray-300 disabled:text-text-title",
    normal: clsx(
      'text-text-title border border-yellow-500 disabled:text-text-title disabled:border-btn-bd-disable',
      isActive ? 'bg-btn-bg-active' : ''
    ),
    buy:
      "bg-btn-buy-bg-default text-text-title disabled:bg-gray-300 disabled:text-text-title",
    sell:
      "bg-btn-sell-bg-default text-text-title disabled:bg-gray-300 disabled:text-text-title",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? "w-full" : ""
        } ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
