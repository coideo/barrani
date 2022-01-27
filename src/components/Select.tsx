import {
  ListboxArrow,
  ListboxButton,
  ListboxInput,
  ListboxInputProps,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from "@reach/listbox";
import React, { FC, forwardRef, ReactNode } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { cn } from "utils/class-names";

const Item: FC<{ icon?: ReactNode; value: string; disabled?: boolean; label?: string }> = ({
  children,
  icon,
  value,
  disabled,
  label,
}) => (
  <ListboxOption
    className="relative cursor-pointer select-none py-2 pl-3 pr-9"
    disabled={disabled}
    label={label}
    value={value}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="item-text block truncate font-normal">{children}</span>
    </div>
    <span className="check-icon absolute inset-y-0 right-0 flex items-center pr-4">
      <CheckIcon aria-hidden="true" className="h-5 w-5" />
    </span>
  </ListboxOption>
);

export type SelectProps = Omit<ListboxInputProps, "ref" | "children"> & {
  children?: ReactNode;
  className?: string;
  id?: string;
  isDirty?: boolean;
  options?: Array<{ id: string; name: ReactNode; icon?: ReactNode } | string>;
  withError?: boolean;
};

const Select = forwardRef<HTMLSpanElement, SelectProps>(function Select(
  {
    children,
    className,
    defaultValue,
    disabled,
    id,
    isDirty: _isDirty,
    onChange,
    options,
    value,
    withError,
    ...props
  },
  ref,
) {
  const items =
    children ??
    options?.map((o) =>
      typeof o === "string" ? (
        <Item key={o} value={o}>
          {o}
        </Item>
      ) : (
        <Item key={o.id} icon={o.icon} value={o.id}>
          {o.name}
        </Item>
      ),
    );

  return (
    <ListboxInput
      aria-labelledby={id}
      className={cn(className, "relative")}
      defaultValue={defaultValue}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...props}
    >
      <ListboxButton
        ref={ref}
        className={cn(
          "relative flex h-10 w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm",
          withError
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-primary-500 focus:border-primary-500",
        )}
      >
        {({ label }) => (
          <>
            <span className="block truncate">{label}</span>
            <ListboxArrow className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </ListboxArrow>
          </>
        )}
      </ListboxButton>
      <ListboxPopover className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
        <ListboxList className="max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {items}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
});

export default Object.assign(Select, { Item });
