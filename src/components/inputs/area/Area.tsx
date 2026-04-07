import type { ErrorInput } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  iClassName?: string;
  error?: ErrorInput;
};

const IArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, iClassName, error, ...rest }, ref) => (
    <div className={clsx('w-full flex flex-col gap-1', className)}>
      <textarea
        ref={ref}
        {...rest}
        autoComplete="off"
        className={clsx(
          'form-control h-16! resize-none',
          iClassName,
          rest.disabled
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:border-yellow-500! hover:bg-neutral-800',
          error && 'border-red-500!'
        )}
      />
      {error?.message && (
        <span className="text-red-500 text-xs font-medium">
          * {error.message}
        </span>
      )}
    </div>
  )
);

export default IArea;
