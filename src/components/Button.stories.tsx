import React, { FC } from "react";

import Button, { ButtonProps } from "./Button";

export default {
  title: "Button",
  component: Button,
};

const sizes = Object.keys(Button.Sizes) as Array<keyof typeof Button.Sizes>;

const KINDS = {
  danger: {
    bg: "bg-red-600",
    button: "border-transparent text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-600",
    loading: "bg-white",
  },
  warning: {
    bg: "bg-yellow-100",
    button:
      "border-transparent text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-500 disabled:bg-yellow-100",
    loading: "bg-yellow-700",
  },
};
const ALL_KINDS = { ...Button.Kinds, ...KINDS };
const kinds = Object.keys(ALL_KINDS) as Array<keyof typeof ALL_KINDS>;

const MyButton: FC<Omit<ButtonProps, "kind"> & { kind: keyof typeof ALL_KINDS }> = ({
  kind = "primary",
  ...props
}) => <Button kind={ALL_KINDS[kind]} {...props} />;

export const Default = () => (
  <div className="space-y-4">
    {kinds.map((kind) => (
      <div key={kind} className="space-x-4">
        {sizes.map((size) => (
          <MyButton key={size} kind={kind} size={size}>
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
      <MyButton key={kind} disabled kind={kind}>
        Disabled
      </MyButton>
    ))}
  </div>
);

export const Loading = () => (
  <div className="space-x-4">
    {kinds.map((kind) => (
      <MyButton key={kind} loading kind={kind}>
        Loading
      </MyButton>
    ))}
  </div>
);

export const Block = () => (
  <div className="container max-w-sm space-y-4 bg-gray-50 p-10">
    {kinds.map((kind) => (
      <MyButton key={kind} block kind={kind}>
        Block
      </MyButton>
    ))}
  </div>
);

export const Flat = () => (
  <div className="space-x-4">
    {kinds.map((kind) => (
      <MyButton key={kind} flat kind={kind}>
        Button Flat
      </MyButton>
    ))}
  </div>
);
