import React, { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'Switch',
  component: Switch,
};

export const Default = () => {
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Switch.Group>
        <Switch checked={state} onChange={setState} />
        <Switch.Label>Enable notifications</Switch.Label>
      </Switch.Group>
      <Switch.Group>
        <Switch.Label as="span" className="flex flex-col flex-grow" passive>
          <span className="text-sm font-medium text-gray-900">Available to hire</span>
          <span className="text-sm text-gray-500">
            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
          </span>
        </Switch.Label>
        <Switch checked={state2} onChange={setState2} />
      </Switch.Group>
    </div>
  );
};
