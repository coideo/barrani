import React, { FC } from "react";
import { cn } from "utils";

const Sekeleton = ({
  className,
  wrapper: Wrapper,
}: {
  className?: string;
  wrapper?: FC<{ children?: React.ReactNode }>;
}) => {
  const element = (
    <span className={cn(className, "inline-block animate-pulse leading-none")}>&zwnj;</span>
  );

  return (
    <span>
      {Wrapper ? (
        <Wrapper>
          {element}
          &zwnj;
        </Wrapper>
      ) : (
        element
      )}
    </span>
  );
};

export default Sekeleton;
