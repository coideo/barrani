import Combobox, { ComboboxProps } from "components/Combobox";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

import Field, { FieldComponentProps, FieldProps } from "./Field";

type Props = Omit<
  ComboboxProps,
  "pattern" | "required" | "name" | "min" | "max" | "maxLength" | "minLength" | "as" | "onFocus"
>;

const ControllerCombobox: FC<FieldComponentProps & Props> = ({ name, ...props }) => (
  <Controller name={name} render={({ field }) => <Combobox id={name} {...field} {...props} />} />
);

const FieldCombobox = (props: FieldProps & Props) => (
  <Field component={ControllerCombobox} {...props} />
);

FieldCombobox.Item = Combobox.Item;
FieldCombobox.List = Combobox.List;

export default FieldCombobox;
