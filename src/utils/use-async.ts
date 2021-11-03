import { Dispatch, SetStateAction, useCallback, useLayoutEffect, useReducer, useRef } from 'react';

export enum Status {
  IDLE = 'idle',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

type AsyncState<T> = {
  status: Status;
  data?: T;
  error: Error | null;
};

type AnyFunc = (...args: unknown[]) => unknown;
type PartialState<T> = Partial<AsyncState<T>>;
type SetState<T> = PartialState<T> | ((prev: AsyncState<T>) => PartialState<T>);
// type SafeDispatch<T> = Dispatch<SetState<T>>

function useSafeDispatch<T>(dispatch: Dispatch<SetState<T>>) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(
    (args: SetState<T>) => (mounted.current ? dispatch(args) : undefined),
    [dispatch]
  );
}

// Example usage:
// const {data, error, status, run} = useAsync()
// useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = { status: Status.IDLE, data: undefined, error: null };
function useAsync<T>(initialState?: PartialState<T>) {
  const initialStateRef = useRef<AsyncState<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = useReducer(
    (s: AsyncState<T>, a: SetState<T>) => ({ ...s, ...(typeof a === 'function' ? a(s) : a) }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data: T extends AnyFunc ? never : SetStateAction<T | undefined>) =>
      safeSetState((prev) => ({
        data: typeof data === 'function' ? data(prev.data) : data,
        status: Status.RESOLVED,
      })),
    [safeSetState]
  );
  const setError = useCallback(
    (error: Error) => safeSetState({ error, status: Status.REJECTED }),
    [safeSetState]
  );
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  const run = useCallback(
    async (promise: Promise<T extends AnyFunc ? never : T>): Promise<T> => {
      safeSetState({ status: Status.PENDING });
      return await promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === Status.IDLE,
    isLoading: status === Status.PENDING,
    isError: status === Status.REJECTED,
    isSuccess: status === Status.RESOLVED,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
