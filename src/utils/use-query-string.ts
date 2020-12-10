import { Dispatch, useReducer } from 'react';
import useDebounce from './use-debounce';

type Obj = Record<string, unknown | undefined>;

const deleteUndefined = (obj: Obj) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj as Record<string, unknown>;
};

const useQueryString = (
  initialValue = {}
): [Record<string, unknown>, Dispatch<Record<string, unknown>>] => {
  const [query, setQuery] = useReducer(
    (s: Obj, a: Obj) => deleteUndefined({ ...s, ...a }),
    initialValue
  );

  const queryString = useDebounce(query, 300);
  return [queryString, setQuery];
};

export default useQueryString;
