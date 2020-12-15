import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import React, {
  ChangeEvent,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  useState,
} from 'react';
import { cn } from 'utils/class-names';
import { SelectorIcon } from './icons';

type Value = string | { id: string | number; name: string };

const Item: FC<{ className?: string; icon?: ReactNode; value: Value }> = ({
  children,
  className,
  icon,
  value,
}) => (
  <ComboboxOption
    className={cn('relative px-3 py-2 text-gray-900 cursor-pointer select-none', className)}
    value={JSON.stringify(value)}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="block font-normal truncate item-text">{children}</span>
    </div>
  </ComboboxOption>
);

const List: FC = ({ children }) => (
  <ComboboxList
    className="py-1 overflow-auto text-base rounded-md ring-1 ring-black ring-opacity-5 max-h-60 focus:outline-none sm:text-sm"
    persistSelection
  >
    {children}
  </ComboboxList>
);

export type ComboboxProps = {
  children?: ReactNode;
  color?: string;
  disabled?: boolean;
  id?: string;
  onChange?: (value: string | number) => void;
  onSearch?: (value: string | number) => void;
  placeholder?: string;
  withError?: boolean;
};

const Combobox: ForwardRefExoticComponent<
  PropsWithoutRef<ComboboxProps> & RefAttributes<HTMLInputElement>
> & { List: typeof List; Item: typeof Item } = Object.assign(
  forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
    { children, color, disabled, id, onChange, onSearch, placeholder, withError },
    ref
  ) {
    const [term, setTerm] = useState('');
    const [selected, setSelected] = useState('');
    const [focused, setFocused] = useState(false);

    const handleSelect = (v: string) => {
      const value = JSON.parse(v) as Value;
      const { id, name } = typeof value === 'string' ? { id: value, name: value } : value;
      onChange?.(id);
      onSearch?.(name);
      setTerm(name);
      setSelected(name);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onSearch?.(e.target.value);
      setTerm(e.target.value);
    };

    return (
      <ReachCombobox openOnFocus onSelect={handleSelect}>
        <div className="relative flex shadow-sm">
          <ComboboxInput
            autocomplete={false}
            className={cn(
              'block w-full rounded-md border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm form-input',
              withError ? 'ring-red-500 border-red-500' : color
            )}
            disabled={disabled}
            id={id}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            ref={ref}
            type="text"
            value={focused ? term : selected}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon />
          </span>
        </div>
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
