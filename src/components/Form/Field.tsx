import React, { ReactNode } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { cn } from "utils/class-names";

import Label from "../Label";

import ErrorMsg from "./ErrorMsg";

const HelpInfo = ({ children }: { children: React.ReactNode }) =>
  children ? <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{children}</p> : null;

export type FieldComponentProps = {
  disabled?: boolean;
  isDirty: boolean;
  name: string;
  rules: RegisterOptions;
  withError: boolean;
};

export type FieldProps = {
  disabled?: boolean;
  help?: string;
  label?: string;
  name: string;
  tag?: ReactNode;
  wrapperClass?: string;
} & RegisterOptions;

function Field({
  disabled = false,
  help,
  label: labelText,
  max,
  maxLength,
  min,
  minLength,
  name,
  pattern,
  render,
  required = false,
  setValueAs,
  shouldUnregister,
  tag,
  validate,
  valueAsDate,
  valueAsNumber,
  wrapperClass,
  ...props
}: FieldProps & { render: (props: FieldComponentProps) => ReactNode }) {
  const { formState } = useFormContext();
  const isDirty = Object.keys(formState.dirtyFields).includes(name);
  const withError = formState.errors[name];

  const label =
    tag && labelText ? (
      <div className="flex justify-between">
        <Label htmlFor={name}>{labelText}</Label>
        <span className="text-sm text-gray-500 dark:text-gray-400">{tag}</span>
      </div>
    ) : labelText ? (
      <Label htmlFor={name}>{labelText}</Label>
    ) : null;

  return (
    <div className={cn("space-y-1", withError && "motion-safe:animate-shake", wrapperClass)}>
      {label}
      {render({
        disabled: formState.isSubmitting || disabled,
        isDirty,
        name,
        rules: {
          max: typeof max === "number" ? { value: max, message: `max ${max}` } : max,
          maxLength:
            typeof maxLength === "number"
              ? { value: maxLength, message: `max length ${maxLength}` }
              : maxLength,
          min: typeof min === "number" ? { value: min, message: `min ${min}` } : min,
          minLength:
            typeof minLength === "number"
              ? { value: minLength, message: `min length ${minLength}` }
              : minLength,
          pattern,
          required: required === true ? "Required" : required,
          setValueAs,
          shouldUnregister,
          validate,
          valueAsDate,
          valueAsNumber,
        },
        withError,
        ...props,
      })}
      <HelpInfo>{help}</HelpInfo>
      <ErrorMsg className="mt-2" name={name} />
    </div>
  );
}

export default Field;
