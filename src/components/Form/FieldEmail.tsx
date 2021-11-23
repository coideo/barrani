import React, { FC } from "react";
import { PartialBy } from "types";

import { FieldProps } from "./Field";
import FieldInput, { FieldInputProps } from "./FieldInput";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const FieldEmail: FC<PartialBy<FieldProps, "name"> & FieldInputProps> = ({
  name = "email",
  ...props
}) => (
  <FieldInput
    label="Email"
    name={name}
    pattern={{
      value: EMAIL_REGEX,
      message: "Email inválido",
    }}
    type="text"
    {...props}
  />
);

export default FieldEmail;
