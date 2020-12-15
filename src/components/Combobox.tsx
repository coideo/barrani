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
import Input, { InputProps } from './Input';

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

type ComboInputProps = InputProps & { term: string; selected: string };

const ComboInput = forwardRef<HTMLInputElement, ComboInputProps>(function ComboInput(
  { term, selected, onBlur, onFocus, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  return (
    <Input
      {...props}
      ref={ref}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      value={focused ? term : selected}
    />
  );
});

const Combobox: ForwardRefExoticComponent<
  PropsWithoutRef<ComboboxProps> & RefAttributes<HTMLInputElement>
> & { List: typeof List; Item: typeof Item } = Object.assign(
  forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
    { children, disabled, id, onChange, onSearch, placeholder, withError },
    ref
  ) {
    const [term, setTerm] = useState('');
    const [selected, setSelected] = useState('');

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
        <ComboboxInput
          rightIcon={<SelectorIcon />}
          autocomplete={false}
          disabled={disabled}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          withError={withError}
          term={term}
          selected={selected}
          as={ComboInput}
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
