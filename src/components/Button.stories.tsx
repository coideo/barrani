import React, { FC } from 'react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const sizes = Object.keys(Button.Sizes) as (keyof typeof Button.Sizes)[];

const KINDS = {
  primary: {
    bg: 'bg-indigo-600',
    button: 'text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-600',
    loading: 'bg-white',
  },
  secondary: {
    bg: 'bg-indigo-100',
    button: 'text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500 disabled:bg-indigo-100',
    loading: 'bg-indigo-700',
  },
  light: {
    bg: 'bg-white',
    button:
      'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-white',
    loading: 'bg-gray-700',
  },
};
const kinds = Object.keys(KINDS) as (keyof typeof KINDS)[];

const MyButton: FC<Omit<ButtonProps, 'kind'> & { kind: keyof typeof KINDS }> = ({
  children,
  kind = 'primary',
  ...props
}) => (
  <Button className="focus:ring-indigo-500" kind={KINDS[kind]} {...props}>
    {children}
  </Button>
);

export const Default = () => (
  <div className="space-y-4">
    {kinds.map((kind) => (
      <div key={kind} className="space-x-4">
        {sizes.map((size) => (
          <MyButton key={size} size={size} kind={kind}>
            Button {size}
          </MyButton>
        ))}
      </div>
    ))}
  </div>
);

export const Disabled = () => (
  <div className="space-x-4">
    {kinds.map((kind) => (
      <MyButton key={kind} kind={kind} disabled>
        Disabled
      </MyButton>
    ))}
  </div>
);

export const Loading = () => (
  <div className="space-x-4">
    {kinds.map((kind) => (
      <MyButton key={kind} kind={kind} loading>
        Loading
      </MyButton>
    ))}
  </div>
);

export const Block = () => (
  <div className="container max-w-sm p-10 space-y-4 bg-gray-50">
    {kinds.map((kind) => (
      <MyButton key={kind} kind={kind} block>
        Block
      </MyButton>
    ))}
  </div>
);

export const Flat = () => (
  <div className="space-x-4">
    {kinds.map((kind) => (
      <MyButton key={kind} kind={kind} flat>
        Flat
      </MyButton>
    ))}
  </div>
);
