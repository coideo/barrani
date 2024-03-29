import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "utils/class-names";

import ErrorMsg from "./ErrorMsg";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  help?: string;
  label?: string;
  name: string;
  wrapperClass?: string;
};

const FieldCheckbox = ({ help, label, name, required, wrapperClass, ...props }: CheckboxProps) => {
  const { formState, register } = useFormContext();
  const isError = formState.errors[name];

  return (
    <div
      className={cn(
        wrapperClass,
        "relative flex items-start",
        isError && "motion-safe:animate-shake",
      )}
    >
      <div className="flex h-5 items-center">
        <input
          aria-label={label}
          className={cn(
            "h-4 w-4 rounded text-primary-600",
            isError
              ? "border-red-600 focus:border-red-600 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary-500",
          )}
          id={name}
          type="checkbox"
          {...register(name, { required: required === true ? "Required" : required })}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium text-gray-700 dark:text-gray-300" htmlFor={name}>
          {label}
        </label>
        {help ? <p className="text-gray-500 dark:text-gray-400">{help}</p> : null}
        <ErrorMsg name={name} />
      </div>
    </div>
  );
};

export default FieldCheckbox;
