import Combobox, { ComboboxProps } from "components/Combobox";
import React from "react";
import { Controller } from "react-hook-form";

import Field, { FieldProps } from "./Field";

type Props<TType> = Omit<ComboboxProps<TType>, "onChange" | "value">;

function FieldCombobox<TType>({ displayValue, onSearch, ...props }: FieldProps & Props<TType>) {
  return (
    <Field
      render={({ name, rules, ...p }) => (
        <Controller
          {...{ name, rules }}
          render={({ field }) => (
            <Combobox<TType> displayValue={displayValue} onSearch={onSearch} {...field} {...p} />
          )}
        />
      )}
      {...props}
    />
  );
}

FieldCombobox.Item = Combobox.Item;
FieldCombobox.List = Combobox.List;

export default FieldCombobox;
