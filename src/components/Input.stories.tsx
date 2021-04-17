import React from 'react';
import Input from './Input';
import { MailIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

export default {
  title: 'Input',
  component: Input,
};

export const Default = () => (
  <div className="container max-w-md space-y-4">
    <Input placeholder="you@example.com" />
    <Input placeholder="you@example.com" disabled />
    <Input placeholder="you@example.com" defaultValue="with error" withError />
    <Input
      placeholder="you@example.com"
      icon={<MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />}
    />
    <Input
      placeholder="000-00-0000"
      rightIcon={<QuestionMarkCircleIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />}
    />
    <Input placeholder="www.example.com" prepend="http://" />
    <Input placeholder="example" append=".com" />
  </div>
);
