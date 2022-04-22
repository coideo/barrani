import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { cn } from "utils";

const people = [
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

export function Example() {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState();

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="container max-w-sm space-y-1">
      <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          Assigned to
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            displayValue={(person: typeof people[0]) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          {filteredPeople.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    cn(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900",
                    )
                  }
                  value={person}
                >
                  {({ active, selected }) => (
                    <>
                      <span className={cn("block truncate", selected && "font-semibold")}>
                        {person.name}
                      </span>

                      {selected && (
                        <span
                          className={cn(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600",
                          )}
                        >
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
}

export default {
  title: "Test",
  // component: Combobox,
};
