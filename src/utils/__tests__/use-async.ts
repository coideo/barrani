/* eslint-disable no-console */
import { act, renderHook } from '@testing-library/react-hooks';
import { Status, useAsync } from '../use-async';

const original = console.error;

beforeEach(() => {
  jest.spyOn(console, 'error');
});

afterEach(() => {
  console.error = original;
});

const deferred = <T>() => {
  let res: (value: T | PromiseLike<T>) => void | undefined;
  let rej: (reason?: unknown) => void | undefined;
  const promise = new Promise<T>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  // @ts-expect-error Variable is used before being assigned.
  return { promise, resolve: res, reject: rej };
};

const defaultState = {
  status: Status.IDLE,
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
  status: Status.PENDING,
  isIdle: false,
  isLoading: true,
};

const resolvedState = {
  ...defaultState,
  status: Status.RESOLVED,
  isIdle: false,
  isSuccess: true,
};

const rejectedState = {
  ...defaultState,
  status: Status.REJECTED,
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
  const customInitialState: { status: Status.RESOLVED; data: symbol } = {
    status: Status.RESOLVED,
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
    resolve?.(null);
    await p;
  });

  // eslint-disable-next-line no-console
  expect(console.error).not.toHaveBeenCalled();
});

test('without data, can set the data with previous func', async () => {
  const { result } = renderHook(() => useAsync<number>());

  act(() => {
    result.current.setData((prev) => (prev ?? 0) + 1);
  });

  expect(result.current).toEqual({
    ...resolvedState,
    data: 1,
  });
});

test('with data, can set the data with previous func', async () => {
  const { result } = renderHook(() => useAsync<number>());

  act(() => {
    result.current.setData(1);
  });

  act(() => {
    result.current.setData((prev) => (prev ?? 0) + 1);
  });

  expect(result.current).toEqual({
    ...resolvedState,
    data: 2,
  });
});

test('with data of previous func, can set the data', async () => {
  const { result } = renderHook(() => useAsync<number>());

  act(() => {
    result.current.setData((prev) => (prev ?? 0) + 1);
  });

  act(() => {
    result.current.setData(5);
  });

  expect(result.current).toEqual({
    ...resolvedState,
    data: 5,
  });
});
