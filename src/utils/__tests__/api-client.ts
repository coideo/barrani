import { MockedRequest, rest } from 'msw';
import { setupServer } from 'msw/node';
import { doFetch } from '../api-client';

const server = setupServer();

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'http://test-endpoint';
  const mockResult = { mockValue: 'VALUE' };
  server.use(
    rest.get(endpoint, async (_, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await doFetch(endpoint);

  expect(result).toEqual(mockResult);
});

test('allows for config overrides', async () => {
  let request: MockedRequest | undefined;
  const endpoint = 'http://test-endpoint';
  const mockResult = { mockValue: 'VALUE' };
  server.use(
    rest.get(endpoint, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  const customConfig = {
    mode: 'cors' as globalThis.RequestMode,
    headers: { 'Content-Type': 'fake-type' },
  };

  await doFetch(endpoint, customConfig);

  expect(request?.mode).toBe(customConfig.mode);
  expect(request?.headers.get('Content-Type')).toBe(customConfig.headers['Content-Type']);
});

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const endpoint = 'http://test-endpoint';
  server.use(
    rest.post(endpoint, async (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );

  const data = { a: 'b' };
  const result = await doFetch(endpoint, { data });

  expect(result).toEqual(data);
});

test(`correctly rejects the promise if there's an error`, async () => {
  const testError = { message: 'Test error' };
  const endpoint = 'http://test-endpoint';
  server.use(
    rest.get(endpoint, async (_, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError));
    })
  );

  const error = await doFetch(endpoint).catch((e) => e);

  expect(error).toEqual({ status: 400, ...testError });
});

test(`correctly parse text response`, async () => {
  const endpoint = 'http://test-endpoint';
  server.use(
    rest.get(endpoint, async (_, res, ctx) => {
      return res(ctx.text(''));
    })
  );

  const result = await doFetch(endpoint);

  expect(result).toEqual({});
});

test('throw AbortError if request is canceled', async () => {
  const endpoint = 'http://test-endpoint';
  server.use(
    rest.get(endpoint, async (_, res, ctx) => {
      return res(ctx.json({}));
    })
  );

  const promise = doFetch(endpoint);
  promise.cancel();
  const error = (await promise.catch((e) => e)) as { name: string };

  expect(error.name).toEqual('AbortError');
});
