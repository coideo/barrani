import { Dispatch, useCallback, useLayoutEffect, useReducer, useRef } from 'react';

export enum Status {
  IDLE = 'idle',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

type AsyncState<T> = {
  status: Status;
  data: T | null;
  error: Error | null;
};

function useSafeDispatch<T>(dispatch: Dispatch<Partial<AsyncState<T>>>) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(
    (args: Partial<AsyncState<T>>) => (mounted.current ? dispatch(args) : undefined),
    [dispatch]
  );
}

// Example usage:
// const {data, error, status, run} = useAsync()
// useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState: AsyncState<null> = { status: Status.IDLE, data: null, error: null };
function useAsync<T>(initialState?: Partial<AsyncState<T>>) {
  const initialStateRef = useRef<AsyncState<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = useReducer(
    (s: AsyncState<T>, a: Partial<AsyncState<T>>): AsyncState<T> => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback((data: T | null) => safeSetState({ data, status: Status.RESOLVED }), [
    safeSetState,
  ]);
  const setError = useCallback((error: Error) => safeSetState({ error, status: Status.REJECTED }), [
    safeSetState,
  ]);
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  const run = useCallback(
    async (promise: Promise<T>) => {
      safeSetState({ status: Status.PENDING });
      return await promise.then(
        (data: T) => {
          setData(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          return error;
        }
      );
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
