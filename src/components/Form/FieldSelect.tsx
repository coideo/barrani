import React from "react";
import { Controller, ControllerProps } from "react-hook-form";

import Select, { SelectProps } from "../Select";

import Field, { FieldProps } from "./Field";

type Props<TType> = Omit<SelectProps<TType>, "onChange" | "value"> & {
  defaultValue?: ControllerProps["defaultValue"];
};

function FieldSelect<TType>({ displayValue, onChange, ...props }: FieldProps & Props<TType>) {
  return (
    <Field
      render={({ name, rules, ...p }) => (
        <Controller
          name={name}
          render={({ field: { ref: _ref, onChange: controllerOnChange, ...field } }) => (
            <Select<TType>
              displayValue={displayValue}
              onChange={(value) => {
                onChange?.(value);
                controllerOnChange(value);
              }}
              {...field}
              {...p}
            />
          )}
          rules={rules}
        />
      )}
      {...props}
    />
  );
}

FieldSelect.Item = Select.Item;

export default FieldSelect;
