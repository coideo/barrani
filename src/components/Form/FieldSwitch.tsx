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
    {...{ name, rules: { required: required === true ? "Required" : required } }}
    render={({ field: { value, ...field } }) => <Switch checked={value} {...field} {...props} />}
  />
);

FieldSwitch.Group = Switch.Group;
FieldSwitch.Label = Switch.Label;

export default FieldSwitch;
