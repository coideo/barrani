import React from "react";

import Loading from "./Loading";

export default {
  title: "Loading",
  component: Loading,
};

const sizes = Object.keys(Loading.Sizes) as Array<keyof typeof Loading.Sizes>;

export const Default = () => (
  <div className="space-y-10 py-8">
    <div className="flex space-x-4">
      {sizes.map((size) => (
        <Loading key={size} size={size} />
      ))}
    </div>
    <div className="mt-15 flex space-x-4">
      {sizes.map((size) => (
        <Loading key={size} className="bg-primary-600" size={size} />
      ))}
    </div>
  </div>
);
