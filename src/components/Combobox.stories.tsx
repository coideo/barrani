import React, { useMemo, useState } from "react";
import { useQueryString } from "utils/use-query-string";

import Combobox from "./Combobox";

export default {
  title: "Combobox",
  component: Combobox,
};

const peopleList = [
  { id: 1, name: "Leslie Alexander" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Arlene Mccoy" },
  { id: 4, name: "Devon Webb" },
  { id: 5, name: "Tom Cook" },
  { id: 6, name: "Tanya Fox" },
  { id: 7, name: "Hellen Schmidt" },
  { id: 8, name: "Caroline Schultz" },
  { id: 9, name: "Mason Heaney" },
  { id: 10, name: "Claudie Smitham" },
  { id: 11, name: "Emil Schaefer" },
];

function usePeopleMatch() {
  const [{ name }, search] = useQueryString({ name: "" });

  return {
    people: useMemo(
      () =>
        name === ""
          ? peopleList
          : peopleList.filter((p) => p.name.toLowerCase().includes(name.toLowerCase())),
      [name],
    ),
    search,
  };
}

export const Default = () => {
  const { people, search } = usePeopleMatch();
  const [selectedPerson, setSelectedPerson] = useState<typeof peopleList[number] | null>(null);

  return (
    <div className="container max-w-sm space-y-1">
      <Combobox
        nullable
        displayValue={(person) => person?.name ?? ""}
        label="Person"
        value={selectedPerson}
        onChange={setSelectedPerson}
        onSearch={(name) => search({ name })}
      >
        <Combobox.List>
          {people.length > 0 ? (
            people.map((person) => (
              <Combobox.Item key={person.id} value={person}>
                {person.name}
              </Combobox.Item>
            ))
          ) : (
            <span className="m-2 block">No results found</span>
          )}
        </Combobox.List>
      </Combobox>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Combobox
        disabled
        displayValue={() => ""}
        value={undefined}
        onChange={() => undefined}
        onSearch={() => undefined}
      />
    </div>
  );
};

export const WithError = () => {
  return (
    <div className="container max-w-sm space-y-1">
      <Combobox
        withError
        displayValue={() => ""}
        value={undefined}
        onChange={() => undefined}
        onSearch={() => undefined}
      />
    </div>
  );
};
