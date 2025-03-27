import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';
import { ApiError, isApiError } from '../apiError';

describe('ApiError', () => {
  test('fromAxiosError', () => {
    const error: AxiosError = {
      // populate relevant fields
      message: 'Something failed',
      code: 'ERRTOOMUCHTRAFFICNOTENOUGHROAD',
      config: {
        headers: new AxiosHeaders({ 'x-request-id': '123' }),
        url: 'https://example.com',
      },
    } as AxiosError;

    const apiError = ApiError.fromAxiosError(error, 'request');
    expect(apiError.message).toBe(`EBenRequestError: https://example.com: Something failed`);
    expect(apiError.name).toBe('EBenRequestError: https://example.com');
    expect(apiError.code).toBe('ERRTOOMUCHTRAFFICNOTENOUGHROAD');
    expect(apiError.requestId).toBe('123');
  });

  test('fromGraphQL', () => {
    const config: InternalAxiosRequestConfig = {
      headers: new AxiosHeaders({ 'x-request-id': '123' }),
      data: { query: 'query My { brain { missing } }' },
    };

    const apiError = ApiError.fromGraphQL('brain missing', config);
    expect(apiError.message).toBe(`EBenGraphqlError: My: brain missing`);
    expect(apiError.name).toBe('EBenGraphqlError: My');
    expect(apiError.code).toBe('200');
    expect(apiError.requestId).toBe('123');
  });

  test('networkError', () => {
    const error: AxiosError = {
      // populate relevant fields
      message: 'Network failed',
      code: '500',
      config: {
        headers: new AxiosHeaders({ 'x-request-id': '123' }),
        url: 'https://example.com',
      } as InternalAxiosRequestConfig,
    } as AxiosError;

    const apiError = ApiError.networkError(error, 'response');
    expect(apiError.message).toBe('Network Error');
    expect(apiError.name).toBe('EBenResponseError: https://example.com');
    expect(apiError.code).toBe('500');
    expect(apiError.requestId).toBe('123');
  });

  test('should correctly identify ApiError', () => {
    const error = new ApiError('Message', 'Name', '404');
    expect(isApiError(error)).toBe(true);

    const regularError = new Error('Message');
    expect(isApiError(regularError)).toBe(false);
  });
});
