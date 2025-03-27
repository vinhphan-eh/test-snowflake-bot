import type { DeeplinkType } from '../../../../../common/stores/useDeeplinkStore';
import { clearDeepLink, storeDeeplink } from '../../../../../common/stores/useDeeplinkStore';
import { renderHook, act } from '../../../../../common/utils/testing';
import { useCallbackOnDeeplink } from '../useCallbackOnDeeplink';

describe('useCallbackOnDeeplink hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    act(() => {
      clearDeepLink();
    });
  });

  test.each([
    {
      deeplinkType: 'cashback-offer' as DeeplinkType,
    },
  ])('should call callback only once when deeplinkType is supported', ({ deeplinkType }) => {
    const callback = jest.fn();

    storeDeeplink({
      deeplinkType,
    });

    renderHook(() => {
      useCallbackOnDeeplink({ deeplinkType, callback, isLoading: false });
    });
    renderHook(() => {
      useCallbackOnDeeplink({ deeplinkType, callback, isLoading: false });
    });

    expect(callback).toBeCalledTimes(1);
  });

  test.each([
    {
      deeplinkType: 'cashback-offer' as DeeplinkType,
    },
  ])('should not call callback only once when no pneding deeplink or is loading', ({ deeplinkType }) => {
    const callback = jest.fn();

    renderHook(() => {
      useCallbackOnDeeplink({ deeplinkType, callback, isLoading: true });
      useCallbackOnDeeplink({ deeplinkType, callback, isLoading: false });
    });

    expect(callback).toBeCalledTimes(0);
  });

  test('should call deeplink with params when params is passed', () => {
    const callback = jest.fn();
    const deeplinkType = 'cashback-offer';
    const deeplinkParams = {
      offerId: 'sample',
    };

    storeDeeplink({
      deeplinkType,
      deeplinkParams,
    });

    renderHook(() => {
      useCallbackOnDeeplink({ deeplinkType, callback, isLoading: false });
    });

    expect(callback).toBeCalledWith(deeplinkParams);
  });
});
