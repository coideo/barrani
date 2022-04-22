import React from "react";
import { useController } from "react-hook-form";

import Switch, { SwitchProps } from "../Switch";

import { FieldProps } from "./Field";

const FieldSwitch = ({ name, rules, ...props }: FieldProps & Omit<SwitchProps, "checked">) => {
  const {
    field: { value, ...field },
  } = useController({ name, rules });

  return <Switch checked={value} {...field} {...props} />;
};

FieldSwitch.Group = Switch.Group;
FieldSwitch.Label = Switch.Label;

export default FieldSwitch;
