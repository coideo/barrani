import { Switch as HSwitch } from '@headlessui/react';
import React, { ComponentProps, FC } from 'react';
import { cn } from 'utils/class-names';

const XIcon: FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 12 12">
    <path
      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon: FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 12 12">
    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
  </svg>
);

export type SwitchProps = ComponentProps<typeof HSwitch> & {
  color?: { bg: string; text: string };
  className?: string;
};

const Switch = ({ color, className, ...props }: SwitchProps) => {
  return (
    <HSwitch
      {...props}
      className={({ checked }) =>
        cn(
          className,
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          checked ? color?.bg : 'bg-gray-200'
        )
      }
    >
      {({ checked }) => (
        <span
          aria-hidden="true"
          className={cn(
            'relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
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
            <CheckIcon className={cn('w-3 h-3', color?.text)} />
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
