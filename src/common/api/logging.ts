import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './apiError';
import type { GraphQLError } from './graphql';
import { getRequestName } from './utils';
import { logException } from '../utils/sentry';

/**
 * Sanitise headers for logging. Returns a copy of the map and leaves the original object untouched.
 * @param headers
 */
const sanitiseHeaders = (headers?: Record<string, unknown>): Record<string, unknown> | null => {
  if (!headers) {
    return null;
  }
  const sanitised: Record<string, unknown> = {};
  Object.keys(headers).forEach(key => {
    switch (key.toLowerCase()) {
      case 'authorization':
      case 'x-eh-session-token':
      case 'x-keypay-token':
        sanitised[key] = '***';
        break;
      default:
        sanitised[key] = headers[key];
        break;
    }
  });
  return sanitised;
};

const axiosConfigMeta = (config?: AxiosRequestConfig): Record<string, unknown> => ({
  method: config?.method?.toUpperCase() || 'UNKNOWN',
  url: config?.url || 'UNKNOWN',
});

const axiosResponseMeta = (response?: AxiosResponse): Record<string, unknown> => ({
  status: response?.status || null,
  statusText: response?.statusText || null,
});

/**
 * Log Axios error to Sentry and return a formatted error object
 * @param e
 * @param type
 */
export const logAxiosError = (e: AxiosError, type: 'request' | 'response') => {
  const niceError = ApiError.fromAxiosError(e, type);
  const meta = {
    message: e.message,
    requestHeaders: sanitiseHeaders(e.config?.headers),
    responseHeaders: sanitiseHeaders(e.response?.headers),
    ...axiosResponseMeta(e.response),
    ...axiosConfigMeta(e.config),
  };
  logException(niceError, meta);
  return niceError;
};

/**
 * Log Axios error to Sentry and return a formatted error object
 * @param r
 * @param errors
 */
export const logGraphQLError = (r: AxiosResponse, errors: GraphQLError[]) => {
  const niceError = ApiError.fromGraphQL(errors[0].message, r.config);
  const meta = {
    requestHeaders: sanitiseHeaders(r.config?.headers),
    responseHeaders: sanitiseHeaders(r.headers),
    ...axiosResponseMeta(r),
    ...axiosConfigMeta(r.config),
  };
  logException(niceError, meta);
  return niceError;
};

export default {
  getQueryName: getRequestName,
  logGraphQLError,
  logAxiosError,
};
