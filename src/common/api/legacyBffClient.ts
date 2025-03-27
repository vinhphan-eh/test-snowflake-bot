import type { InternalAxiosRequestConfig } from 'axios';
import type { RequestEditor } from './httpClient';
import { createDefaultHttpClientOptions, createHttpClient } from './httpClient';
import { getAppToken } from './tokens';
import { getRequestName } from './utils';

export const legacyBffEditor: RequestEditor = async (config: InternalAxiosRequestConfig) => {
  const { ebenToken } = await getAppToken(getRequestName(config));
  config.headers.set('Authorization', ebenToken);
};

export const legacyBffHttpClient = createHttpClient(createDefaultHttpClientOptions(legacyBffEditor));
