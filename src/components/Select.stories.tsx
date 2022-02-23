import { ChartBarIcon } from "@heroicons/react/solid";
import { action } from "@storybook/addon-actions";
import React from "react";

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

export const Default = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select onChange={action("onChange")}>
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
      <Select onChange={action("onChange")}>
        {people.map((name) => (
          <Select.Item key={name} icon={<ChartBarIcon className="h-6 w-6" />} value={name}>
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
        options={people.map((p) => ({
          id: p,
          name: p,
          icon: <ChartBarIcon className="h-6 w-6" />,
        }))}
        onChange={action("onChange")}
      />
    </div>
  );
};

export const WithError = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select withError options={people} onChange={action("onChange")} />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Select disabled options={people} onChange={action("onChange")} />
    </div>
  );
};
