import { useReducer } from "react";

import { useDebounce } from "./use-debounce";

const deleteUndefined = (obj: Record<string, string | undefined>) => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);

  return obj as Record<string, string>;
};

const useQueryString = (initialValue: Record<string, string>, delay = 300) => {
  const [query, dispatch] = useReducer(
    (s: Record<string, string>, a: Record<string, string | undefined>) =>
      deleteUndefined({ ...s, ...a }),
    initialValue,
  );
  const qs = useDebounce(query, delay);

  return [qs, dispatch] as const;
};

export { useQueryString };
