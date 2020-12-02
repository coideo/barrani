import React, { FC, LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & { htmlFor: string };

const Label: FC<LabelProps> = ({ htmlFor, ...props }) => (
  <label className="block text-sm font-medium text-gray-700" htmlFor={htmlFor} {...props} />
);

export default Label;
