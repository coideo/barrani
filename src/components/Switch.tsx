import { Switch as HSwitch } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React, { ReactNode } from "react";
import { cn } from "utils/class-names";

export type SwitchProps = {
  className?: string | ((bag: { checked: boolean }) => string);
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Switch = ({ className, ...props }: SwitchProps) => {
  return (
    <HSwitch
      {...props}
      className={({ checked }) =>
        cn(
          className ? (typeof className === "function" ? className({ checked }) : className) : "",
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          checked ? "bg-primary-600" : "bg-gray-200 dark:bg-gray-700",
        )
      }
    >
      {({ checked }) => (
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 dark:bg-gray-300",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        >
          <span
            className={cn(
              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
              checked ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in",
            )}
          >
            <XIcon className="h-3 w-3 text-gray-400 dark:text-gray-700" />
          </span>
          <span
            className={cn(
              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
              checked ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out",
            )}
          >
            <CheckIcon className="h-3 w-3 text-primary-600" />
          </span>
        </span>
      )}
    </HSwitch>
  );
};

const SwitchGroup = ({ className, children }: { className?: string; children: ReactNode }) => (
  <HSwitch.Group as="div" className={cn(className, "flex items-center space-x-4")}>
    {children}
  </HSwitch.Group>
);

Switch.Group = SwitchGroup;
Switch.Label = HSwitch.Label;

export default Switch;
