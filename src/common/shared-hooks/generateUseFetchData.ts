import type { AxiosRequestHeaders } from 'axios';
import { bffHttpClient } from '../api/bffClient';
import { legacyBffHttpClient } from '../api/legacyBffClient';
import AppState from '../app/AppState';
import { getEnvConfig } from '../utils/env';

export const generateUseFetchData =
  () =>
  <TData, TVariables>(query: string, options?: AxiosRequestHeaders): ((variables?: TVariables) => Promise<TData>) => {
    return (variables?: TVariables) => {
      if (AppState.isLoggedOut) {
        throw Error('Logging out. Stop query');
      }
      return legacyBffHttpClient
        .post(
          getEnvConfig().SWAG_PERSONAL_API_URL,
          {
            query,
            variables,
          },
          { headers: options }
        )
        .then(response => response.data.data);
    };
  };

export const generateUseFetchNewData =
  () =>
  <TData, TVariables>(query: string, options?: AxiosRequestHeaders): ((variables?: TVariables) => Promise<TData>) => {
    return (variables?: TVariables) => {
      if (AppState.isLoggedOut) {
        throw Error('Logging out. Stop query');
      }
      return bffHttpClient
        .post(
          getEnvConfig().SWAG_PERSONAL_NEW_API_URL,
          {
            query,
            variables,
          },
          { headers: options }
        )
        .then(response => response.data.data);
    };
  };
