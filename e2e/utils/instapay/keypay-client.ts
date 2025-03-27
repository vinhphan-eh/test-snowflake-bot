import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import axiosRetry from 'axios-retry';
import type { SupportedCountries } from './utils';

const KEYPAY_API_URL = process.env.E2E_KEYPAY_API_URL as string;
const KEYPAY_API_KEY = process.env.E2E_KEYPAY_API_KEY as string; // This is expected to be base64 of "<api key>:"

const keypayClient = axios.create({
  baseURL: KEYPAY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${KEYPAY_API_KEY}`,
  },
});
keypayClient.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
keypayClient.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
axiosRetry(keypayClient, { retries: 0, retryDelay: axiosRetry.exponentialDelay });

const KEYPAY_UK_API_URL = process.env.E2E_KEYPAY_UK_API_URL as string;
const KEYPAY_UK_API_KEY = process.env.E2E_KEYPAY_UK_API_KEY as string; // This is expected to be base64 of "<api key>:"

const keypayUKClient = axios.create({
  baseURL: KEYPAY_UK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${KEYPAY_UK_API_KEY}`,
  },
});

keypayUKClient.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
keypayUKClient.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
axiosRetry(keypayUKClient, {
  retries: 1,
  retryDelay: retryCount => {
    return retryCount * 1000;
  },
  retryCondition: error => {
    return error.response?.status === 429;
  },
});

export default ({ country = 'AU' }: { country?: `${SupportedCountries}` }) => {
  return country === 'GB' ? keypayUKClient : keypayClient;
};
