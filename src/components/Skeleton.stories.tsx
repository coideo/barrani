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
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
      <div className="flex flex-col space-y-1">
        <Skeleton className="w-64 h-full rounded" />
        <Skeleton className="w-32 h-full rounded" />
        <Skeleton className="h-full rounded w-44" />
      </div>
    </div>
  );
};
