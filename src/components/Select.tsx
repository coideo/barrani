import {
  ListboxButton,
  ListboxInput,
  ListboxInputProps,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import React, { FC, ReactNode } from 'react';
import { cn } from 'utils/class-names';

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const SelectorIcon = () => (
  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
    <path
      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Item: FC<{ icon?: ReactNode; value: string }> = ({ children, icon, value }) => (
  <ListboxOption
    className="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9"
    value={value}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="block font-normal truncate item-text">{children}</span>
    </div>
    <span className="absolute inset-y-0 right-0 flex items-center pr-4 check-icon">
      <CheckIcon />
    </span>
  </ListboxOption>
);

export type SelectProps = Omit<ListboxInputProps, 'ref' | 'children'> & {
  children?: ReactNode;
  className?: string;
  color?: string;
  id?: string;
  options?: { id: number | string; name: ReactNode; icon?: ReactNode }[];
};

const Select = ({
  children,
  className,
  color,
  options,
  defaultValue,
  disabled,
  id,
  onChange,
  value,
  ...props
}: SelectProps) => {
  const items =
    children ||
    options?.map(({ id, name, icon }) => (
      <Item key={id} value={id.toString()} icon={icon}>
        {name}
      </Item>
    ));

  return (
    <ListboxInput
      aria-labelledby={id}
      className={cn(className, 'relative')}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      value={value}
      {...props}
    >
      <ListboxButton
        className={cn(
          color,
          'relative flex w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none sm:text-sm focus:ring-1'
        )}
      >
        {({ label }) => (
          <>
            <span className="block truncate">{label}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon />
            </span>
          </>
        )}
      </ListboxButton>
      <ListboxPopover className="absolute w-full mt-1 bg-white rounded-md shadow-lg">
        <ListboxList className="py-1 overflow-auto text-base rounded-md ring-1 ring-black ring-opacity-5 max-h-60 focus:outline-none sm:text-sm">
          {items}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  );
};

Select.Item = Item;

export default Select;