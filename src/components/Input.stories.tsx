import React from "react";
import { MailIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";

import Input from "./Input";

export default {
  title: "Input",
  component: Input,
};

export const Default = () => (
  <div className="container max-w-md space-y-4">
    <Input placeholder="you@example.com" />
    <Input disabled placeholder="you@example.com" />
    <Input withError defaultValue="with error" placeholder="you@example.com" />
    <Input
      icon={<MailIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />}
      placeholder="you@example.com"
    />
    <Input
      placeholder="000-00-0000"
      rightIcon={<QuestionMarkCircleIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />}
    />
    <Input placeholder="www.example.com" prepend="http://" />
    <Input append=".com" placeholder="example" />
  </div>
);
