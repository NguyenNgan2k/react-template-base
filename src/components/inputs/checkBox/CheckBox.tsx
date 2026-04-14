import clsx from 'clsx';
import { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  iClassName?: string;
};

const CheckBox = forwardRef<HTMLInputElement, Props>(
  ({ iClassName, ...rest }) => {
    return (
      <input
        type='checkbox'
        {...rest}
        className={clsx(
          iClassName,
          'form-control',
          rest.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-yellow-500! hover:bg-neutral-800',
        )}
      />
    );
  });

export default CheckBox;
