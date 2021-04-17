import { Switch as HSwitch } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import React, { ComponentProps, FC } from 'react';
import { cn } from 'utils/class-names';

export type SwitchProps = ComponentProps<typeof HSwitch> & {
  className?: string | ((bag: { checked: boolean }) => string);
};

const Switch = ({ className, ...props }: SwitchProps) => {
  return (
    <HSwitch
      {...props}
      className={({ checked }) =>
        cn(
          className ? (typeof className === 'function' ? className({ checked }) : className) : '',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          checked ? 'bg-primary-600' : 'bg-gray-200'
        )
      }
    >
      {({ checked }) => (
        <span
          aria-hidden="true"
          className={cn(
            'relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        >
          <span
            className={cn(
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
              checked ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
            )}
          >
            <XIcon className="w-3 h-3 text-gray-400" />
          </span>
          <span
            className={cn(
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
              checked ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
            )}
          >
            <CheckIcon className="w-3 h-3 text-primary-600" />
          </span>
        </span>
      )}
    </HSwitch>
  );
};

const SwitchGroup: FC<{ className?: string }> = ({ className, ...props }) => (
  <HSwitch.Group as="div" className={cn(className, 'flex items-center space-x-4')} {...props} />
);

Switch.Group = SwitchGroup;
Switch.Label = HSwitch.Label;

export default Switch;
