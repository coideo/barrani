import React, { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'Switch',
  component: Switch,
};

export const Default = () => {
  const [state, setState] = useState(false);

  return (
    <Switch.Group>
      <Switch
        className="focus:ring-green-500"
        checked={state}
        onChange={setState}
        color={{ bg: 'bg-green-600', text: 'text-green-600' }}
      />
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch.Group>
  );
};
