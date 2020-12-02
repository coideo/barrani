import React, { FC } from 'react';
import { RegisterOptions, useFormContext, ValidationRule } from 'react-hook-form';
import { cn } from 'utils/class-names';
import Label from '../Label';
import ErrorMsg from './ErrorMsg';

const registerValidation = {
  min: (value: number) => `mínimo ${value}`,
  max: (value: number) => `máximo ${value}`,
  minLength: (value: number) => `mínimo ${value} caracteres`,
  maxLength: (value: number) => `máximo ${value} caracteres`,
};

const tv = (
  key: keyof Omit<typeof registerValidation, 'required'>,
  value?: ValidationRule<number | string>
) => (typeof value === 'number' ? { value, message: registerValidation[key](value) } : value);

const HelpInfo: FC = ({ children }) =>
  children ? <p className="mt-2 text-sm text-gray-500">{children}</p> : null;

export type FieldComponentProps = {
  disabled?: boolean;
  defaultValue?: string;
  isDirty: boolean;
  name: string;
  rules: RegisterOptions;
  withError: boolean;
};

export type FieldProps = {
  disabled?: boolean;
  defaultValue?: string;
  help?: string;
  label?: string;
  name: string;
  wrapperClass?: string;
  tag?: string;
} & RegisterOptions;

const Field = ({
  component: Component,
  disabled = false,
  help,
  label: labelText,
  max,
  maxLength,
  min,
  minLength,
  name,
  pattern,
  required,
  tag,
  validate,
  wrapperClass,
  ...props
}: FieldProps & { component: FC<FieldComponentProps> }) => {
  const { errors, formState } = useFormContext();
  const isDirty = Object.keys(formState.dirtyFields).includes(name);
  const withError = errors[name];

  const label =
    tag && labelText ? (
      <div className="flex justify-between">
        <Label htmlFor={name}>{labelText}</Label>
        <span className="text-sm text-gray-500">{tag}</span>
      </div>
    ) : labelText ? (
      <Label htmlFor={name}>{labelText}</Label>
    ) : null;

  return (
    <div className={cn('space-y-1', withError && 'motion-safe:animate-shake', wrapperClass)}>
      {label}
      <Component
        disabled={formState.isSubmitting || disabled}
        isDirty={isDirty}
        withError={withError}
        name={name}
        rules={{
          required: required === true ? 'Requerido' : required,
          min: tv('min', min),
          max: tv('max', max),
          minLength: tv('minLength', minLength),
          maxLength: tv('maxLength', maxLength),
          pattern,
          validate,
        }}
        {...props}
      />
      <HelpInfo>{help}</HelpInfo>
      <ErrorMsg className="mt-2" name={name} />
    </div>
  );
};

export default Field;
