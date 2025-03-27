import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { navigateFromRoot } from '../../../navigation/rootNavigation';
import type { ApiError } from '../../api/apiError';
import { isApiError } from '../../api/apiError';
import { getGraphQLOperationType } from '../../api/utils';
import { useMiniAppSwitcherStore } from '../../stores/useMiniAppSwitcherStore';
import { SSO_STATUSES, useSSOStore, type SSOStatus } from '../store/useSSOStore';

const SSO_ERROR_CODES = ['403', '401'];

type HandlerParams = {
  onFirstSuccess?: () => void;
  onFirstFailure?: () => void;
  onFirstCancel?: () => void;
};
export const showSSOError = () => {
  const { currentPillar } = useMiniAppSwitcherStore.getState();

  if (currentPillar) {
    navigateFromRoot('SSOStack', {
      screen: 'SSOError',
      params: {
        pillar: currentPillar,
      },
    });
  }
};

const SSOHandler = () => {
  // local variables to handle concurrent requests
  let ssoPromise: Promise<boolean> | undefined;
  let ssoStatusPromise: Promise<SSOStatus> | undefined;

  const getCacheSSOStatus = (): SSOStatus => {
    return useSSOStore.getState().status || 'disabled';
  };

  const getFreshSSOStatus = async (): Promise<SSOStatus> => {
    const { checkStatus } = useSSOStore.getState();
    if (!checkStatus) {
      return 'disabled';
    }

    // If there is already a pending SSO status check, return that promise
    if (ssoStatusPromise) {
      return ssoStatusPromise;
    }

    // Create a new promise to handle the SSO status check
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ssoStatusPromise = new Promise<SSOStatus>((resolve, _) => {
      checkStatus()
        .then(ssoStatus => {
          resolve(ssoStatus);
        })
        .catch(() => {
          resolve('disabled');
        })
        .finally(() => {
          // Reset the promise once the operation is complete
          ssoStatusPromise = undefined;
        });
    });

    return ssoStatusPromise;
  };

  /**
   * @description check if an error is SSO related
   */
  const isSSOErrorResponse = async (error: unknown): Promise<boolean> => {
    let isError = false;

    const { currentPillar } = useMiniAppSwitcherStore.getState();
    // do not show sso at swag, this check is to prevent unexpected api leaked to swag and trigger sso there
    const isSwagApp = currentPillar === 'SwagApp';

    if (isSwagApp) {
      return false;
    }

    // api error is from our graphql, coming from interceptor.response.onReponse
    if (isApiError(error)) {
      isError = SSO_ERROR_CODES.some(e => error.message.includes(e));
    }
    // axios error, coming from interceptor.response.onError
    if (axios.isAxiosError(error)) {
      const errorStatus = error?.response?.status || '';
      isError = SSO_ERROR_CODES.includes(errorStatus.toString());
    }

    if (isError) {
      // only call api to check if is error
      const status = await getFreshSSOStatus();
      return isError && status === 'required';
    }

    return false;
  };

  /**
   * @description trigger SSO flow if required
   */
  const handleSSO = async (status: SSOStatus, params?: HandlerParams): Promise<boolean> => {
    // get store here to avoid stale data
    const { handleSSOFlow } = useSSOStore.getState();
    const isSSORequired = status === SSO_STATUSES.REQUIRED;
    if (!handleSSOFlow || !isSSORequired) {
      // skip if no handleSSOFlow or sso not required
      return false;
    }

    if (ssoPromise) {
      // if there is a pending ssoPromise, return it
      // all concurrent requests will wait for the same promise
      return ssoPromise;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ssoPromise = new Promise<boolean>((resolve, _) => {
      /**
       * for concurrent requests: these callbacks are triggered only one time after promise resolved
       * Ex: if user cancel/failure the sso flow, trigger general error modal
       * we only want to trigger the modal once in case of concurrent requests
       */
      handleSSOFlow({
        onSuccess: () => {
          params?.onFirstSuccess?.();
          resolve(true);
        },
        onFailure: () => {
          showSSOError();
          params?.onFirstFailure?.();
          resolve(false);
        },
        onCancel: () => {
          showSSOError();
          params?.onFirstCancel?.();
          resolve(false);
        },
      });
    })
      .catch(() => {
        return false;
      })
      .finally(() => {
        // reset after sso flow is done
        ssoPromise = undefined;
      });

    return ssoPromise;
  };

  return {
    handleSSO,
    isSSOErrorResponse,
    getFreshSSOStatus,
    getCacheSSOStatus,
  };
};

// initialize SSO handler only one time, to avoid multiple instances
const ssoHandler = SSOHandler();

/**
 * @description Handle SSO flow specifically for API layer,
 * retry query if successfully pass SSO flow,
 * else throw error
 */
export const handleSSOIfErrorExists = async (
  apiError: ApiError | AxiosError,
  config: AxiosRequestConfig<unknown> | undefined,
  instance: AxiosInstance
): Promise<void> => {
  const isSSORequired = await ssoHandler.isSSOErrorResponse(apiError);

  if (isSSORequired && config) {
    const isMutation = getGraphQLOperationType(config) === 'mutation';
    const isSuccess = await ssoHandler.handleSSO('required');
    if (isSuccess && !isMutation) {
      // do not retry for mutation
      return instance.request(config);
    }
  }
  throw apiError;
};

export default ssoHandler;
