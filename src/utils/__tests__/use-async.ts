import { act, renderHook } from '@testing-library/react-hooks';
import { useAsync } from '../use-async';

beforeEach(() => {
  jest.spyOn(console, 'error');
});

afterEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line no-console
  console.error.mockRestore();
});

function deferred<T>(): {
  promise: Promise<T>;
  resolve?: (value?: T | PromiseLike<T> | undefined) => void;
  reject?: (reason?: unknown) => void;
} {
  let res, rej;
  const promise = new Promise<T>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  return { promise, resolve: res, reject: rej };
}

const defaultState = {
  status: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  reset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

const pendingState = {
  ...defaultState,
  status: 'pending',
  isIdle: false,
  isLoading: true,
};

const resolvedState = {
  ...defaultState,
  status: 'resolved',
  isIdle: false,
  isSuccess: true,
};

const rejectedState = {
  ...defaultState,
  status: 'rejected',
  isIdle: false,
  isError: true,
};

test('calling run with a promise which resolves', async () => {
  const { promise, resolve } = deferred();
  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);
  let p: Promise<unknown>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(pendingState);
  const resolvedValue = Symbol('resolved value');
  await act(async () => {
    resolve?.(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  });

  act(() => {
    result.current.reset();
  });
  expect(result.current).toEqual(defaultState);
});

test('calling run with a promise which rejects', async () => {
  const { promise, reject } = deferred();
  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);
  let p: Promise<unknown>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(pendingState);
  const rejectedValue = Symbol('rejected value');
  await act(async () => {
    reject?.(rejectedValue);
    await p.catch(() => {
      /* ignore erorr */
    });
  });
  expect(result.current).toEqual({ ...rejectedState, error: rejectedValue });
});

test('can specify an initial state', () => {
  const mockData = Symbol('resolved value');
  const customInitialState: { status: 'resolved'; data: symbol } = {
    status: 'resolved',
    data: mockData,
  };
  const { result } = renderHook(() => useAsync(customInitialState));
  expect(result.current).toEqual({
    ...resolvedState,
    ...customInitialState,
  });
});

test('can set the data', () => {
  const mockData = Symbol('resolved value');
  const { result } = renderHook(() => useAsync());
  act(() => {
    result.current.setData(mockData);
  });
  expect(result.current).toEqual({
    ...resolvedState,
    data: mockData,
  });
});

test('can set the error', () => {
  const mockError = Error('rejected value');
  const { result } = renderHook(() => useAsync());
  act(() => {
    result.current.setError(mockError);
  });
  expect(result.current).toEqual({
    ...rejectedState,
    error: mockError,
  });
});

test('No state updates happen if the component is unmounted while pending', async () => {
  const { promise, resolve } = deferred();
  const { result, unmount } = renderHook(() => useAsync());
  let p: Promise<unknown>;
  act(() => {
    p = result.current.run(promise);
  });
  unmount();
  await act(async () => {
    resolve?.();
    await p;
  });

  // eslint-disable-next-line no-console
  expect(console.error).not.toHaveBeenCalled();
});
