import clsx from 'clsx';
import type { ErrorInput } from '@/types';
import { IMaskInput } from 'react-imask';

type Props = {
  name: string
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  className?: string;
  iClassName?: string;
  error?: ErrorInput;
  showErrorMessage?: boolean;
  disabled?: boolean;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode
  maxLength?: number;
};

const IMask = ({
  name,
  value,
  onChange,
  className,
  iClassName,
  error,
  showErrorMessage = true,
  disabled,
  placeholder,
  onBlur,
  prefixIcon,
  suffixIcon,
  maxLength
}: Props) => {
  return (
    <div className={clsx('w-full flex flex-col gap-1 relative', className)}>
      <IMaskInput
        name={name}
        className={clsx(
          'form-control',
          iClassName,
          disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:border-yellow-500! hover:bg-neutral-800',
          error && 'border-red-500!',
          prefixIcon && 'pl-7!',
          suffixIcon && 'pr-7!',
        )}
        value={value}
        onAccept={(val) => onChange?.(String(val))}
        mask={Number}
        radix="."
        unmask
        scale={0}
        thousandsSeparator=","
        placeholder={placeholder}
        disabled={disabled}
        min={0}
        maxLength={maxLength || 19}
        onBlur={onBlur}
      />
      <div>
        {prefixIcon &&
          <span className='p-1 h-6 w-6 absolute left-0 top-0.5 border-r border-bd-default cursor-pointer'>
            {prefixIcon}
          </span>}
        {suffixIcon &&
          <span className='p-1 h-6 w-6 absolute right-0 top-0.5 border-l border-bd-default cursor-pointer'>
            {suffixIcon}
          </span>
        }
      </div>
      {showErrorMessage && error?.message && (
        <span className="text-red-500 text-xs font-medium">
          * {error.message}
        </span>
      )}
    </div>
  );
};

export default IMask;

