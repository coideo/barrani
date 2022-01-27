import React from "react";

import Skeleton from "./Skeleton";

export default {
  title: "Skeleton",
  component: Skeleton,
};

export const Default = () => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
      <div className="flex flex-col space-y-1">
        <Skeleton className="h-full w-64 rounded" />
        <Skeleton className="h-full w-32 rounded" />
        <Skeleton className="h-full w-44 rounded" />
      </div>
    </div>
  );
};
