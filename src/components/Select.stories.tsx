import { action } from '@storybook/addon-actions';
import React from 'react';
import Select from './Select';
import { ChartBarIcon } from '@heroicons/react/solid';

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

export const Default = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select onChange={action('onChange')}>
        {people.map((name) => (
          <Select.Item key={name} value={name}>
            {name}
          </Select.Item>
        ))}
      </Select>
    </div>
  );
};

export const WithIcon = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select onChange={action('onChange')}>
        {people.map((name) => (
          <Select.Item key={name} value={name} icon={<ChartBarIcon className="w-6 h-6" />}>
            {name}
          </Select.Item>
        ))}
      </Select>
    </div>
  );
};

export const WithOptions = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select
        onChange={action('onChange')}
        options={people.map((p) => ({
          id: p,
          name: p,
          icon: <ChartBarIcon className="w-6 h-6" />,
        }))}
      />
    </div>
  );
};

export const WithError = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select onChange={action('onChange')} options={people} withError />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select onChange={action('onChange')} options={people} disabled />
    </div>
  );
};
