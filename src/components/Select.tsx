import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { ComponentType, Key, ReactNode } from "react";
import { cn } from "utils/class-names";

type Icon = ComponentType<{ className: string }>;

function Item<TType = string>({
  children,
  value,
  disabled,
  icon: Icon,
}: {
  children?: ReactNode;
  disabled?: boolean | undefined;
  value: TType;
  icon?: Icon;
}) {
  return (
    <Listbox.Option
      className={({ active }) =>
        cn(
          "relative cursor-default select-none py-2 pl-3 pr-9",
          active ? "bg-primary-600 text-white" : "text-gray-900",
        )
      }
      disabled={disabled}
      value={value}
    >
      {({ selected, active }) => (
        <>
          <div className="flex items-center space-x-3">
            {Icon ? <Icon className="h-6 w-6" /> : null}
            <span className={cn(selected ? "font-semibold" : "font-normal", "block truncate")}>
              {children}
            </span>
          </div>
          {selected ? (
            <span
              className={cn(
                "absolute inset-y-0 right-0 flex items-center pr-4",
                active ? "text-white" : "text-primary-600",
              )}
            >
              <CheckIcon aria-hidden="true" className="h-5 w-5" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
}

export type SelectProps<TType = string> = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  isDirty?: boolean;
  label?: string;
  onChange: (value: TType) => void;
  options?: string[] | Array<{ id: Key; name: ReactNode; icon?: Icon }>;
  displayValue: ReactNode | ((value?: TType) => ReactNode);
  value: TType | undefined;
  withError?: boolean;
};

function Select<TType = string>({
  children,
  disabled,
  isDirty: _isDirty,
  label,
  onChange,
  options,
  displayValue,
  value,
  withError,
  ...props
}: SelectProps<TType>) {
  const items =
    children ??
    options?.map((o) =>
      typeof o === "string" ? (
        <Item key={o} value={o}>
          {o}
        </Item>
      ) : (
        <Item key={o.id} icon={o.icon} value={o}>
          {o.name}
        </Item>
      ),
    );

  const selectedNode = typeof displayValue === "function" ? displayValue(value) : displayValue;

  return (
    <Listbox as="div" disabled={disabled} value={value} onChange={onChange} {...props}>
      {label ? (
        <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
      ) : null}
      <div className="relative mt-1">
        <Listbox.Button
          className={cn(
            "relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100 sm:text-sm",
            withError
              ? "border-red-500 focus:ring-red-500"
              : "focus:border-primary-500 focus:ring-primary-500",
          )}
        >
          <span className="block truncate">{selectedNode}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </Listbox.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Object.assign(Select, { Item });
