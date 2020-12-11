import React, {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from 'utils/class-names';

const ErrorIcon = () => (
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

const Pend: FC<{ className: string }> = ({ className, children }) => (
  <span
    className={cn(
      className,
      'inline-flex items-center px-3 text-gray-500 border border-gray-300 bg-gray-50 sm:text-sm'
    )}
  >
    {children}
  </span>
);

const Icon: FC<{ className: string }> = ({ className, children }) => (
  <div className={cn(className, 'absolute inset-y-0 flex items-center pointer-events-none')}>
    {children}
  </div>
);

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  append?: string;
  containerClass?: string;
  icon?: ReactNode;
  isDirty?: boolean;
  prepend?: string;
  rightIcon?: ReactNode;
  withError?: boolean;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    append,
    className,
    containerClass,
    icon,
    isDirty,
    name,
    prepend,
    rightIcon,
    type = 'text',
    withError = false,
    ...props
  },
  ref
) => {
  return (
    <div className={cn(containerClass, 'relative flex shadow-sm')}>
      {prepend ? <Pend className="border-r-0 rounded-l-md">{prepend}</Pend> : null}
      {icon && <Icon className="left-0 pl-3">{icon}</Icon>}
      <input
        autoComplete="off"
        aria-describedby={withError ? `${name}-error` : undefined}
        aria-invalid={withError ? 'true' : 'false'}
        className={cn(
          className,
          'block w-full flex-1 border-gray-300 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed form-input',
          !!icon && 'pl-10',
          !!rightIcon && 'pr-10',
          isDirty && '',
          append && prepend
            ? 'rounded-none'
            : append
            ? 'rounded-none rounded-l-md'
            : prepend
            ? 'rounded-none rounded-r-md'
            : 'rounded-md',
          withError &&
            'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
        )}
        id={name}
        name={name}
        ref={ref}
        type={type}
        {...props}
      />
      {rightIcon && <Icon className="right-0 pr-3">{rightIcon}</Icon>}
      {append ? <Pend className="border-l-0 rounded-r-md">{append}</Pend> : null}
      {withError ? <ErrorIcon /> : null}
    </div>
  );
};

export default forwardRef(Input);
