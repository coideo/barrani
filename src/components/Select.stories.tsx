import { ChartBarIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

import Select from "./Select";

export default {
  title: "Select",
  component: Select,
};

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
  "Caroline Schultz",
  "Mason Heaney",
  "Claudie Smitham",
  "Emil Schaefer",
];

const options = people.map((p) => ({
  id: p,
  name: p,
  icon: ChartBarIcon,
}));

export const Default = () => {
  const [selected, setSelected] = useState(people[3]);

  return (
    <div className="container max-w-sm space-y-1">
      <Select displayValue={selected} value={selected} onChange={setSelected}>
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
  const [selected, setSelected] = useState(people[3]);

  return (
    <div className="container max-w-sm space-y-1">
      <Select displayValue={selected} value={selected} onChange={setSelected}>
        {people.map((name) => (
          <Select.Item key={name} icon={ChartBarIcon} value={name}>
            {name}
          </Select.Item>
        ))}
      </Select>
    </div>
  );
};

export const WithOptions = () => {
  const [selected, setSelected] = useState(options[3]);

  return (
    <div className="container max-w-sm space-y-1">
      <Select
        displayValue={selected?.name}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export const WithError = () => {
  const [selected, setSelected] = useState(options[3]);

  return (
    <div className="container max-w-sm space-y-1">
      <Select
        withError
        displayValue={selected?.name}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export const Disabled = () => {
  const [selected, setSelected] = useState(options[3]);

  return (
    <div className="container max-w-sm space-y-1">
      <Select
        disabled
        displayValue={selected?.name}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};
