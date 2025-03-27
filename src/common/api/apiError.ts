import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getRequestName, isCodeNetworkError } from './utils';
import { capitalize } from '../utils/string';

export class ApiError extends Error {
  static fromAxiosError(error: AxiosError, source: 'request' | 'response'): ApiError {
    const name = `EBen${capitalize(source)}Error: ${getRequestName(error.config)}`;
    return new ApiError(
      `${name}: ${error.message}`,
      name,
      error.code || '',
      error.response?.data,
      error.config?.headers['x-request-id']
    );
  }

  static fromGraphQL(message: string, config: InternalAxiosRequestConfig): ApiError {
    const name = `EBenGraphqlError: ${getRequestName(config)}`;
    return new ApiError(`${name}: ${message}`, name, '200', null, config.headers['x-request-id']);
  }

  static networkError(error: AxiosError, source: 'request' | 'response'): ApiError {
    const name = `EBen${capitalize(source)}Error: ${getRequestName(error.config)}`;
    return new ApiError(
      'Network Error',
      name,
      error.code || '',
      error.response?.data,
      error.config?.headers['x-request-id']
    );
  }

  static expectedError(error: AxiosError, source: 'request' | 'response'): ApiError {
    const name = `EBen${capitalize(source)}Error: ${getRequestName(error.config)}`;
    return new ApiError(
      error.message,
      name,
      error.code || '',
      error.response?.data,
      error.config?.headers['x-request-id']
    );
  }

  constructor(message: string, name: string, public code: string, public body?: unknown, public requestId?: string) {
    super(message);
    super.name = name;
    // Set the prototype explicitly (TypeScript requirement)
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  getErrors(): unknown[] {
    type ErrorArray = {
      errors: unknown[];
    };
    const hasErrors = (b: unknown): b is ErrorArray => !!b && typeof b === 'object' && 'errors' in b;
    if (hasErrors(this.body)) {
      return this.body.errors;
    }
    return [];
  }

  isRetryable(): boolean {
    return isCodeNetworkError(this.code);
  }
}

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;
