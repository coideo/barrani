import React from 'react';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
};

const MailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const QuestionMarkCircleIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

export const Default = () => (
  <div className="container max-w-md space-y-4">
    <Input placeholder="you@example.com" />
    <Input placeholder="you@example.com" disabled />
    <Input placeholder="you@example.com" defaultValue="with error" withError />
    <Input placeholder="you@example.com" icon={<MailIcon />} />
    <Input placeholder="000-00-0000" rightIcon={<QuestionMarkCircleIcon />} />
    <Input placeholder="www.example.com" prepend="http://" />
    <Input placeholder="example" append=".com" />
  </div>
);
