import { addBreadcrumb } from '@sentry/react-native';
import { AxiosError } from 'axios';
import { DefinedErrors } from './utils';
import { getEbenAccessToken } from '../auth/services/ebenToken';
import { setEbenTokenStatus, useEbenTokenStore } from '../auth/store/ebenTokenStore';
import { fetchSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import type { LoginProviderType } from '../auth/types/types';
import { useSessionStore } from '../stores/useSessionStore';

type GetAppTokenResponse = {
  ebenToken: string;
  superAppToken: string;
  loginProvider: LoginProviderType;
};

export const getAppToken = async (queryName: string): Promise<GetAppTokenResponse> => {
  const ebenTokenStatus = useEbenTokenStore.getState().tokenStatus;
  const loginProvider = useSessionStore.getState().currentUser?.loginProvider;
  const { sessionStatus = '' } = useSessionStore.getState();
  let superAppTokenRes;
  try {
    superAppTokenRes = await fetchSuperAppToken();
  } catch (e) {
    setEbenTokenStatus('failed');
    addBreadcrumb({
      message: DefinedErrors.NO_SUPERAPP_TOKEN.message,
      data: { queryName, loginProvider, sessionStatus, error: e },
    });
    throw new AxiosError(DefinedErrors.NO_SUPERAPP_TOKEN.message, DefinedErrors.NO_SUPERAPP_TOKEN.code);
  }

  const ebenToken = await getEbenAccessToken(superAppTokenRes);

  if (!ebenToken) {
    setEbenTokenStatus('failed');
    addBreadcrumb({ message: DefinedErrors.NO_EBEN_TOKEN.message, data: { queryName, sessionStatus } });
    throw new AxiosError(DefinedErrors.NO_EBEN_TOKEN.message, DefinedErrors.NO_EBEN_TOKEN.code);
  } else if (ebenToken && ebenTokenStatus !== 'success') {
    setEbenTokenStatus('success');
  }

  return {
    ebenToken,
    superAppToken: superAppTokenRes.token,
    loginProvider,
  };
};
