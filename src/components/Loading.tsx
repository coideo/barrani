import React, { FC } from "react";
import { cn } from "utils/class-names";

const SIZES = {
  xs: "w-1 h-1",
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2 h-2",
  xl: "w-2.5 h-2.5",
};

type Size = keyof typeof SIZES;
const Sizes = Object.fromEntries(Object.keys(SIZES).map((s) => [s, s])) as { [key in Size]: key };

const Dot: FC<{ className: string; size: Size }> = ({ className, size }) => (
  <i className={cn("mx-px inline-block animate-blink rounded-full", className, SIZES[size])} />
);

const Loading = ({
  className = "bg-gray-900 dark:bg-gray-100",
  size = "md",
}: {
  className?: string;
  size?: Size;
}) => {
  return (
    <div className="relative inline-flex h-full w-full items-center">
      <span className="absolute inset-0 flex h-full w-full select-none items-center justify-center">
        <Dot className={cn(className, "animation-delay-0")} size={size} />
        <Dot className={cn(className, "animation-delay-200")} size={size} />
        <Dot className={cn(className, "animation-delay-400")} size={size} />
      </span>
    </div>
  );
};

Loading.Sizes = Sizes;

export default Loading;
