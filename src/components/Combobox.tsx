import { Combobox as HUCombobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { ReactNode } from "react";
import { cn } from "utils/class-names";

function Item<TType = Parameters<typeof Combobox>[0]["value"]>({
  children,
  className,
  icon,
  value,
}: {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  value: TType;
}) {
  return (
    <HUCombobox.Option
      className={({ active }) =>
        cn(
          "relative cursor-default select-none py-2 pl-3 pr-9",
          active ? "bg-primary-600 text-white" : "text-gray-900",
          className,
        )
      }
      value={value}
    >
      {({ active, selected }) => (
        <>
          <div className="flex items-center space-x-3">
            {icon}
            <span className={cn("block truncate", selected && "font-semibold")}>{children}</span>
          </div>
          {selected && (
            <span
              className={cn(
                "absolute inset-y-0 right-0 flex items-center pr-4",
                active ? "text-white" : "text-primary-600",
              )}
            >
              <CheckIcon aria-hidden="true" className="h-5 w-5" />
            </span>
          )}
        </>
      )}
    </HUCombobox.Option>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <HUCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </HUCombobox.Options>
  );
}

export type ComboboxProps<TType = string> = {
  children?: ReactNode;
  withError?: boolean;
  onSearch: (value: string) => void;
  displayValue: (item: TType) => string;
  disabled?: boolean;
  label?: string;
  onChange: (value: TType) => void;
  value: TType;
};

function Combobox<TType = string>({
  children,
  withError,
  onSearch,
  displayValue,
  disabled,
  label,
  onChange,
  value,
}: ComboboxProps<TType>) {
  return (
    <HUCombobox as="div" disabled={disabled} value={value} onChange={onChange}>
      {label ? (
        <HUCombobox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </HUCombobox.Label>
      ) : null}
      <div className="relative mt-1">
        <HUCombobox.Input
          className={cn(
            "w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm",
            withError
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          )}
          displayValue={displayValue}
          onChange={(event) => onSearch(event.target.value)}
        />
        <HUCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
        </HUCombobox.Button>
        {children}
      </div>
    </HUCombobox>
  );
}

export default Object.assign(Combobox, { List, Item });
