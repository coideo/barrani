import React, { FC, TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from 'utils/class-names';
import Field, { FieldComponentProps, FieldProps } from './Field';

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'pattern' | 'required' | 'name' | 'min' | 'max' | 'maxLength' | 'minLength'
>;

const TextArea: FC<TextAreaProps & FieldComponentProps> = ({
  className,
  name,
  rules,
  withError,
  ...props
}) => {
  const { register } = useFormContext();

  return (
    <textarea
      aria-describedby={withError ? `${name}-error` : undefined}
      aria-invalid={withError ? 'true' : 'false'}
      aria-required={!!rules.required}
      autoComplete="off"
      className={cn(
        className,
        'block w-full sm:text-sm rounded-md shadow-sm',
        withError
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
      )}
      id={name}
      {...register(name, rules)}
      rows={5}
      {...props}
    />
  );
};

const FieldTextArea = (props: FieldProps & TextAreaProps) => (
  <Field component={TextArea} {...props} />
);

export default FieldTextArea;
