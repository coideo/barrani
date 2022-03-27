import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "utils/class-names";

const ErrorIcon = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
  </div>
);

const Pend: FC<{ className: string }> = ({ className, children }) => (
  <span
    className={cn(
      className,
      "inline-flex items-center border border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm",
    )}
  >
    {children}
  </span>
);

const Icon: FC<{ className: string }> = ({ className, children }) => (
  <div className={cn(className, "pointer-events-none absolute inset-y-0 flex items-center")}>
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
    type = "text",
    withError = false,
    ...props
  },
  ref,
) => {
  return (
    <div className={cn(containerClass, "flex shadow-sm")}>
      {prepend ? <Pend className="rounded-l-md border-r-0">{prepend}</Pend> : null}
      <div className="relative w-full">
        {icon && <Icon className="left-0 pl-3">{icon}</Icon>}
        <input
          ref={ref}
          aria-describedby={withError && name ? `${name}-error` : undefined}
          aria-invalid={withError ? "true" : "false"}
          autoComplete="off"
          className={cn(
            className,
            "block w-full flex-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm",
            !!icon && "pl-10",
            (withError || !!rightIcon) && (withError && !!rightIcon ? "pr-14" : "pr-10"),
            isDirty && "",
            append && prepend
              ? "rounded-none"
              : append
              ? "rounded-none rounded-l-md"
              : prepend
              ? "rounded-none rounded-r-md"
              : "rounded-md",
            withError
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          )}
          id={name}
          name={name}
          type={type}
          {...props}
        />
        {rightIcon && (
          <Icon className={cn("right-0", withError ? "pr-8" : "pr-3")}>{rightIcon}</Icon>
        )}
        {withError ? <ErrorIcon /> : null}
      </div>
      {append ? <Pend className="rounded-r-md border-l-0">{append}</Pend> : null}
    </div>
  );
};

export default forwardRef(Input);
