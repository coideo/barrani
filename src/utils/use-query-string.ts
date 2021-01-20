import { Dispatch, useReducer } from 'react';
import { useDebounce } from './use-debounce';

type Obj = Record<string, unknown>;
type ObjUndef = Record<string, unknown | undefined>;

const deleteUndefined = (obj: ObjUndef) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj as Obj;
};

const useQueryString = (initialValue = {}): [Obj, Dispatch<Obj>] => {
  const [query, setQuery] = useReducer(
    (s: ObjUndef, a: ObjUndef) => deleteUndefined({ ...s, ...a }),
    initialValue
  );

  const queryString = useDebounce(query, 300);
  return [queryString, setQuery];
};

export { useQueryString };
