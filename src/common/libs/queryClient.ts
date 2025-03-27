import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { MutationCache, onlineManager, QueryCache, QueryClient } from 'react-query';
import { isApiError } from '../api/apiError';
import { DefinedErrorCode } from '../api/utils';

const FAIL_RETRY_LIMIT = 3;

// refetch after having internet connection back
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

const queryCache = new QueryCache({
  onError: (error: unknown, query) => {
    const [apiName, ...params] = query.queryKey;
    console.log(
      '>>>>>>>>>>>>>>>>>>>',
      `API ERROR - ${apiName} with params: ${JSON.stringify(params)} ===> ERROR DETAILS: `,
      JSON.stringify(error)
    );
  },
  onSuccess: (_, query) => {
    const [apiName, ...params] = query.queryKey;
    console.log('>>>>>>>>>>>>>>>>>>>', `API SUCCESS - ${apiName} with params: ${JSON.stringify(params)}`);
  },
});

const mutationCache = new MutationCache({
  onError: (error: unknown, variables, _, mutation) => {
    const apiName = mutation.options.mutationKey;
    console.log(
      '>>>>>>>>>>>>>>>>>>>',
      `API ERROR - ${apiName} with params: ${JSON.stringify(variables)} ===> ERROR DETAILS: `,
      JSON.stringify(error)
    );
  },
  onSuccess: (_, variables, _context, mutation) => {
    const apiName = mutation.options.mutationKey;
    console.log('>>>>>>>>>>>>>>>>>>>', `API SUCCESS - ${apiName} with params: ${JSON.stringify(variables)}`);
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      retry: (failCount, error: unknown) => {
        if (isApiError(error)) {
          if (error.code === DefinedErrorCode.NO_EBEN_TOKEN) {
            // shouldn't retry for no eben token error,
            return false;
          }
          return error.isRetryable() && failCount < FAIL_RETRY_LIMIT;
        }
        if (axios.isAxiosError(error)) {
          return !!(error.status && error.status > 500 && failCount < FAIL_RETRY_LIMIT);
        }
        return false;
      },
    },
    mutations: {
      // no retry for mutation
      retry: false,
    },
  },
  queryCache: __DEV__ ? queryCache : undefined,
  mutationCache: __DEV__ ? mutationCache : undefined,
});
