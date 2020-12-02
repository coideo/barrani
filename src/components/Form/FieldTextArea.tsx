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
  withError,
  name,
  rules,
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
        'focus:ring-indigo-500 focus:border-indigo-500',
        'block w-full border-gray-300 sm:text-sm',
        withError &&
          'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
      )}
      id={name}
      name={name}
      ref={register(rules)}
      rows={5}
      {...props}
    />
  );
};

const FieldTextArea = (props: FieldProps & TextAreaProps) => (
  <Field component={TextArea} {...props} />
);

export default FieldTextArea;
