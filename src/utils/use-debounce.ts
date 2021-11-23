import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number | null) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (delay === null) return;
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
