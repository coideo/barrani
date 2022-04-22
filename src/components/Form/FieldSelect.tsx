import React from "react";
import { Controller } from "react-hook-form";

import Select, { SelectProps } from "../Select";

import Field, { FieldProps } from "./Field";

type Props<TType> = Omit<SelectProps<TType>, "onChange" | "value">;

function FieldSelect<TType>({ displayValue, ...props }: FieldProps & Props<TType>) {
  return (
    <Field
      render={({ name, rules, ...p }) => (
        <Controller
          {...{ name, rules }}
          render={({ field }) => <Select displayValue={displayValue} {...field} {...p} />}
        />
      )}
      {...props}
    />
  );
}

FieldSelect.Item = Select.Item;

export default FieldSelect;
