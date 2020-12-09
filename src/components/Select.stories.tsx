import { action } from '@storybook/addon-actions';
import React, { FC } from 'react';
import Select, { SelectProps } from './Select';

export default {
  title: 'Select',
  component: Select,
};

const people = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox',
  'Hellen Schmidt',
  'Caroline Schultz',
  'Mason Heaney',
  'Claudie Smitham',
  'Emil Schaefer',
];

const MySelect: FC<Omit<SelectProps, 'color'>> = (props) => (
  <Select color="focus:ring-indigo-500 focus:border-indigo-500" {...props} />
);

export const Default = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <MySelect onChange={action('onChange')}>
        {people.map((name) => (
          <Select.Item key={name} value={name}>
            {name}
          </Select.Item>
        ))}
      </MySelect>
    </div>
  );
};

const CharBar = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

export const WithIcon = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <MySelect onChange={action('onChange')}>
        {people.map((name) => (
          <Select.Item key={name} value={name} icon={<CharBar />}>
            {name}
          </Select.Item>
        ))}
      </MySelect>
    </div>
  );
};

export const WithOptions = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <MySelect
        onChange={action('onChange')}
        options={people.map((p) => ({ id: p, name: p, icon: <CharBar /> }))}
      />
    </div>
  );
};

export const WithError = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <MySelect onChange={action('onChange')} options={people} withError />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <MySelect onChange={action('onChange')} options={people} disabled />
    </div>
  );
};
