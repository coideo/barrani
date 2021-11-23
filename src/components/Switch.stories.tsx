import React, { useState } from "react";

import Switch from "./Switch";

export default {
  title: "Switch",
  component: Switch,
};

export const Default = () => {
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

  return (
    <div>
      <div className="max-w-xl p-10 mx-auto space-y-8 bg-gray-900 dark">
        <Switch.Group>
          <Switch checked={state} className="dark:focus:ring-offset-gray-900" onChange={setState} />
          <Switch.Label className="dark:text-gray-100">Enable notifications</Switch.Label>
        </Switch.Group>
        <Switch.Group>
          <Switch.Label passive as="span" className="flex flex-col flex-grow">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Available to hire
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
            </span>
          </Switch.Label>
          <Switch
            checked={state2}
            className="dark:focus:ring-offset-gray-900"
            onChange={setState2}
          />
        </Switch.Group>
      </div>

      <div className="max-w-xl p-10 mx-auto space-y-8">
        <Switch.Group>
          <Switch checked={state} className="dark:focus:ring-offset-gray-900" onChange={setState} />
          <Switch.Label className="dark:text-gray-100">Enable notifications</Switch.Label>
        </Switch.Group>
        <Switch.Group>
          <Switch.Label passive as="span" className="flex flex-col flex-grow">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Available to hire
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
            </span>
          </Switch.Label>
          <Switch
            checked={state2}
            className="dark:focus:ring-offset-gray-900"
            onChange={setState2}
          />
        </Switch.Group>
      </div>
    </div>
  );
};
