import { Menu, Transition } from '@headlessui/react';
import * as React from 'react';
import { cn } from 'utils/class-names';
import { usePopper } from 'utils/use-popper';

export default {
  title: 'Menu',
  component: Menu,
};

function resolveClass({ active, disabled }: { active: boolean; disabled: boolean }) {
  return cn(
    'flex justify-between w-full px-4 py-2 text-sm leading-5 text-left',
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    disabled && 'cursor-not-allowed opacity-50'
  );
}

export const WithPopper = () => {
  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <div className="inline-block mt-64 ml-40 text-left">
      <Menu>
        {({ open }) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ref={trigger}
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring-blue-500 active:bg-gray-50 active:text-gray-800"
              >
                <span>Options</span>
                <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </span>

            <div ref={container} className="w-56">
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-75 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-75 opacity-0"
              >
                <Menu.Items
                  static
                  className="bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Signed in as</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      tom@example.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Menu.Item as="a" href="#account-settings" className={resolveClass}>
                      Account settings
                    </Menu.Item>
                    <Menu.Item>
                      {(data) => (
                        <a href="#support" className={resolveClass(data)}>
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item as="a" disabled href="#new-feature" className={resolveClass}>
                      New feature (soon)
                    </Menu.Item>
                    <Menu.Item as="a" href="#license" className={resolveClass}>
                      License
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item as="a" href="#sign-out" className={resolveClass}>
                      Sign out
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </>
        )}
      </Menu>
    </div>
  );
};

const Avatar = ({ className }: { className: string }) => (
  <img
    className={className}
    src="https://cdn.discordapp.com/avatars/690168088150278277/93867e0636a570f91fae35b54428bc72.png"
    alt="our avatar"
  />
);

export const ProfileDropdown = () => {
  return (
    <div className="relative flex justify-end text-left">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={cn(
                'relative z-10 inline-flex items-center rounded-full max-w-xs text-white shadow-sm text-sm focus:outline-none',
                open
                  ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white'
                  : 'focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
              )}
              aria-label="User menu"
            >
              <Avatar className="w-8 h-8 rounded-full" />
            </Menu.Button>

            <Transition show={open}>
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed inset-0"
              >
                <div className="absolute inset-0 opacity-75 bg-cool-gray-900" />
              </Transition.Child>
              <Transition.Child
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-50 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-50 opacity-0"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Signed in as</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      luiggi@example.com
                    </p>
                  </div>

                  <div className="flex flex-col py-1 md:hidden">
                    <Menu.Item as="a" href="#account-settings" className={resolveClass}>
                      Account settings
                    </Menu.Item>
                    <Menu.Item>
                      {(data) => (
                        <a href="#support" className={resolveClass(data)}>
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item as="a" disabled href="#new-feature" className={resolveClass}>
                      New feature (soon)
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item as="a" href="#sign-out" className={resolveClass}>
                      Sign out
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition.Child>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
