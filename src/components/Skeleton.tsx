import React, { FC } from 'react';
import { cn } from 'utils';

const Sekeleton = ({ className, wrapper: Wrapper }: { className?: string; wrapper?: FC }) => {
  const element = (
    <span className={cn(className, 'inline-block leading-none bg-gray-200 animate-pulse')}>
      &zwnj;
    </span>
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
