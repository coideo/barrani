import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import Input, { InputProps } from "../Input";

import Field, { FieldComponentProps, FieldProps } from "./Field";

export type FieldInputProps = Omit<
  InputProps,
  "pattern" | "required" | "name" | "min" | "max" | "maxLength" | "minLength"
>;

const FieldInputComponent: FC<FieldInputProps & FieldComponentProps> = ({
  rules,
  name,
  ...props
}) => {
  const { register } = useFormContext();

  return <Input {...register(name, rules)} {...props} />;
};

const FieldInput = (props: FieldProps & FieldInputProps) => (
  <Field render={(p) => <FieldInputComponent {...p} />} {...props} />
);

export default FieldInput;
