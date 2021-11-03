export type RequestConfig = Omit<globalThis.RequestInit, 'body'> & {
  data?: Record<string, unknown>;
  queryString?: Record<string, string>;
  signal?: AbortSignal;
};

const getBase = () => (typeof window !== 'undefined' ? window.location.origin : undefined);

async function doFetch<T>(
  endpoint: string,
  { data, headers, queryString, ...customConfig }: RequestConfig = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customConfig,
  };

  const url = new URL(endpoint, getBase());
  url.search = new URLSearchParams(queryString).toString();

  return await fetch(url.toString(), config).then(async (r) => {
    const text = await r.text();
    const data = text ? JSON.parse(text) : {};
    if (r.ok) return data as T;

    // eslint-disable-next-line prefer-promise-reject-errors
    return await Promise.reject({ status: r.status, ...data });
  });
}

export { doFetch };
