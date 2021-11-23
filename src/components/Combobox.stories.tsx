import { action } from "@storybook/addon-actions";
import React, { useMemo } from "react";
import { useQueryString } from "utils/use-query-string";

import Combobox from "./Combobox";

export default {
  title: "Combobox",
  component: Combobox,
};

const peopleList = [
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

function usePeopleMatch() {
  const [queryString, search] = useQueryString({ name: "" });
  const name = queryString.name as string;

  return {
    people: useMemo(
      () => peopleList.filter((p) => p.toLowerCase().includes(name.toLowerCase())),
      [name],
    ),
    search,
  };
}

export const Default = () => {
  const { people, search } = usePeopleMatch();

  return (
    <div className="container max-w-sm space-y-1">
      <Combobox onChange={action("onChange")} onSearch={(name) => search({ name })}>
        {people.length > 0 ? (
          <Combobox.List>
            {people.map((name) => (
              <Combobox.Item key={name} value={name}>
                {name}
              </Combobox.Item>
            ))}
          </Combobox.List>
        ) : (
          <span className="block m-2">No results found</span>
        )}
      </Combobox>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Combobox disabled />
    </div>
  );
};

export const WithError = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Combobox withError />
    </div>
  );
};
