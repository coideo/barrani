import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { cn } from "utils/class-names";

const ErrorMsg = ({ className, name }: { className?: string; name: string }) => (
  <ErrorMessage
    as={
      <p
        className={cn(className, "text-sm text-red-600 dark:text-red-500")}
        id={`${name}-error`}
        role="alert"
      />
    }
    name={name}
  />
);

export default ErrorMsg;
