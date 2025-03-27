import type { InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import { onlineManager } from 'react-query';
import { ApiError } from './apiError';
import { logAxiosError, logGraphQLError } from './logging';
import { DefinedErrors, checkIfLoopingError, getRequestName, isCodeNetworkError, isExpectedError } from './utils';
import { handleSSOIfErrorExists } from '../auth/sso/ssoHandler';
import { appVersion } from '../libs/appVersion';
import { getEnvConfig } from '../utils/env';
import { generateUUID } from '../utils/numbers';
import { createSentryError, logException } from '../utils/sentry';

// timeout to reach server
// longtime running request in background could block e2e test thread, so we need to set a shorter timeout for e2e
export const API_ABORT_TIMEOUT_MS = getEnvConfig().IS_E2E === 'true' ? 20000 : 30000;
// timeout server response
export const API_REQUEST_TIMEOUT_MS = getEnvConfig().IS_E2E === 'true' ? 20000 : 30000;

/**
 * RequestEditor exposes a hook allowing editing of the outgoing HTTP request
 */
export type RequestEditor = (config: InternalAxiosRequestConfig) => Promise<void>;

type HttpClientOptions = {
  requestEditor?: RequestEditor;
  abortTimeoutMs: number;
  requestTimeoutMs: number;
};

export const createDefaultHttpClientOptions = (requestEditor?: RequestEditor) => ({
  requestEditor,
  abortTimeoutMs: API_ABORT_TIMEOUT_MS,
  requestTimeoutMs: API_REQUEST_TIMEOUT_MS,
});

export const createHttpClient = (
  { abortTimeoutMs, requestEditor, requestTimeoutMs }: HttpClientOptions = createDefaultHttpClientOptions()
) => {
  const newAbortSignal = (timeoutMs: number) => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
      clearTimeout(timeoutId);
    }, timeoutMs);

    return abortController.signal;
  };

  const instance = axios.create({
    // time out for  response
    timeout: requestTimeoutMs,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const loggedLoopingErrors: Set<string> = new Set();

  const logLoopingErrorIfThereIsOne = (error: AxiosError, source: 'request' | 'response') => {
    const queryName = getRequestName(error.config);
    const queryIsLooping = checkIfLoopingError(queryName);
    if (queryIsLooping && !loggedLoopingErrors.has(queryName)) {
      const loopError = createSentryError(
        `EbenPotentialLoopQuery: ${queryName} ${source}`,
        `${queryName} could be looping`
      );

      logException(loopError);

      // Mark the query as logged to avoid future duplicate logging
      loggedLoopingErrors.add(queryName);
    }
  };

  const handleNetworkErrors = (error: AxiosError, source: 'request' | 'response') => {
    // check if the error is looping
    logLoopingErrorIfThereIsOne(error, source);

    // There was a problem with the request configuration or network connectivity.
    // check list of "axios identified error" here: https://www.npmjs.com/package/axios#error-types

    if (isExpectedError(error.code)) {
      // expected error is logged somewhere else, so we should avoid sending duplicate logs
      throw ApiError.expectedError(error, source);
    }
    if (isCodeNetworkError(error.code)) {
      // Network error, don't send a report
      throw ApiError.networkError(error, source);
    }

    throw logAxiosError(error, source);
  };

  instance.interceptors.request.use(
    async c => {
      const config = c;
      if (!onlineManager.isOnline()) {
        throw new AxiosError(DefinedErrors.NO_INTERNET_CONNECTION.message, DefinedErrors.NO_INTERNET_CONNECTION.code);
      }

      config.headers.set('X-Money-App-Version', appVersion.CURRENT_PERSONAL_VERSION);

      if (requestEditor) {
        await requestEditor(config);
      }

      config.headers.set('X-Request-Id', generateUUID());

      config.signal = newAbortSignal(abortTimeoutMs);

      return config;
    },
    (error: AxiosError) => {
      handleNetworkErrors(error, 'request');
    }
  );

  instance.interceptors.response.use(
    async response => {
      // A GraphQL error response HTTP code is 200, so we need to check for those errors this way
      // (see https://graphql.org/learn/serving-over-http/#response)
      const { errors } = response.data;
      if (Array.isArray(errors) && errors.length > 0) {
        try {
          // If the error is an SSO error, we need to handle it before logging to Sentry
          const apiError = ApiError.fromGraphQL(errors[0].message, response.config);
          await handleSSOIfErrorExists(apiError, response.config, instance);
        } catch {
          throw logGraphQLError(response, errors);
        }
      }

      return response;
    },
    async (error: AxiosError) => {
      try {
        await handleSSOIfErrorExists(error, error?.config, instance);
      } catch {
        handleNetworkErrors(error, 'response');
      }
    }
  );
  return instance;
};
