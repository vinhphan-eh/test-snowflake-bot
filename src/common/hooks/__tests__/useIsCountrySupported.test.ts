import { usePermissionStore } from '../../stores/usePermissionStore';
import { renderHook } from '../../utils/testing';
import { mockUseEbfCountry } from '../__mocks__/useEbfCountry';
import { useIsCountrySupported } from '../useIsCountrySupported';
import { useIsWorkzone } from '../useIsWorkzone';

const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
jest.mock('../useIsWorkzone');

const initialPermissionsState = {
  instapay: {
    view: true,
  },
  superAppBenefits: {
    view: true,
  },
  superAppWallet: {
    view: true,
  },
  superAppSettings: {
    view: true,
  },
  superAppHome: {
    view: true,
  },
  superAppCashback: {
    view: true,
  },
  superAppBenefitsFeaturedOffers: {
    view: true,
  },
  superAppCashbackCategories: {
    view: true,
  },
  ebenStorePopularList: {
    view: true,
  },
  heroPoints: {
    view: false,
  },
};

describe('useIsCountrySupported', () => {
  describe('working correctly for AU', () => {
    beforeEach(() => {
      mockUseEbfCountry.mockReturnValue({
        workzoneCountryCode: 'en-AU',
        ehCountryCode: 'AUS',
        isLoadingEhCountry: false,
        isFetched: true,
      });

      mockUseIsWorkzone.mockReturnValue(false);
    });
    it('when using eben country', () => {
      const hook = renderHook(() => useIsCountrySupported());
      expect(hook.result.current.isCountrySupported).toBe(true);
    });
    it('when using eh country', () => {
      mockUseEbfCountry.mockReturnValue({
        workzoneCountryCode: 'en-AU',
        ehCountryCode: 'AU',
        isLoadingEhCountry: false,
        isFetched: true,
      });
      const hook = renderHook(() => useIsCountrySupported());
      expect(hook.result.current.isCountrySupported).toBe(true);
    });

    it('when is workzone', () => {
      mockUseIsWorkzone.mockReturnValue(true);

      const hook = renderHook(() => useIsCountrySupported());
      expect(hook.result.current.isCountrySupported).toBe(true);
    });

    it('when is loading', () => {
      mockUseEbfCountry.mockReturnValue({
        workzoneCountryCode: 'en-AU',
        ehCountryCode: 'AUS',
        isLoadingEhCountry: true,
        isFetched: false,
      });
      const hook = renderHook(() => useIsCountrySupported());
      expect(hook.result.current.isLoading).toBe(true);
    });

    it('when invalid country', () => {
      mockUseEbfCountry.mockReturnValue({
        workzoneCountryCode: 'en-AU',
        ehCountryCode: 'VN',
        isLoadingEhCountry: false,
        isFetched: true,
      });
      const hook = renderHook(() => useIsCountrySupported());
      expect(hook.result.current.isCountrySupported).toBe(false);
    });

    describe('when the feature flag "eBenWhitelistedUkMoney" is enabled', () => {
      beforeEach(() => {
        usePermissionStore.setState({
          permissions: {
            ...initialPermissionsState,
            eBenWhitelistedUkMoney: {
              view: true,
            },
          },
        });
      });

      it('returns true when passed United Kingdom country codes', () => {
        mockUseEbfCountry.mockReturnValue({
          workzoneCountryCode: 'en-GB',
          ehCountryCode: 'GB',
          isLoadingEhCountry: false,
          isFetched: true,
        });
        const hook = renderHook(() => useIsCountrySupported());
        expect(hook.result.current.isCountrySupported).toBe(true);
      });

      it('returns false invalid country codes', () => {
        mockUseEbfCountry.mockReturnValue({
          workzoneCountryCode: 'vi-VN',
          ehCountryCode: 'VN',
          isLoadingEhCountry: false,
          isFetched: true,
        });
        const hook = renderHook(() => useIsCountrySupported());
        expect(hook.result.current.isCountrySupported).toBe(false);
      });
    });

    describe('when the feature flag "eBenWhitelistedUkMoney" is disabled', () => {
      beforeEach(() => {
        usePermissionStore.setState({
          permissions: {
            ...initialPermissionsState,
            eBenWhitelistedUkMoney: {
              view: false,
            },
          },
        });
      });

      it('returns false even when passed United Kingdom country codes', () => {
        mockUseEbfCountry.mockReturnValue({
          workzoneCountryCode: 'en-GB',
          ehCountryCode: 'GB',
          isLoadingEhCountry: false,
          isFetched: true,
        });
        const hook = renderHook(() => useIsCountrySupported());
        expect(hook.result.current.isCountrySupported).toBe(false);
      });

      it('returns true when passed Australia country codes', () => {
        mockUseEbfCountry.mockReturnValue({
          workzoneCountryCode: 'en-AU',
          ehCountryCode: 'AUS',
          isLoadingEhCountry: false,
          isFetched: true,
        });
        const hook = renderHook(() => useIsCountrySupported());
        expect(hook.result.current.isCountrySupported).toBe(true);
      });
    });
  });
});
