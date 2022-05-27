import React from "react";
import { Controller, ControllerProps } from "react-hook-form";

import Select, { SelectProps } from "../Select";

import Field, { FieldProps } from "./Field";

type Props<TType> = Omit<SelectProps<TType>, "onChange" | "value"> & {
  defaultValue?: ControllerProps["defaultValue"];
};

function FieldSelect<TType>({ displayValue, ...props }: FieldProps & Props<TType>) {
  return (
    <Field
      render={({ name, rules, ...p }) => (
        <Controller
          name={name}
          render={({ field: { ref: _ref, ...field } }) => (
            <Select<TType> displayValue={displayValue} {...field} {...p} />
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
