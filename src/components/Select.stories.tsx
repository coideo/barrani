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
  const [selected1, setSelected1] = useState(people[3]);
  const [selected2, setSelected2] = useState(people[3]);
  const [selected3, setSelected3] = useState<typeof options[number]>();
  const [selected4, setSelected4] = useState(options[3]);
  const [selected5, setSelected5] = useState(options[3]);

  return (
    <div className="container max-w-sm space-y-3">
      <Select displayValue={selected1} label="Default" value={selected1} onChange={setSelected1}>
        {people.map((name) => (
          <Select.Item key={name} value={name}>
            {name}
          </Select.Item>
        ))}
      </Select>
      <Select displayValue={selected2} label="With Icon" value={selected2} onChange={setSelected2}>
        {people.map((name) => (
          <Select.Item key={name} icon={ChartBarIcon} value={name}>
            {name}
          </Select.Item>
        ))}
      </Select>
      <Select
        displayValue={selected3?.name}
        label="With Options"
        options={options}
        value={selected3}
        onChange={setSelected3}
      />
      <Select
        withError
        displayValue={selected4?.name}
        label="With Error"
        options={options}
        value={selected4}
        onChange={setSelected4}
      />
      <Select
        disabled
        displayValue={selected5?.name}
        label="Disabled"
        options={options}
        value={selected5}
        onChange={setSelected5}
      />
    </div>
  );
};
