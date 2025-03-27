import type { AxiosError } from 'axios';
import { ApiError } from '../../../api/apiError';
import { useMiniAppSwitcherStore } from '../../../stores/useMiniAppSwitcherStore';
import { renderHook } from '../../../utils/testing';
import { useSSOStore, type SSOStatus } from '../../store/useSSOStore';
import * as ssoUtils from '../ssoHandler';
import ssoHandler, { handleSSOIfErrorExists } from '../ssoHandler';

const mockShowSSOError = jest.spyOn(ssoUtils, 'showSSOError');

describe('SSO Handler', () => {
  describe('getFreshSSOStatus', () => {
    it('should return correct status', async () => {
      const store = renderHook(() => useSSOStore());
      store.result.current.checkStatus = () => Promise.resolve('required');

      expect(await ssoHandler.getFreshSSOStatus()).toBe('required');
    });

    it('should return disabled if checkStatus is not available', async () => {
      const store = renderHook(() => useSSOStore());
      store.result.current.checkStatus = undefined;

      expect(await ssoHandler.getFreshSSOStatus()).toBe('disabled');
    });

    it('should handle concurrency and return the same status for all requests', async () => {
      const store = renderHook(() => useSSOStore());
      const checkStatusMock = jest.fn(() => Promise.resolve('required' as SSOStatus));
      store.result.current.checkStatus = checkStatusMock;

      // Trigger multiple concurrent calls
      const [status1, status2, status3] = await Promise.all([
        ssoHandler.getFreshSSOStatus(),
        ssoHandler.getFreshSSOStatus(),
        ssoHandler.getFreshSSOStatus(),
      ]);

      // Ensure all calls return the same result
      expect(status1).toBe('required');
      expect(status2).toBe('required');
      expect(status3).toBe('required');

      // Ensure that checkStatus was called only once
      expect(checkStatusMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('getCacheSSOStatus', () => {
    it('should return correct status from store', () => {
      const store = renderHook(() => useSSOStore());
      store.result.current.status = 'completed';

      expect(ssoHandler.getCacheSSOStatus()).toBe('completed');
    });

    it('should return disabled if status is not available', () => {
      const store = renderHook(() => useSSOStore());
      store.result.current.status = undefined;

      expect(ssoHandler.getCacheSSOStatus()).toBe('disabled');
    });
  });
  describe('isSSOErrorResponse', () => {
    beforeEach(() => {
      const pillarStore = renderHook(() => useMiniAppSwitcherStore());
      pillarStore.result.current.currentPillar = 'BenefitsApp';

      const store = renderHook(() => useSSOStore());
      store.result.current.checkStatus = () => Promise.resolve('required');
    });

    it('should return false if at swag app', async () => {
      const pillarStore = renderHook(() => useMiniAppSwitcherStore());
      pillarStore.result.current.currentPillar = 'SwagApp';

      const testError = new ApiError(
        `Error while getDiscountShopProducts: 403`,
        'EBenRequestError: getDiscountShopProducts',
        '200'
      );

      const store = renderHook(() => useSSOStore());
      store.result.current.checkStatus = () => Promise.resolve('required');

      expect(await ssoHandler.isSSOErrorResponse(testError)).toBe(false);
    });

    it('should return false if another auth issue with matching code 403', async () => {
      const testError = new ApiError(
        `Error while getDiscountShopProducts: 403`,
        'EBenRequestError: getDiscountShopProducts',
        '200'
      );

      const store = renderHook(() => useSSOStore());
      store.result.current.checkStatus = () => Promise.resolve('completed');

      expect(await ssoHandler.isSSOErrorResponse(testError)).toBe(false);
    });

    it.each`
      error  | expected
      ${401} | ${true}
      ${403} | ${true}
      ${500} | ${false}
    `('should work correctly for api error with $error', async ({ error, expected }) => {
      const testError = new ApiError(
        `Error while getDiscountShopProducts: ${error}`,
        'EBenRequestError: getDiscountShopProducts',
        '200'
      );

      expect(await ssoHandler.isSSOErrorResponse(testError)).toBe(expected);
    });

    it.each`
      error  | expected
      ${401} | ${true}
      ${403} | ${true}
      ${500} | ${false}
    `('should work correctly for axios error with $error', async ({ error, expected }) => {
      const testError: AxiosError = {
        name: 'AxiosError',
        message: `Error while getDiscountShopProducts: ${error}`,
        isAxiosError: true,
        code: `${error}`,
        response: {
          data: '',
          status: error,
          statusText: '',
          headers: {},
          config: {} as never,
        },
        request: {},
        toJSON: () => ({}),
      };

      expect(await ssoHandler.isSSOErrorResponse(testError)).toBe(expected);
    });
  });

  describe('handleSSO', () => {
    describe('Single request', () => {
      it('should return false if handleSSOFromSuperApp is not available', async () => {
        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = undefined;
        store.result.current.handleSSOFlow = undefined;

        const result = await ssoHandler.handleSSO('required');
        expect(result).toBe(false);
      });

      it('should return false if sso is not required', async () => {
        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = undefined;
        store.result.current.handleSSOFlow = () => {};

        const result = await ssoHandler.handleSSO('disabled');
        expect(result).toBe(false);
      });

      it.each`
        ssoStatus      | expected
        ${'completed'} | ${false}
        ${'disabled'}  | ${false}
      `('should not working if ssoStatus is $ssoStatus', async ({ expected, ssoStatus }) => {
        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => ssoStatus;
        store.result.current.handleSSOFlow = jest.fn();

        const result = await ssoHandler.handleSSO(ssoStatus);
        expect(result).toBe(expected);
        expect(store.result.current.handleSSOFlow).not.toHaveBeenCalled();
      });

      it('should trigger success correctly', async () => {
        const onFirstSuccess = jest.fn();
        const onFirstFailure = jest.fn();
        const onFirstCancel = jest.fn();

        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => Promise.resolve('required');
        store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
          params.onSuccess();
        });

        const result = await ssoHandler.handleSSO('required', {
          onFirstSuccess,
          onFirstFailure,
          onFirstCancel,
        });
        expect(result).toBe(true);
        expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
        expect(onFirstSuccess).toHaveBeenCalled();
        expect(onFirstFailure).not.toHaveBeenCalled();
        expect(onFirstCancel).not.toHaveBeenCalled();
      });

      it('should trigger failure correctly', async () => {
        const onFirstSuccess = jest.fn();
        const onFirstFailure = jest.fn();
        const onFirstCancel = jest.fn();

        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => Promise.resolve('required');
        store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
          params.onFailure();
        });

        const result = await ssoHandler.handleSSO('required', {
          onFirstSuccess,
          onFirstFailure,
          onFirstCancel,
        });
        expect(result).toBe(false);
        expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
        expect(onFirstSuccess).not.toHaveBeenCalled();
        expect(onFirstFailure).toHaveBeenCalled();
        expect(onFirstCancel).not.toHaveBeenCalled();
      });

      it('should trigger cancel correctly', async () => {
        const onFirstSuccess = jest.fn();
        const onFirstFailure = jest.fn();
        const onFirstCancel = jest.fn();

        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => Promise.resolve('required');
        store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
          params.onCancel();
        });

        const result = await ssoHandler.handleSSO('required', {
          onFirstSuccess,
          onFirstFailure,
          onFirstCancel,
        });
        expect(result).toBe(false);
        expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
        expect(onFirstSuccess).not.toHaveBeenCalled();
        expect(onFirstFailure).not.toHaveBeenCalled();
        expect(onFirstCancel).toHaveBeenCalled();
      });
    });

    describe('Concurrent requests', () => {
      const onFirstSuccess = jest.fn();
      const onFirstFailure = jest.fn();
      const onFirstCancel = jest.fn();

      const concurrentRequests = () =>
        Promise.all([
          ssoHandler.handleSSO('required', {
            onFirstSuccess,
            onFirstFailure,
            onFirstCancel,
          }),
          ssoHandler.handleSSO('required', {
            onFirstSuccess,
            onFirstFailure,
            onFirstCancel,
          }),
          ssoHandler.handleSSO('required', {
            onFirstSuccess,
            onFirstFailure,
            onFirstCancel,
          }),
        ]);

      it('should trigger success correctly', async () => {
        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => Promise.resolve('required');
        store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
          params.onSuccess();
        });

        const result = await concurrentRequests();
        expect(result[0]).toBe(true);
        expect(result[1]).toBe(true);
        expect(result[2]).toBe(true);

        expect(store.result.current.handleSSOFlow).toHaveBeenCalledTimes(1);
        expect(onFirstSuccess).toHaveBeenCalledTimes(1);
        expect(onFirstFailure).not.toHaveBeenCalled();
        expect(onFirstCancel).not.toHaveBeenCalled();
      });

      it('should trigger failure correctly', async () => {
        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => Promise.resolve('required');
        store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
          params.onFailure();
        });

        const result = await concurrentRequests();
        expect(result[0]).toBe(false);
        expect(result[1]).toBe(false);
        expect(result[2]).toBe(false);

        expect(store.result.current.handleSSOFlow).toHaveBeenCalledTimes(1);
        expect(onFirstSuccess).not.toHaveBeenCalled();
        expect(onFirstFailure).toHaveBeenCalledTimes(1);
        expect(onFirstCancel).not.toHaveBeenCalled();
      });

      it('should trigger cancel correctly', async () => {
        const store = renderHook(() => useSSOStore());
        store.result.current.checkStatus = () => Promise.resolve('required');
        store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
          params.onCancel();
        });

        const result = await concurrentRequests();
        expect(result[0]).toBe(false);
        expect(result[1]).toBe(false);
        expect(result[2]).toBe(false);

        expect(store.result.current.handleSSOFlow).toHaveBeenCalledTimes(1);
        expect(onFirstSuccess).not.toHaveBeenCalled();
        expect(onFirstFailure).not.toHaveBeenCalled();
        expect(onFirstCancel).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe('handleSSOIfErrorExists', () => {
  beforeEach(() => {
    const store = renderHook(() => useMiniAppSwitcherStore());
    store.result.current.currentPillar = 'BenefitsApp';
  });

  it('should throw error if error is not SSO error', async () => {
    const testAxiosError: AxiosError = {
      name: 'AxiosError',
      message: `Error while getDiscountShopProducts: 500`,
      isAxiosError: true,
      code: '500',
      response: {
        data: '',
        status: 500,
        statusText: '',
        headers: {},
        config: {} as never,
      },
      request: {},
      toJSON: () => ({}),
    };

    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 500`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );
    try {
      await handleSSOIfErrorExists(testAxiosError, {}, {} as never);
    } catch (error) {
      expect(error).toEqual(testAxiosError);
    }

    try {
      await handleSSOIfErrorExists(testApiError, {}, {} as never);
    } catch (error) {
      expect(error).toEqual(testApiError);
    }
  });

  it('should throw error if no config', async () => {
    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 403`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );

    try {
      await handleSSOIfErrorExists(testApiError, undefined, {} as never);
    } catch (error) {
      expect(error).toEqual(testApiError);
    }
  });

  it('should throw error if at swag app', async () => {
    const store = renderHook(() => useMiniAppSwitcherStore());
    store.result.current.currentPillar = 'SwagApp';

    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 403`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );

    const config = {
      url: 'http://localhost:3000',
      headers: {},
    };
    const instance = {
      request: jest.fn(),
    };

    try {
      await handleSSOIfErrorExists(testApiError, config, instance as never);
    } catch (error) {
      expect(error).toEqual(testApiError);
    }
  });

  it('should retry request if SSO flow is successful', async () => {
    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 403`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );

    const config = {
      url: 'http://localhost:3000',
      headers: {},
    };
    const instance = {
      request: jest.fn(),
    };

    const store = renderHook(() => useSSOStore());
    store.result.current.checkStatus = () => Promise.resolve('required');
    store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
      params.onSuccess();
    });

    await handleSSOIfErrorExists(testApiError, config, instance as never);

    expect(instance.request).toHaveBeenCalledWith(config);
    expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
  });

  it('should show error if SSO flow is cancel', async () => {
    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 403`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );

    const config = {
      url: 'http://localhost:3000',
      headers: {},
    };
    const instance = {
      request: jest.fn(),
    };

    const store = renderHook(() => useSSOStore());
    store.result.current.checkStatus = () => Promise.resolve('required');
    store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
      params.onCancel();
    });
    try {
      await handleSSOIfErrorExists(testApiError, config, instance as never);
    } catch {
      expect(mockShowSSOError).toHaveBeenCalled();
      expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
    }
  });

  it('should show error if SSO flow is fail', async () => {
    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 403`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );

    const config = {
      url: 'http://localhost:3000',
      headers: {},
    };
    const instance = {
      request: jest.fn(),
    };

    const store = renderHook(() => useSSOStore());
    store.result.current.checkStatus = () => Promise.resolve('required');
    store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
      params.onFailure();
    });

    try {
      await handleSSOIfErrorExists(testApiError, config, instance as never);
    } catch {
      expect(mockShowSSOError).toHaveBeenCalled();
      expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
    }
  });

  it('should not retry mutation', async () => {
    const testApiError = new ApiError(
      `Error while getDiscountShopProducts: 403`,
      'EBenRequestError: getDiscountShopProducts',
      '200'
    );

    const config = {
      url: 'http://localhost:3000',
      headers: {},
      data: {
        query: `mutation UpdateCardPIN($cardPIN: String!) {
                    updateCardPIN(cardPIN: $cardPIN)
                }`,
      },
    };
    const instance = {
      request: jest.fn(),
    };

    const store = renderHook(() => useSSOStore());
    store.result.current.checkStatus = () => Promise.resolve('required');
    store.result.current.handleSSOFlow = jest.fn().mockImplementation(params => {
      params.onSuccess();
    });

    try {
      await handleSSOIfErrorExists(testApiError, config, instance as never);

      expect(instance.request).not.toHaveBeenCalledWith(config);
      expect(store.result.current.handleSSOFlow).toHaveBeenCalled();
    } catch (e) {
      expect(e).toEqual(testApiError);
    }
  });
});
