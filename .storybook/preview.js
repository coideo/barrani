// import { withInfo } from '@storybook/addon-info';
import { addDecorator } from '@storybook/react';
import React from 'react';
import Layout from './Layout';

addDecorator((storyFn) => <Layout>{storyFn()}</Layout>);
// addDecorator(
//   withInfo({
//     inline: true,
//     propTablesExclude: [Layout],
//   })
// );
