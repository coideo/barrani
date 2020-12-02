import { Transition } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from 'utils/class-names';

export default {
  title: 'Transition',
  component: Transition,
};

function match<TValue extends string | number = string, TReturnValue = unknown>(
  value: TValue,
  lookup: Record<TValue, TReturnValue>
): TReturnValue {
  if (value in lookup) {
    const returnValue = lookup[value];
    return typeof returnValue === 'function' ? returnValue() : returnValue;
  }

  const error = new Error(
    `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      lookup
    )
      .map((key) => `"${key}"`)
      .join(', ')}.`
  );
  if (Error.captureStackTrace) Error.captureStackTrace(error, match);
  throw error;
}

function usePrevious<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Direction = {
  Forwards: ' -> ',
  Backwards: ' <- ',
};

const pages = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports'];
const colors = [
  'bg-gradient-to-r from-yellow-400 to-blue-400',
  'bg-gradient-to-r from-blue-400 to-pink-400',
  'bg-gradient-to-r from-pink-400 to-purple-400',
  'bg-gradient-to-r from-purple-400 to-green-400',
  'bg-gradient-to-r from-green-400 to-yellow-400',
];

function FullPageTransition() {
  const [activePage, setActivePage] = useState(0);
  const previousPage = usePrevious(activePage);

  const direction = activePage > previousPage ? Direction.Forwards : Direction.Backwards;

  const transitions = match(direction, {
    [Direction.Forwards]: {
      enter: 'transition transform ease-in-out duration-500',
      enterFrom: 'translate-x-full',
      enterTo: 'translate-x-0',
      leave: 'transition transform ease-in-out duration-500',
      leaveFrom: 'translate-x-0',
      leaveTo: '-translate-x-full',
    },
    [Direction.Backwards]: {
      enter: 'transition transform ease-in-out duration-500',
      enterFrom: '-translate-x-full',
      enterTo: 'translate-x-0',
      leave: 'transition transform ease-in-out duration-500',
      leaveFrom: 'translate-x-0',
      leaveTo: 'translate-x-full',
    },
  });

  return (
    <div>
      <div className="pb-32 bg-gray-800">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow logo"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-baseline ml-10 space-x-4">
                      {pages.map((page, i) => (
                        <button
                          key={page}
                          onClick={() => setActivePage(i)}
                          className={cn(
                            'px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:text-white focus:bg-gray-700',
                            i === activePage
                              ? 'text-white bg-gray-900'
                              : 'text-gray-300 hover:text-white hover:bg-gray-700'
                          )}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    <button
                      className="p-1 text-gray-400 border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                      aria-label="Notifications"
                    >
                      <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>

                    {/* Profile dropdown */}
                    <div className="relative ml-3">
                      <div>
                        <button
                          className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:ring focus:ring-black focus:ring-opacity-5"
                          id="user-menu"
                          aria-label="User menu"
                          aria-haspopup="true"
                        >
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="py-10">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="relative inline-block text-3xl font-bold leading-9 text-white">
              {pages[activePage]}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-5 py-6 bg-white rounded-lg shadow sm:px-6">
            <div className="relative overflow-hidden rounded-lg h-96">
              {pages.map((page, i) => (
                <Transition
                  appear={false}
                  key={page}
                  show={activePage === i}
                  className={cn(
                    'absolute inset-0 p-8 text-3xl rounded-lg text-white font-bold',
                    colors[i]
                  )}
                  {...transitions}
                >
                  {page} page content
                </Transition>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const FullPage = () => {
  return (
    <div className="h-full bg-gray-50">
      <div className="flex flex-col flex-1 h-full overflow-hidden rounded-lg shadow-lg">
        <FullPageTransition />
      </div>
    </div>
  );
};

// export const LayoutWithSidebar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     function handleEscape(event) {
//       if (!mobileOpen) return;

//       if (event.key === 'Escape') {
//         setMobileOpen(false);
//       }
//     }

//     document.addEventListener('keyup', handleEscape);
//     return () => document.removeEventListener('keyup', handleEscape);
//   }, [mobileOpen]);

//   return (
//     <div className="flex h-screen overflow-hidden bg-cool-gray-100">
//       {/* Off-canvas menu for mobile */}
//       <Transition show={mobileOpen} unmount={false} className="fixed inset-0 z-40 flex">
//         {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
//         <Transition.Child
//           unmount={false}
//           enter="transition-opacity ease-linear duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-linear duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           {() => (
//             <div className="fixed inset-0">
//               <div
//                 onClick={() => setMobileOpen(false)}
//                 className="absolute inset-0 opacity-75 bg-cool-gray-600"
//               />
//             </div>
//           )}
//         </Transition.Child>

//         {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
//         <Transition.Child
//           unmount={false}
//           enter="transition ease-in-out duration-300 transform"
//           enterFrom="-translate-x-full"
//           enterTo="translate-x-0"
//           leave="transition ease-in-out duration-300 transform"
//           leaveFrom="translate-x-0"
//           leaveTo="-translate-x-full"
//           className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-teal-600"
//         >
//           <div className="absolute top-0 right-0 p-1 -mr-14">
//             <Transition.Child
//               unmount={false}
//               className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600"
//               aria-label="Close sidebar"
//               as="button"
//               onClick={() => setMobileOpen(false)}
//             >
//               <svg
//                 className="w-6 h-6 text-white"
//                 stroke="currentColor"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </Transition.Child>
//           </div>
//           <div className="flex items-center flex-shrink-0 px-4">
//             <img
//               className="w-auto h-8"
//               src="https://tailwindui.com/img/logos/easywire-logo-on-brand.svg"
//               alt="Easywire logo"
//             />
//           </div>
//         </Transition.Child>
//         <div className="flex-shrink-0 w-14">
//           {/* Dummy element to force sidebar to shrink to fit close icon */}
//         </div>
//       </Transition>

//       {/* Static sidebar for desktop */}
//       <div className="hidden lg:flex lg:flex-shrink-0">
//         <div className="flex flex-col w-64">
//           {/* Sidebar component, swap this element with another sidebar if you like */}
//           <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-teal-600">
//             <div className="flex items-center flex-shrink-0 px-4">
//               <img
//                 className="w-auto h-8"
//                 src="https://tailwindui.com/img/logos/easywire-logo-on-brand.svg"
//                 alt="Easywire logo"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 overflow-auto focus:outline-none">
//         <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none">
//           <button
//             className="px-4 border-r border-cool-gray-200 text-cool-gray-400 focus:outline-none focus:bg-cool-gray-100 focus:text-cool-gray-600 lg:hidden"
//             aria-label="Open sidebar"
//             onClick={() => setMobileOpen(true)}
//           >
//             <svg
//               className="w-6 h-6 transition"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </button>
//           {/* Search bar */}
//           <div className="flex justify-between flex-1 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
//             <div className="flex flex-1">
//               <form className="flex w-full md:ml-0" action="#" method="GET">
//                 <label htmlFor="search_field" className="sr-only">
//                   Search
//                 </label>
//                 <div className="relative w-full text-cool-gray-400 focus-within:text-cool-gray-600">
//                   <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         clipRule="evenodd"
//                         d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     id="search_field"
//                     className="block w-full h-full py-2 pl-8 pr-3 rounded-md text-cool-gray-900 placeholder-cool-gray-500 focus:outline-none focus:placeholder-cool-gray-400 sm:text-sm"
//                     placeholder="Search"
//                     type="search"
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <main className="relative z-0 flex-1 p-8 overflow-y-auto">
//           {/* Replace with your content */}
//           <div className="border-4 border-gray-200 border-dashed rounded-lg h-96"></div>
//           {/* /End replace */}
//         </main>
//       </div>
//     </div>
//   );
// };
