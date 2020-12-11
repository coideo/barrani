import {
  ListboxArrow,
  ListboxButton,
  ListboxInput,
  ListboxInputProps,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';
import { cn } from 'utils/class-names';
import { SelectorIcon } from './icons';

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const Item: FC<{ icon?: ReactNode; value: string }> = ({ children, icon, value }) => (
  <ListboxOption
    className="relative py-2 pl-3 text-gray-900 cursor-pointer select-none pr-9"
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
  isDirty?: boolean;
  options?: ({ id: string; name: ReactNode; icon?: ReactNode } | string)[];
  withError?: boolean;
};

const Select: ForwardRefExoticComponent<
  PropsWithoutRef<SelectProps> & RefAttributes<HTMLSpanElement>
> & { Item: typeof Item } = Object.assign(
  forwardRef<HTMLSpanElement, SelectProps>(function Select(
    {
      children,
      className,
      color,
      defaultValue,
      disabled,
      id,
      isDirty,
      onChange,
      options,
      value,
      withError,
      ...props
    },
    ref
  ) {
    const items =
      children ||
      options?.map((o) =>
        typeof o === 'string' ? (
          <Item key={o} value={o}>
            {o}
          </Item>
        ) : (
          <Item key={o.id} value={o.id} icon={o.icon}>
            {o.name}
          </Item>
        )
      );

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
            'relative flex w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-1 sm:text-sm',
            withError ? 'ring-red-500 border-red-500' : color,
            isDirty && ''
          )}
          ref={ref}
        >
          {({ label }) => (
            <>
              <span className="block truncate">{label}</span>
              <ListboxArrow className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon />
              </ListboxArrow>
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
  }),
  { Item }
);

export default Select;
