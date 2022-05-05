import React from "react";
import { Controller } from "react-hook-form";

import Switch, { SwitchProps } from "../Switch";

const FieldSwitch = ({
  name,
  required,
  ...props
}: {
  disabled?: boolean;
  required?: boolean;
  name: string;
  className?: SwitchProps["className"];
}) => (
  <Controller
    name={name}
    render={({ field: { value, ...field } }) => <Switch checked={value} {...field} {...props} />}
    rules={{ required: required === true ? "Required" : required }}
  />
);

FieldSwitch.Group = Switch.Group;
FieldSwitch.Label = Switch.Label;

export default FieldSwitch;
