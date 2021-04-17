import React from 'react';
import { Controller } from 'react-hook-form';
import Switch, { SwitchProps } from '../Switch';
import { FieldProps } from './Field';

const FieldSwitch = ({ name, ...props }: FieldProps & Omit<SwitchProps, 'checked'>) => (
  <Controller
    name={name}
    render={({ field: { value, ...field } }) => <Switch checked={value} {...field} {...props} />}
  />
);

FieldSwitch.Group = Switch.Group;
FieldSwitch.Label = Switch.Label;

export default FieldSwitch;
