import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from 'utils/class-names';
import ErrorMsg from './ErrorMsg';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  color: string;
  help?: string;
  label?: string;
  name: string;
  wrapperClass?: string;
};

const FieldCheckbox = ({
  color,
  help,
  label,
  name,
  required,
  wrapperClass,
  ...props
}: CheckboxProps) => {
  const { errors, register } = useFormContext();
  const isError = errors[name];

  return (
    <div
      className={cn(
        wrapperClass,
        'relative flex items-start',
        isError && 'motion-safe:animate-shake'
      )}
    >
      <div className="flex items-center h-5">
        <input
          aria-label={label}
          className={cn(
            color,
            'w-4 h-4 border-gray-300 rounded',
            isError && 'border-red-600 focus:ring-red-500 focus:border-red-600'
          )}
          id={name}
          name={name}
          ref={register({ required: required === true ? 'Requerido' : required })}
          type="checkbox"
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
        {help ? <p className="text-gray-500">{help}</p> : null}
        <ErrorMsg name={name} />
      </div>
    </div>
  );
};

export default FieldCheckbox;
