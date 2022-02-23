export type RequestConfig = Omit<globalThis.RequestInit, "body"> & {
  data?: Record<string, unknown>;
  queryString?: Record<string, string>;
};

const getBase = () => (typeof window !== "undefined" ? window.location.origin : undefined);

async function doFetch<T>(
  endpoint: string,
  { data: body, headers, queryString, ...customConfig }: RequestConfig = {},
) {
  const config = {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
    headers: { "Content-Type": "application/json", ...headers },
    ...customConfig,
  };

  const url = new URL(endpoint, getBase());

  url.search = new URLSearchParams(queryString).toString();

  const r = await fetch(url.toString(), config);
  const text = await r.text();
  const data: T = text ? JSON.parse(text) : {};

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (!r.ok) throw { status: r.status, ...data };

  return data;
}

export { doFetch };
