export type RequestConfig = Omit<globalThis.RequestInit, 'body'> & {
  data?: Record<string, unknown>;
  queryString?: Record<string, string>;
};

const inClient = () => typeof window !== 'undefined';

const getBase = () => (inClient() ? window.location.origin : undefined);

interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
function doFetch<T>(
  endpoint: string,
  { data, headers: customHeaders, queryString, ...customConfig }: RequestConfig = {}
): CancellablePromise<T> {
  const controller = inClient() ? new AbortController() : undefined;

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    signal: controller?.signal,
    ...customConfig,
  };

  const url = new URL(endpoint, getBase());
  url.search = new URLSearchParams(queryString).toString();

  const promise = fetch(url.toString(), config).then(async (r) => {
    const text = await r.text();
    const data = text ? JSON.parse(text) : {};
    if (r.ok) return data;
    // eslint-disable-next-line prefer-promise-reject-errors
    return await Promise.reject({ status: r.status, ...data });
  }) as CancellablePromise<T>;

  promise.cancel = () => controller?.abort();
  return promise;
}

export { doFetch };
