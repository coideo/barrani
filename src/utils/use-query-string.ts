import { useReducer } from "react";

import { useDebounce } from "./use-debounce";

function deleteUndefined<T extends Record<string, string>>(obj: Partial<T>) {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);

  return obj as T;
}

function useQueryString<T extends Record<string, string>>(initialValue: T, delay = 300) {
  const [query, dispatch] = useReducer(
    (s: T, a: Partial<T>) => deleteUndefined<T>({ ...s, ...a }),
    initialValue,
  );
  const qs = useDebounce(query, delay);

  return [qs, dispatch] as const;
}

export { useQueryString };
