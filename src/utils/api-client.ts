type RequestConfig = Omit<globalThis.RequestInit, 'body'> & {
  data?: Record<string, unknown>;
  queryString?: Record<string, string>;
};

const inClient = () => typeof window !== 'undefined';

function doFetch(endpoint: string, { data, queryString, ...customConfig }: RequestConfig) {
  const controller = inClient() ? new AbortController() : undefined;

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    signal: controller?.signal,
    ...customConfig,
  };

  const url = new URL(endpoint);
  url.search = new URLSearchParams(queryString).toString();

  const promise = fetch(url.toString(), config).then(async (r) => {
    const text = await r.text();
    const data = text ? JSON.parse(text) : {};
    if (r.ok) {
      return data;
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ status: r.status, ...data });
    }
  });

  const cancel = () => {
    controller?.abort();
  };
  return Object.assign(promise, { cancel });
}

function client(
  endpoint: string,
  { headers: customHeaders, token, ...customConfig }: RequestConfig & { token?: string } = {}
) {
  return doFetch(endpoint, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    ...customConfig,
  });
}

export { doFetch, client };
