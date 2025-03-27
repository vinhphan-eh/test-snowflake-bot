import { useCallback, useEffect, useState } from 'react';
import { create } from 'zustand';
import AppState from '../../app/AppState';
import { useSessionStore } from '../../stores/useSessionStore';
import { addBreadcrumb, createSentryError, logException } from '../../utils/sentry';
import type { LoginProviderType } from '../types/types';

type ErrorCode = 'pending_session' | 'unauthenticated' | 'failed_to_refresh_token';

type ExpectedError = {
  loginProvider?: string;
  token?: string;
  error?: string;
  errorCode?: ErrorCode;
};
export type FetchTokenResponse = {
  loginProvider: LoginProviderType;
  token: string;
  reason?: string;
};

const isExpectedError = (test: unknown): test is ExpectedError => {
  const parsedTest = test as ExpectedError;
  // We should either get a valid token, or get a logging out event ('unauthenticated')
  return parsedTest?.errorCode === 'unauthenticated';
};

const excludedCauses = ['cleanup store'];

export type SuperAppTokenUtilsType = {
  isSuperAppTokenExpired: () => boolean;
  freshSuperAppToken: string;
  fetchValidSuperAppToken: () => Promise<FetchTokenResponse>;
};

type SuperAppTokenStore = SuperAppTokenUtilsType;

export const useSuperAppTokenStore = create<SuperAppTokenStore>()(() => ({
  fetchValidSuperAppToken: () => {
    return Promise.resolve({
      token: '',
      loginProvider: undefined,
      reason: 'default empty',
    });
  },
  isSuperAppTokenExpired: () => false,
  freshSuperAppToken: '',
}));

const fetchAppToken = async (params?: { location: string }) => {
  const loginProvider = useSessionStore.getState().currentUser?.loginProvider;
  const fetchToken = useSuperAppTokenStore.getState().fetchValidSuperAppToken;
  try {
    const res = await fetchToken();
    if (!res.token || !res.loginProvider) {
      // will be catched below and log to sentry as unexpected error
      const unexpectedError = new Error(`Invalid response from super app: ${res?.reason}`);
      unexpectedError.name = `loginProvider: ${res.loginProvider}, sessionValid: ${!!res.token}`;
      unexpectedError.cause = res?.reason || '';
      throw unexpectedError;
    }
    return res;
  } catch (e) {
    const error = e as Error;
    if (isExpectedError(error)) {
      addBreadcrumb({
        message: 'Failed to fetch auth from super app',
        data: {
          expectedError: error,
          location: params?.location,
        },
      });
    } else if (typeof error?.cause === 'string' && !excludedCauses.includes(error.cause)) {
      // log to sentry
      addBreadcrumb({
        message: 'Failed to fetch auth from super app',
        data: {
          loginProvider,
          unexpectedError: e,
          location: params?.location,
        },
      });
      const sentryError = createSentryError(
        'EbenFailedToFetchValidToken: Unexpected issue when getting token',
        'Unexpected issue from super app'
      );
      logException(sentryError, {
        loginProvider,
        location: params?.location,
      });
    }
    throw error;
  }
};

/**
 * @description use this to get token when hook isn't allow
 */
export const fetchSuperAppToken = async (): Promise<FetchTokenResponse> => {
  const isExpired = useSuperAppTokenStore.getState().isSuperAppTokenExpired();
  const freshToken = useSuperAppTokenStore.getState().freshSuperAppToken;
  const loginProvider = useSessionStore.getState().currentUser?.loginProvider;

  if (isExpired) {
    // expired, fetch new token
    try {
      const result = await fetchAppToken();
      return result;
    } catch (e) {
      throw new Error('Failed to fetch token');
    }
  }
  if (!freshToken) {
    // no expired, no fresh token, could be logged out
    addBreadcrumb({
      message: 'Invalid request. Already logged out',
      data: {
        loginProvider,
      },
    });
    throw new Error('Invalid request. Already logged out');
  } else if (loginProvider) {
    // no expired, has valid token + provider, return it
    return {
      token: freshToken,
      loginProvider,
      reason: 'fetchSuperApp: valid from cache',
    };
  } else {
    throw new Error('Invalid request. No login provider');
  }
};

export const clearSuperAppTokenStore = () => {
  useSuperAppTokenStore.setState({
    fetchValidSuperAppToken: () => {
      return Promise.resolve({
        token: '',
        loginProvider: undefined,
        reason: 'cleanup store',
      });
    },
    isSuperAppTokenExpired: () => true,
    freshSuperAppToken: '',
  });
};

export const useGetSuperAppToken = (location: string): FetchTokenResponse => {
  const [tokenRes, setTokenRes] = useState<FetchTokenResponse>({
    loginProvider: undefined,
    token: '',
    reason: 'default',
  });
  const loginProvider = useSessionStore(state => state.currentUser?.loginProvider);
  const freshSuperAppToken = useSuperAppTokenStore(state => state.freshSuperAppToken);
  const isSuperAppTokenExpired = useSuperAppTokenStore(state => state.isSuperAppTokenExpired);
  /**
   * this is recalculated on each render
   * do not memo this isExpired
   * let it recalculate every time screen re-render, it's safer!
   */
  const isExpired = isSuperAppTokenExpired();

  const loadToken = useCallback(async () => {
    try {
      const result = await fetchAppToken({
        location,
      });
      setTokenRes(result);
    } catch {
      setTokenRes({
        loginProvider: undefined,
        token: '',
        reason: 'useGetSuperApp: failed to fetch',
      });
    }
  }, [location]);

  useEffect(() => {
    if (isExpired && !AppState.isLoggedOut) {
      loadToken();
    }
  }, [loadToken, isExpired]);

  // if not expired yet, return fresh token
  // no need to handle this in useEffect, to save 1 render time
  // read: https://react.dev/learn/escape-hatches
  if (freshSuperAppToken && !isExpired) {
    return {
      token: freshSuperAppToken,
      loginProvider,
      reason: 'useGetSuperApp: valid from cache',
    };
  }
  return tokenRes;
};
