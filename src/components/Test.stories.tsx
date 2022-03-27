import { Listbox, Popover, Portal, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { cn } from "utils";
import usePopper from "utils/use-popper";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

function Link(props: React.ComponentProps<"a">) {
  return (
    <a
      className="border-2 border-transparent px-3 py-2 hover:bg-gray-200 focus:border-blue-900 focus:bg-gray-200 focus:outline-none"
      href="/"
      {...props}
    >
      {props.children}
    </a>
  );
}

const options = {
  placement: "bottom-start" as const,
  strategy: "fixed" as const,
  modifiers: [],
};

export const PopperExample = () => {
  const [reference1, popper1] = usePopper(options);
  const [reference2, popper2] = usePopper(options);

  const links = ["First", "Second", "Third", "Fourth"];

  return (
    <div className="mt-48 flex items-center justify-center space-x-12 p-12">
      <button>Previous</button>

      <Popover.Group aria-label="Mythical University" as="nav" className="flex space-x-3">
        <Popover as="div" className="relative">
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-300 transform"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="fixed inset-0 z-20 bg-gray-500 bg-opacity-75" />
          </Transition>

          <Popover.Button className="relative z-30 border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none">
            Normal
          </Popover.Button>
          <Popover.Panel className="absolute z-30 flex w-64 flex-col border-2 border-blue-900 bg-gray-100">
            {links.map((link, i) => (
              <Link key={link} hidden={i === 2}>
                Normal - {link}
              </Link>
            ))}
          </Popover.Panel>
        </Popover>

        <Popover as="div" className="relative">
          <Popover.Button className="border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none">
            Focus
          </Popover.Button>
          <Popover.Panel
            focus
            className="absolute flex w-64 flex-col border-2 border-blue-900 bg-gray-100"
          >
            {links.map((link) => (
              <Link key={link}>Focus - {link}</Link>
            ))}
          </Popover.Panel>
        </Popover>

        <Popover as="div" className="relative">
          <Popover.Button
            ref={reference1}
            className="border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
          >
            Portal
          </Popover.Button>
          <Popover.Panel
            ref={popper1}
            className="flex w-64 flex-col border-2 border-blue-900 bg-gray-100"
          >
            {links.map((link) => (
              <Link key={link}>Portal - {link}</Link>
            ))}
          </Popover.Panel>
        </Popover>
        <Popover as="div" className="relative">
          <Popover.Button
            ref={reference2}
            className="border-2 border-transparent bg-gray-300 px-3 py-2 focus:border-blue-900 focus:outline-none"
          >
            Focus in Portal
          </Popover.Button>
          <Portal>
            <Popover.Panel
              ref={popper2}
              focus
              className="flex w-64 flex-col border-2 border-blue-900 bg-gray-100"
            >
              {links.map((link) => (
                <Link key={link}>Focus in Portal - {link}</Link>
              ))}
            </Popover.Panel>
          </Portal>
        </Popover>
      </Popover.Group>
    </div>
  );
};

export function Example() {
  const [reff, popper] = usePopper(options);
  const [selected, setSelected] = useState(people[3]);

  return (
    <div className="mx-auto mt-96 w-full max-w-xs">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Assigned to
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button
                ref={reff}
                className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              >
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>

              <Portal>
                <Listbox.Options
                  ref={popper}
                  className="absolute z-10 max-h-60 w-full max-w-xs overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        cn(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={cn(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate",
                            )}
                          >
                            {person.name}
                          </span>

                          {selected ? (
                            <span
                              className={cn(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Portal>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

export default {
  title: "Test",
  // component: Select,
};
