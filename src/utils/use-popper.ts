import { createPopper, Options } from "@popperjs/core";
import { RefCallback, useRef, useCallback, useMemo } from "react";

function usePopper(
  options?: Partial<Options>,
): [RefCallback<Element | null>, RefCallback<HTMLElement | null>] {
  const reference = useRef<Element | null>(null);
  const popper = useRef<HTMLElement | null>(null);

  const cleanupCallback = useRef<() => void>();

  const instantiatePopper = useCallback(() => {
    if (!reference.current) return;
    if (!popper.current) return;

    if (cleanupCallback.current) cleanupCallback.current();

    cleanupCallback.current = createPopper(reference.current, popper.current, options).destroy;
  }, [options]);

  return useMemo(
    () => [
      (referenceDomNode) => {
        reference.current = referenceDomNode;
        instantiatePopper();
      },
      (popperDomNode) => {
        popper.current = popperDomNode;
        instantiatePopper();
      },
    ],
    [instantiatePopper],
  );
}

export default usePopper;
