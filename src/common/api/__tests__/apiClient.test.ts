import type { IncomingHttpHeaders, RequestListener } from 'http';
import * as http from 'http';
import type net from 'net';
import { AxiosError } from 'axios';
import { mockServerNode } from '../../../mock-server/mockServerNode';
import {
  CashbackDeleteCardDocument,
  CashbackOnboardUserDocument,
  GetCurrentUserDocument,
  GetHeroPointsBalanceDocument,
  InitiateEWalletSetupDocument,
} from '../../../new-graphql/generated';
import { appVersion } from '../../libs/appVersion';
import * as trackErrorModule from '../../utils/sentry';
import { authHttpClient } from '../authClient';
import { bffEditor } from '../bffClient';
import { createDefaultHttpClientOptions, createHttpClient } from '../httpClient';
import * as tokenModule from '../tokens';
import { DefinedErrorCode } from '../utils';

const createBaseServer = async (cb: RequestListener) => {
  const server = http.createServer(cb);
  server.listen();
  const addr = await new Promise<net.AddressInfo>(resolve => {
    server.on('listening', () => {
      resolve(server.address() as net.AddressInfo);
    });
  });
  return {
    close: () => server.close(),
    baseUrl: `http://localhost:${addr.port}`,
  };
};

const createResponsiveServer = async (statusCode: number, rv?: object) => {
  return createBaseServer((_req, res) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    if (rv) {
      res.end(JSON.stringify(rv));
    } else {
      res.end();
    }
  });
};

const createTimeoutServer = async (timeoutMs: number) => {
  return createBaseServer((_req, res) => {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end();
    }, timeoutMs);
  });
};

describe('Api Client', () => {
  beforeAll(() => {
    mockServerNode.close();
  });

  describe('Errors', () => {
    describe('GraphQL errors', () => {
      it.each([
        [CashbackDeleteCardDocument, 'CashbackDeleteCard'],
        [CashbackOnboardUserDocument, 'CashbackOnboardUser'],
        [InitiateEWalletSetupDocument, 'initiateEWalletSetup'],
        [GetCurrentUserDocument, 'GetCurrentUser'],
        [GetHeroPointsBalanceDocument, 'GetHeroPointsBalance'],
      ])('should be re-thrown in correct format', async (query, queryName) => {
        const server = await createResponsiveServer(200, { errors: [{ message: 'mock error' }] });
        const client = createHttpClient();

        const fn = async () => client.post(server.baseUrl, { query });

        await expect(fn).rejects.toThrow();
        await expect(fn).rejects.toHaveProperty('name', `EBenGraphqlError: ${queryName}`);
        await expect(fn).rejects.toHaveProperty('message', `EBenGraphqlError: ${queryName}: mock error`);

        server.close();
      });

      it.each([
        [CashbackDeleteCardDocument, 'CashbackDeleteCard'],
        [CashbackOnboardUserDocument, 'CashbackOnboardUser'],
        [InitiateEWalletSetupDocument, 'initiateEWalletSetup'],
        [GetCurrentUserDocument, 'GetCurrentUser'],
        [GetHeroPointsBalanceDocument, 'GetHeroPointsBalance'],
      ])('should be logged to sentry in correct format', async (query, queryName) => {
        const mockLogError = jest.spyOn(trackErrorModule, 'logException');
        const server = await createResponsiveServer(200, { errors: [{ message: 'mock error' }] });
        const client = createHttpClient();

        try {
          await client.post(server.baseUrl, { query });
        } catch (e) {
          // this space intentionally left blank
        }

        expect(mockLogError).toHaveBeenCalledTimes(1);
        expect(mockLogError).toHaveBeenCalledWith(
          expect.objectContaining({
            name: `EBenGraphqlError: ${queryName}`,
            message: `EBenGraphqlError: ${queryName}: mock error`,
          }),
          expect.anything()
        );

        server.close();
      });
    });

    describe('HTTP errors (GraphQL)', () => {
      it.each([
        [CashbackDeleteCardDocument, 'CashbackDeleteCard'],
        [CashbackOnboardUserDocument, 'CashbackOnboardUser'],
        [InitiateEWalletSetupDocument, 'initiateEWalletSetup'],
        [GetCurrentUserDocument, 'GetCurrentUser'],
        [GetHeroPointsBalanceDocument, 'GetHeroPointsBalance'],
      ])('should be re-thrown in correct format', async (query, queryName) => {
        const server = await createResponsiveServer(666);
        const client = createHttpClient();

        const fn = async () => client.post(server.baseUrl, { query });
        await expect(fn).rejects.toThrow();
        await expect(fn).rejects.toHaveProperty('name', `EBenResponseError: ${queryName}`);
        await expect(fn).rejects.toHaveProperty(
          'message',
          `EBenResponseError: ${queryName}: Request failed with status code 666`
        );

        server.close();
      });

      it.each([
        [CashbackDeleteCardDocument, 'CashbackDeleteCard'],
        [CashbackOnboardUserDocument, 'CashbackOnboardUser'],
        [InitiateEWalletSetupDocument, 'initiateEWalletSetup'],
        [GetCurrentUserDocument, 'GetCurrentUser'],
        [GetHeroPointsBalanceDocument, 'GetHeroPointsBalance'],
      ])('should be logged to sentry in correct format', async (query, queryName) => {
        const mockLogError = jest.spyOn(trackErrorModule, 'logException');
        const server = await createResponsiveServer(666);
        const client = createHttpClient();

        try {
          await client.post(server.baseUrl, { query });
        } catch (e) {
          // This space intentionally left blank
        }

        expect(mockLogError).toHaveBeenCalledTimes(1);
        expect(mockLogError).toHaveBeenCalledWith(
          expect.objectContaining({
            name: `EBenResponseError: ${queryName}`,
            message: `EBenResponseError: ${queryName}: Request failed with status code 666`,
          }),
          expect.anything()
        );

        server.close();
      });
    });

    describe('HTTP errors (non-GraphQL)', () => {
      it('should return correct error format', async () => {
        const server = await createResponsiveServer(666);
        const client = createHttpClient();
        const url = `${server.baseUrl}/auth/refresh`;

        const fn = async () => client.get(url);

        await expect(fn).rejects.toThrow();
        await expect(fn).rejects.toHaveProperty('name', `EBenResponseError: ${url}`);
        await expect(fn).rejects.toHaveProperty(
          'message',
          `EBenResponseError: ${url}: Request failed with status code 666`
        );

        server.close();
      });

      it('should log to Sentry in correct format', async () => {
        const mockLogError = jest.spyOn(trackErrorModule, 'logException');
        const server = await createResponsiveServer(666);
        const client = createHttpClient();
        const url = `${server.baseUrl}/auth/refresh`;

        try {
          await client.get(url);
        } catch (e) {
          // This space intentionally left blank
        }

        expect(mockLogError).toHaveBeenCalledTimes(1);
        expect(mockLogError).toHaveBeenCalledWith(
          expect.objectContaining({
            name: `EBenResponseError: ${url}`,
            message: `EBenResponseError: ${url}: Request failed with status code 666`,
          }),
          expect.anything()
        );

        server.close();
      });
    });

    describe('Network Errors', () => {
      it.each`
        code                       | abortTimeoutMs | requestTimeoutMs | msg
        ${AxiosError.ECONNABORTED} | ${1000}        | ${10}            | ${'Network Error'}
        ${AxiosError.ERR_CANCELED} | ${10}          | ${1000}          | ${'Network Error'}
      `('should format network errors', async ({ abortTimeoutMs, code, msg, requestTimeoutMs }) => {
        const server = await createTimeoutServer(100);

        const client = createHttpClient({
          abortTimeoutMs,
          requestTimeoutMs,
        });

        const fn = async () => client.get(server.baseUrl);
        await expect(fn).rejects.toThrow();
        await expect(fn).rejects.toHaveProperty('name', `EBenResponseError: ${server.baseUrl}`);
        await expect(fn).rejects.toHaveProperty('message', msg);
        await expect(fn).rejects.toHaveProperty('code', code);

        server.close();
      });

      it.each`
        abortTimeoutMs | requestTimeoutMs
        ${1000}        | ${10}
        ${10}          | ${1000}
      `('should not log network errors', async ({ abortTimeoutMs, requestTimeoutMs }) => {
        const mockLogError = jest.spyOn(trackErrorModule, 'logException');
        const server = await createTimeoutServer(100);

        const client = createHttpClient({
          abortTimeoutMs,
          requestTimeoutMs,
        });

        const fn = async () => client.get(server.baseUrl);
        await expect(fn).rejects.toThrow();
        expect(mockLogError).toHaveBeenCalledTimes(0);

        server.close();
      });
    });

    describe('Expected Errors', () => {
      it.each`
        code                                  | msg
        ${DefinedErrorCode.NO_EBEN_TOKEN}     | ${'Missing eben access token'}
        ${DefinedErrorCode.NO_SUPERAPP_TOKEN} | ${'Missing super app token'}
      `('should return correct error and not send sentry log', async ({ code, msg }) => {
        const mockLogError = jest.spyOn(trackErrorModule, 'logException');

        const client = createHttpClient();
        jest.spyOn(client, 'post').mockImplementationOnce(() => {
          throw new AxiosError(msg, code);
        });

        const fn = async () => client.post('');
        try {
          await fn();
        } catch (e) {
          expect((e as AxiosError).message).toBe(msg);
          expect((e as AxiosError).code).toBe(code);
        }

        expect(mockLogError).not.toHaveBeenCalled();
      });
    });
  });

  describe('Headers', () => {
    it('should send EH token when account is EH', async () => {
      jest.spyOn(tokenModule, 'getAppToken').mockResolvedValue({
        superAppToken: 'superAppTokenEH',
        ebenToken: 'ebenToken',
        loginProvider: 'eh',
      });

      let headers: IncomingHttpHeaders = {};
      const server = await createBaseServer((req, res) => {
        ({ headers } = req);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(`the x-eh-session-token header: ${req.headers['x-eh-session-token']}`);
      });

      const client = createHttpClient(createDefaultHttpClientOptions(bffEditor));
      const response = await client.get(server.baseUrl);

      expect(response.data).toEqual('the x-eh-session-token header: superAppTokenEH');
      expect(headers['x-eh-session-token']).toEqual('superAppTokenEH');
      expect(headers.authorization).toEqual('Bearer ebenToken');
      expect(headers['x-keypay-token']).toBeUndefined();
      expect(headers['x-money-app-version']).toEqual(appVersion.CURRENT_PERSONAL_VERSION);

      server.close();
    });

    it('should send KeyPay token when account is KeyPay', async () => {
      jest.spyOn(tokenModule, 'getAppToken').mockResolvedValue({
        superAppToken: 'superAppTokenKP',
        ebenToken: 'ebenToken',
        loginProvider: 'kp',
      });
      let headers: IncomingHttpHeaders = {};
      const server = await createBaseServer((req, res) => {
        ({ headers } = req);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(`the x-keypay-token header: ${req.headers['x-keypay-token']}`);
      });

      const client = createHttpClient(createDefaultHttpClientOptions(bffEditor));
      const response = await client.get(server.baseUrl);

      if (!headers) {
        throw new Error(`satisfy typescript`);
      }

      expect(response.data).toEqual('the x-keypay-token header: superAppTokenKP');
      expect(headers['x-keypay-token']).toEqual('superAppTokenKP');
      expect(headers.authorization).toEqual('Bearer ebenToken');
      expect(headers['x-eh-session-token']).toBeUndefined();
      expect(headers['x-money-app-version']).toEqual(appVersion.CURRENT_PERSONAL_VERSION);

      server.close();
    });

    it('should not add any additional headers when using the authHttpClient', async () => {
      let headers: IncomingHttpHeaders = {};
      const server = await createBaseServer((req, res) => {
        ({ headers } = req);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end();
      });

      const response = await authHttpClient.get(server.baseUrl);

      if (!headers) {
        throw new Error(`satisfy typescript`);
      }

      expect(response.data).toEqual('');
      expect(headers['x-keypay-token']).toBeUndefined();
      expect(headers.authorization).toBeUndefined();
      expect(headers['x-eh-session-token']).toBeUndefined();
      expect(headers['x-money-app-version']).toEqual(appVersion.CURRENT_PERSONAL_VERSION);

      server.close();
    });
  });

  describe('Sentry', () => {
    it('X-Request-Id should be logged when available', async () => {
      const mockLogError = jest.spyOn(trackErrorModule, 'logException');
      const server = await createBaseServer((req, res) => {
        res.writeHead(666, {
          'Content-Type': 'application/json',
          'X-Request-Id': req.headers['x-request-id'], // send req id back in response
        });
        res.end();
      });
      const client = createHttpClient();

      try {
        await client.get(server.baseUrl);
      } catch (e) {
        // This space intentionally left blank
      }

      expect(mockLogError).toHaveBeenCalledTimes(1);
      expect(mockLogError).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          requestHeaders: expect.objectContaining({
            'X-Request-Id': expect.anything(),
          }),
          responseHeaders: expect.objectContaining({
            'x-request-id': expect.anything(), // NB: axios normalises headers
          }),
        })
      );

      server.close();
    });

    describe('protect sensitive information', () => {
      it.each(['authorization', 'x-eh-session-token', 'x-keypay-token'])(
        'should hash the secret when sending the log',
        async headerName => {
          const mockLogError = jest.spyOn(trackErrorModule, 'logException');
          const server = await createResponsiveServer(666);
          const client = createHttpClient();

          try {
            await client.get(server.baseUrl, {
              headers: {
                [headerName]: '1234',
              },
            });
          } catch (e) {
            // This space intentionally left blank
          }

          expect(mockLogError).toHaveBeenCalledTimes(1);
          expect(mockLogError).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
              requestHeaders: expect.objectContaining({
                [headerName]: '***',
              }),
            })
          );

          server.close();
        }
      );
    });

    it('should log response headers', async () => {
      const mockLogError = jest.spyOn(trackErrorModule, 'logException');
      const server = await createResponsiveServer(666);
      const client = createHttpClient();

      try {
        await client.get(server.baseUrl, {
          headers: {
            'X-So-Style': 'oh yeah',
          },
        });
      } catch (e) {
        // This space intentionally left blank
      }

      expect(mockLogError).toHaveBeenCalledTimes(1);
      expect(mockLogError).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          requestHeaders: expect.objectContaining({
            'X-So-Style': 'oh yeah',
          }),
        })
      );

      server.close();
    });

    it('should log request headers', async () => {
      const mockLogError = jest.spyOn(trackErrorModule, 'logException');
      const server = await createBaseServer((_req, res) => {
        res.writeHead(666, {
          'Content-Type': 'application/json',
          'X-So-Style': 'oh yeah',
        });
        res.end();
      });
      const client = createHttpClient();

      try {
        await client.get(server.baseUrl);
      } catch (e) {
        // This space intentionally left blank
      }

      expect(mockLogError).toHaveBeenCalledTimes(1);
      expect(mockLogError).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          responseHeaders: expect.objectContaining({
            'x-so-style': 'oh yeah',
          }),
        })
      );

      server.close();
    });
  });
});
