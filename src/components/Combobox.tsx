import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';
import { cn } from 'utils/class-names';

const Item: FC<{ value: string }> = ({ children, value }) => (
  <ComboboxOption
    className="relative px-3 py-2 text-gray-900 cursor-pointer select-none"
    value={value}
  >
    <span className="block font-normal truncate">{children}</span>
  </ComboboxOption>
);

const List: FC = ({ children }) => (
  <ComboboxList className="py-1 overflow-auto text-base rounded-md ring-1 ring-black ring-opacity-5 max-h-60 focus:outline-none sm:text-sm">
    {children}
  </ComboboxList>
);

export type ComboboxProps = {
  children?: ReactNode;
  color?: string;
  id?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  withError?: boolean;
};

const Combobox: ForwardRefExoticComponent<
  PropsWithoutRef<ComboboxProps> & RefAttributes<HTMLInputElement>
> & { List: typeof List; Item: typeof Item } = Object.assign(
  forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
    { children, color, id, onChange, onSearch, placeholder, withError },
    ref
  ) {
    return (
      <ReachCombobox onSelect={onChange}>
        <ComboboxInput
          autocomplete={false}
          className={cn(
            'block w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm form-input',
            withError ? 'ring-red-500 border-red-500' : color
          )}
          id={id}
          onChange={(e) => onSearch?.(e.target.value)}
          placeholder={placeholder}
          ref={ref}
          type="text"
        />
        {children ? (
          <ComboboxPopover className="w-full mt-1 bg-white rounded-md shadow-lg">
            {children}
          </ComboboxPopover>
        ) : null}
      </ReachCombobox>
    );
  }),
  { List, Item }
);

export default Combobox;
