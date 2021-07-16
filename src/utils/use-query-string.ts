import { useMemo } from 'react';
import { useDebounce } from './use-debounce';

type Obj = Record<string, unknown>;
type ObjUndef = Record<string, unknown | undefined>;

const deleteUndefined = (obj: ObjUndef) => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj as Obj;
};

const useQueryString = (query: ObjUndef, delay = 300) => {
  const qs = useMemo(() => deleteUndefined(query), [query]);
  return useDebounce(qs, delay);
};

export { useQueryString };
