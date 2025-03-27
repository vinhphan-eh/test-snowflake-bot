import type { InternalAxiosRequestConfig } from 'axios';
import type { RequestEditor } from './httpClient';
import { createDefaultHttpClientOptions, createHttpClient } from './httpClient';
import { getAppToken } from './tokens';
import { getRequestName } from './utils';
import { useSessionStore } from '../stores/useSessionStore';
import { addBreadcrumb } from '../utils/sentry';

/**
 * bffEditor configures request for BFF
 */
export const bffEditor: RequestEditor = async (config: InternalAxiosRequestConfig) => {
  const requestName = getRequestName(config);
  const { ebenToken, loginProvider, superAppToken } = await getAppToken(requestName);
  const workzoneCountry = useSessionStore.getState().workzoneCountryCode;
  config.headers.set('Authorization', `Bearer ${ebenToken}`);

  config.headers.set('X-Query-Name', requestName);

  switch (loginProvider) {
    case 'kp':
      config.headers.set('X-KeyPay-Token', superAppToken);
      config.headers.set('X-KeyPay-Region', workzoneCountry);
      break;
    case 'eh':
      config.headers.set('X-EH-Session-Token', superAppToken);
      break;
    default:
      addBreadcrumb({
        message: 'Missing login provider',
        data: { loginProvider, requestName, ebenTokenLen: ebenToken.length },
      });
      break;
  }
};

export const bffHttpClient = createHttpClient(createDefaultHttpClientOptions(bffEditor));
