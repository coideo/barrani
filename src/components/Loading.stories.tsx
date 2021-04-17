import React from 'react';
import Loading from './Loading';

export default {
  title: 'Loading',
  component: Loading,
};

const sizes = Object.keys(Loading.Sizes) as (keyof typeof Loading.Sizes)[];

export const Default = () => (
  <div>
    <div className="flex space-x-4">
      {sizes.map((size) => (
        <Loading key={size} size={size} />
      ))}
    </div>
    <div className="flex space-x-4 mt-15">
      {sizes.map((size) => (
        <Loading key={size} size={size} className="bg-primary-600" />
      ))}
    </div>
  </div>
);
