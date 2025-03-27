import type { InternalAxiosRequestConfig } from 'axios';
import type { RequestEditor } from './httpClient';
import { createDefaultHttpClientOptions, createHttpClient } from './httpClient';
import { getAppToken } from './tokens';
import { getRequestName } from './utils';
import { getEnvConfig } from '../utils/env';

/**
 * ehAPIEditor configures request for calling eh API
 */
export const ehAPIEditor: RequestEditor = async (config: InternalAxiosRequestConfig) => {
  const { superAppToken } = await getAppToken(getRequestName(config));
  config.headers.set('session-token', superAppToken);
};

const featureFlagHttpClient = createHttpClient(createDefaultHttpClientOptions(ehAPIEditor));
featureFlagHttpClient.defaults.baseURL = getEnvConfig().MAIN_APP_ENDPOINT;

export { featureFlagHttpClient };
