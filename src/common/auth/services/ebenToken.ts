import { Platform } from 'react-native';
import jwtDecode from 'jwt-decode';
import { authHttpClient } from '../../api/authClient';
import type { EbenToken } from '../../libs/storage/types';
import { useSessionStore } from '../../stores/useSessionStore';
import { getUniqueId } from '../../utils/deviceInfo';
import { getEnvConfig } from '../../utils/env';
import { addBreadcrumb } from '../../utils/sentry';
import { clearEbenTokenFromStore, getEBenTokenFromStore, setEbenTokenToStore } from '../store/ebenTokenStore';
import type { FetchTokenResponse } from '../store/useSuperAppTokenStore';
import type { DecodeEBenToken, NewEbenTokenResponse } from '../types/types';

let isRefreshingToken = false;
let isExchangeToken = false;

const pendingRefreshTokenQueue: ((newEbenToken: EbenToken | null | PromiseLike<EbenToken | null>) => void)[] = [];
const pendingExTokenQueue: ((newEbenToken: EbenToken | null | PromiseLike<EbenToken | null>) => void)[] = [];

const ONE_MINUTE_IN_MS = 1000 * 60;

const storeEbenToken = (tokenResponse: NewEbenTokenResponse) => {
  const { access_token: accessToken, refresh_token: refreshToken } = tokenResponse;
  const ebenToken: EbenToken = {
    accessToken,
    refreshToken,
  };

  setEbenTokenToStore(ebenToken);
  return ebenToken;
};

/**
 * Check if token is still valid based on its exp value
 * @param token jwt value
 * @param timeOffset this allows us to invalidate token a bit sooner before it expires
 */
export const isTokenValid = (token?: string, timeOffset = ONE_MINUTE_IN_MS) => {
  try {
    if (!token) {
      return false;
    }

    const decodedToken: DecodeEBenToken = jwtDecode(token);

    return decodedToken.exp * 1000 > Date.now() + timeOffset;
  } catch (_) {
    return false;
  }
};

export const clearEbenToken = () => {
  clearEbenTokenFromStore();
};

const exchangeEbenTokenWithEH = async (superAppToken: string, uniqueId: string): Promise<NewEbenTokenResponse> => {
  const endpoint = `${getEnvConfig().SWAG_PERSONAL_AUTH_API_URL}/auth/exchange`;
  try {
    const response = await authHttpClient.post<NewEbenTokenResponse>(endpoint, undefined, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAppToken}`,
        'X-Device-Type': Platform.OS,
        'X-Device-Id': uniqueId,
      },
    });
    return response.data;
  } catch (error) {
    (error as Error).message = 'Exchange eBen token with EH failed';
    throw error;
  }
};

const exchangeEbenTokenWithKeyPay = async (superAppToken: string, uniqueId: string): Promise<NewEbenTokenResponse> => {
  const endpoint = `${getEnvConfig().SWAG_PERSONAL_AUTH_API_URL}/auth/keypay-exchange`;

  try {
    const workzoneCountry = useSessionStore.getState().workzoneCountryCode;

    const response = await authHttpClient.post<NewEbenTokenResponse>(endpoint, undefined, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${superAppToken}`,
        'X-Device-Type': Platform.OS,
        'X-Device-Id': uniqueId,
        'X-KeyPay-Region': workzoneCountry,
      },
    });
    return response.data;
  } catch (error) {
    (error as Error).message = 'Exchange eBen token with Keypay failed';
    throw error;
  }
};

/**
 * Exchange eben token
 */
export const exchangeEbenToken = async (superAppTokenRes: FetchTokenResponse): Promise<EbenToken | null> => {
  if (isExchangeToken) {
    return new Promise<EbenToken | null>(r => {
      pendingExTokenQueue.push(r);
    });
  }
  isExchangeToken = true;
  let newEbenToken: EbenToken | null;
  const { loginProvider, token } = superAppTokenRes;
  const { sessionStatus = '', swagUserType } = useSessionStore.getState();
  let uniqueId = '';
  try {
    uniqueId = await getUniqueId();

    if (!loginProvider || !token) {
      return null;
    }

    let response: NewEbenTokenResponse;
    if (loginProvider === 'kp') {
      response = await exchangeEbenTokenWithKeyPay(token, uniqueId);
    } else {
      response = await exchangeEbenTokenWithEH(token, uniqueId);
    }

    newEbenToken = storeEbenToken(response);
    return newEbenToken;
  } catch (e) {
    addBreadcrumb({
      message: 'Exchange token context',
      data: { hasSuperAppToken: !!token, loginProvider, sessionStatus, swagUserType, hasUniqueId: !!uniqueId },
    });
    clearEbenToken();
    newEbenToken = null;
    throw e;
  } finally {
    isExchangeToken = false;
    pendingExTokenQueue.forEach(r => r(newEbenToken));
    pendingExTokenQueue.length = 0;
  }
};

/**
 * Refresh eben access token
 * @param refreshToken
 */
export const refreshEbenToken = async (
  refreshToken: string | undefined,
  superAppTokenRes: FetchTokenResponse
): Promise<EbenToken | null> => {
  if (isRefreshingToken) {
    return new Promise<EbenToken | null>(r => {
      pendingRefreshTokenQueue.push(r);
    });
  }
  isRefreshingToken = true;
  const isRefreshTokenValid = isTokenValid(refreshToken);
  let newEbenToken: EbenToken | null;

  try {
    if (!isRefreshTokenValid) {
      newEbenToken = await exchangeEbenToken(superAppTokenRes);
      return newEbenToken;
    }
    const { sessionStatus = '', swagUserType } = useSessionStore.getState();

    addBreadcrumb({
      message: 'Refresh token context',
      data: {
        hasEbenRefreshToken: !!refreshToken,
        hasSuperAppToken: !!superAppTokenRes?.token,
        loginProvider: superAppTokenRes?.loginProvider,
        sessionStatus,
        swagUserType,
      },
    });

    const endpoint = `${getEnvConfig().SWAG_PERSONAL_AUTH_API_URL}/auth/refresh`;
    const response = await authHttpClient.post<NewEbenTokenResponse>(endpoint, undefined, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    newEbenToken = storeEbenToken(response.data);
    return newEbenToken;
  } catch {
    // dont need to fire sentry because authHttpClient will handle it
    // there are some filtered logs at api layer => firing it here would be redundant
    clearEbenToken();
    newEbenToken = null;
    return newEbenToken;
  } finally {
    isRefreshingToken = false;
    // Resolve all promises get eben token
    pendingRefreshTokenQueue.forEach(r => r(newEbenToken));
    // Clear promise queue
    pendingRefreshTokenQueue.length = 0;
  }
};

/**
 * Get latest eBen access token
 */
export const getEbenAccessToken = async (superAppTokenRes: FetchTokenResponse) => {
  const ebenToken = getEBenTokenFromStore();
  if (isTokenValid(ebenToken?.accessToken)) {
    return ebenToken?.accessToken;
  }

  const newEbenToken = await refreshEbenToken(ebenToken?.refreshToken, superAppTokenRes);
  return newEbenToken?.accessToken;
};

/**
 * Clear eben token and get a new one
 */
