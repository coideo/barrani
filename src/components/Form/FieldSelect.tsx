import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import Select, { SelectProps } from '../Select';
import Field, { FieldComponentProps, FieldProps } from './Field';

type Props = Omit<
  SelectProps,
  'pattern' | 'required' | 'name' | 'min' | 'max' | 'maxLength' | 'minLength' | 'as' | 'onFocus'
>;

const ControllerSelect: FC<FieldComponentProps & Props> = ({ name, ...props }) => (
  <Controller name={name} as={<Select id={name} />} {...props} />
);

const FieldSelect = (props: FieldProps & Props) => (
  <Field component={ControllerSelect} {...props} />
);

FieldSelect.Item = Select.Item;

export default FieldSelect;
