import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import { getEnvConfig } from '../utils/env';

/**
 * Create a "name" for a request by looking at the payload.
 * If we detect a query or mutation, we use the name of the query or mutation. Otherwise, we'll use the URL.
 * TODO: graphql-codegen should be generating operationName (https://graphql.org/learn/queries/#operation-name)
 * @param config
 */

export const DefinedErrorCode = {
  NO_INTERNET_CONNECTION: 'NO_INTERNET_CONNECTION',
  NO_SUPERAPP_TOKEN: 'NO_SUPERAPP_TOKEN',
  NO_EBEN_TOKEN: 'NO_EBEN_TOKEN',
} as const;

type DefinedErrorType = {
  [k in keyof typeof DefinedErrorCode]: {
    message: string;
    code: k;
  };
};

export const DefinedErrors: DefinedErrorType = {
  NO_INTERNET_CONNECTION: {
    message: 'No internet connection',
    code: 'NO_INTERNET_CONNECTION',
  },
  NO_SUPERAPP_TOKEN: {
    message: 'Missing super app token',
    code: 'NO_SUPERAPP_TOKEN',
  },
  NO_EBEN_TOKEN: {
    message: 'Missing eben access token',
    code: 'NO_EBEN_TOKEN',
  },
};

export const getRequestName = (config?: InternalAxiosRequestConfig): string => {
  let query = config?.data;
  if (typeof config?.data === 'object') {
    ({ query } = config.data);
  }
  if (query) {
    const match = query.match(/(query|mutation)\s+(\w+)/i);
    if (match ? match[2] : undefined) {
      return match[2];
    }
  }
  return config?.url || 'unknown';
};

// expected error is logged somewhere else, so we should avoid sending duplicate logs
export const isExpectedError = (code?: string): boolean => {
  switch (code) {
    case DefinedErrors.NO_SUPERAPP_TOKEN.code:
    case DefinedErrors.NO_EBEN_TOKEN.code:
      return true;
    default:
      return false;
  }
};

export const isCodeNetworkError = (code?: string): boolean => {
  // super app error is already sent to sentry in other places, so should avoid sending duplication logs
  switch (code) {
    case AxiosError.ERR_NETWORK:
    case AxiosError.ERR_CANCELED:
    case AxiosError.ECONNABORTED:
    case AxiosError.ETIMEDOUT:
    case DefinedErrors.NO_INTERNET_CONNECTION.code:
      return true;
    default:
      return false;
  }
};

type GraphQLOperationType = 'query' | 'mutation' | 'unknown';
const queryRegex = /^\s*(?:#[^\n]*\s*)*query\b/i;
const mutationRegex = /^\s*(?:#[^\n]*\s*)*mutation\b/i;

export const getGraphQLOperationType = (config: AxiosRequestConfig): GraphQLOperationType => {
  let query = config?.data;
  if (typeof config?.data === 'object') {
    ({ query } = config.data);
  }

  if (typeof query === 'string' && query.startsWith('{')) {
    try {
      const queryObj = JSON.parse(query);
      query = queryObj?.query?.trim() || '';
    } catch {
      query = '';
    }
  }

  if (query) {
    // Use regex to find the operation type, ignoring leading comments and whitespace
    if (queryRegex.test(query)) {
      return 'query';
    }
    if (mutationRegex.test(query)) {
      return 'mutation';
    }
  }
  return 'unknown';
};

const FAILURE_THRESHOLD = 5; // Max failures allowed
const LOOP_DETECTION_PERIOD = 30000; // Time window in milliseconds (10 seconds)
const CLEANUP_INTERVAL = LOOP_DETECTION_PERIOD + 5000; // Cleanup slightly after the time window (15 seconds)

const savedFailedQueries: Record<string, { count: number; firstFailureTimestamp: number }> = {};

const cleanupStaleEntries = () => {
  const currentTime = Date.now();
  Object.keys(savedFailedQueries).forEach(queryName => {
    const { firstFailureTimestamp } = savedFailedQueries[queryName] ?? {
      // safe fallback, set to current time to do nothing
      firstFailureTimestamp: currentTime,
    };
    // Clean up entries that are older than the cleanup interval
    if (currentTime - firstFailureTimestamp > CLEANUP_INTERVAL) {
      delete savedFailedQueries[queryName];
    }
  });
};

export const clearSavedFailedQueries = () => {
  Object.keys(savedFailedQueries).forEach(queryName => {
    delete savedFailedQueries[queryName];
  });
};

export const checkIfLoopingError = (queryName: string): boolean => {
  // List of endpoints that should be excluded from the loop detection
  // Ex: for exchange token, it's a fundamental part of every request, so it could fail multiple times and it's not a loop
  // avoid using getEnvConfig as file scope variable
  const EXCLUDED_ENDPOINTS = [getEnvConfig().SWAG_PERSONAL_AUTH_API_URL, 'unknown'];

  const isExcluded = EXCLUDED_ENDPOINTS.some(endpoint => queryName.includes(endpoint));
  if (isExcluded) {
    return false;
  }
  // Cleanup old entries on every check
  cleanupStaleEntries();

  const currentTime = Date.now();

  if (!savedFailedQueries[queryName]) {
    savedFailedQueries[queryName] = {
      count: 1,
      firstFailureTimestamp: currentTime,
    };
  } else {
    savedFailedQueries[queryName].count += 1;
  }

  const { count, firstFailureTimestamp } = savedFailedQueries[queryName];
  const timeElapsed = currentTime - firstFailureTimestamp;

  // Check if the query is in a failure loop
  if (count >= FAILURE_THRESHOLD && timeElapsed < LOOP_DETECTION_PERIOD) {
    return true;
  }

  // Reset the query if the period has passed
  if (timeElapsed >= LOOP_DETECTION_PERIOD) {
    delete savedFailedQueries[queryName];
  }

  return false;
};
