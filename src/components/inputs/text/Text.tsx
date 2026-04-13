import type { ErrorInput } from '@/types';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { FaRegCopy } from "react-icons/fa6";
import { toast } from 'react-toastify';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  iClassName?: string;
  copyable?: boolean
  error?: ErrorInput;
  showErrorMessage?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, iClassName, copyable, error, showErrorMessage = false, prefixIcon, suffixIcon, ...rest }, ref) => {

    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    const handleCopy = async () => {
      const value = innerRef.current?.value;
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        toast.success('Copied!');
      } catch {
        toast.error('Copy failed');
      }
    };

    return (
      <div className={clsx('w-full flex flex-col gap-1 relative', className)}>
        <input
          ref={innerRef}
          {...rest}
          className={clsx(
            iClassName,
            'form-control',
            rest.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-yellow-500! hover:bg-neutral-800',
            error && 'border-red-500!',
            copyable && 'pr-7!',
            prefixIcon && 'pl-7!',
            suffixIcon && 'pr-7!',
          )}
          autoComplete="off"
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
        {
          copyable && <FaRegCopy className="absolute right-3 top-1/2 -translate-y-1/2 cursor-copy" onClick={handleCopy} />
        }
        {showErrorMessage && error && error.message && (
          <span className="text-red-500 text-xs font-medium">
            * {error.message}
          </span>
        )}
      </div>
    );
  });

export default Input;
