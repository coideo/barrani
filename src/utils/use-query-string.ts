import { useReducer } from 'react';
import { useDebounce } from './use-debounce';

type Obj = Record<string, unknown>;
type ObjUndef = Record<string, unknown | undefined>;

const deleteUndefined = (obj: ObjUndef) => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj as Obj;
};

const useQueryString = (initialValue: ObjUndef, delay = 300) => {
  const [query, setQuery] = useReducer(
    (s: ObjUndef, a: ObjUndef) => deleteUndefined({ ...s, ...a }),
    initialValue
  );
  const qs = useDebounce(query, delay);
  return [qs, setQuery] as const;
};

export { useQueryString };
