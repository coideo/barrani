import React, { FC } from 'react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const sizes = Object.keys(Button.Sizes) as (keyof typeof Button.Sizes)[];

const KINDS = {
  danger: {
    bg: 'bg-red-600',
    button: 'text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-600',
    loading: 'bg-white',
  },
  warning: {
    bg: 'bg-yellow-100',
    button: 'text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-500 disabled:bg-yellow-100',
    loading: 'bg-yellow-700',
  },
};
const ALL_KINDS = { ...Button.Kinds, ...KINDS };
const kinds = Object.keys(ALL_KINDS) as (keyof typeof ALL_KINDS)[];

const MyButton: FC<Omit<ButtonProps, 'kind'> & { kind: keyof typeof ALL_KINDS }> = ({
  kind = 'primary',
  ...props
}) => <Button kind={ALL_KINDS[kind]} {...props} />;

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
        Button Flat
      </MyButton>
    ))}
  </div>
);
