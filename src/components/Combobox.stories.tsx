import { action } from '@storybook/addon-actions';
import React, { FC, useMemo } from 'react';
import useQueryString from 'utils/use-query-string';
import Combobox, { ComboboxProps } from './Combobox';

export default {
  title: 'Combobox',
  component: Combobox,
};

const peopleList = [
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

function usePeopleMatch() {
  const [queryString, search] = useQueryString({ name: '' });
  const name = queryString.name as string;

  return {
    people: useMemo(() => peopleList.filter((p) => p.toLowerCase().includes(name.toLowerCase())), [
      name,
    ]),
    search,
  };
}

const MyCombobox: FC<Omit<ComboboxProps, 'color'>> = (props) => (
  <Combobox color="focus:ring-indigo-500 focus:border-indigo-500" {...props} />
);

export const Default = () => {
  const { people, search } = usePeopleMatch();

  return (
    <div className="container max-w-sm space-y-1">
      <MyCombobox onChange={action('onChange')} onSearch={(name) => search({ name })}>
        {people &&
          (people.length > 0 ? (
            <Combobox.List>
              {people.map((name) => (
                <Combobox.Item key={name} value={name}>
                  {name}
                </Combobox.Item>
              ))}
            </Combobox.List>
          ) : (
            <span className="block m-2">No results found</span>
          ))}
      </MyCombobox>
    </div>
  );
};
