import { Dispatch, useCallback, useLayoutEffect, useReducer, useRef } from 'react';

type Status = 'idle' | 'resolved' | 'rejected' | 'pending';
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
const defaultInitialState: AsyncState<null> = { status: 'idle', data: null, error: null };
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

  const setData = useCallback((data: T | null) => safeSetState({ data, status: 'resolved' }), [
    safeSetState,
  ]);
  const setError = useCallback((error: Error) => safeSetState({ error, status: 'rejected' }), [
    safeSetState,
  ]);
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  const run = useCallback(
    (promise: Promise<T>) => {
      safeSetState({ status: 'pending' });
      return promise.then(
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
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

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
