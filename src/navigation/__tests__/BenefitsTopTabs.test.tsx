import React from 'react';
import { mockUseGetSuperAppToken } from '../../common/auth/store/__mocks__/useSuperAppTokenStore';
import { useEbenTokenStore } from '../../common/auth/store/ebenTokenStore';
import { BenefitsTabKeys } from '../../common/constants/navigation';
import { mockUseIsAccountAU } from '../../common/hooks/__mocks__/useIsAccountAU';
import { useIsCountrySupportedBenefits } from '../../common/hooks/useIsCountrySupported';
import { useIsWorkzone } from '../../common/hooks/useIsWorkzone';
import { usePermissionStore } from '../../common/stores/usePermissionStore';
import { useSessionStore } from '../../common/stores/useSessionStore';
import { renderHook, render, waitFor } from '../../common/utils/testing';
import { mockUseBillStreamPermission } from '../../features/benefits/bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { mockUseCashbackPermission } from '../../features/benefits/common/hooks/__mocks__/useCashbackPermission';
import { mockUsePurchaseTabVisibility } from '../../features/benefits/common/hooks/__mocks__/usePurchaseTabVisibility';
import { mockUseSwagStorePermission } from '../../features/benefits/swag-store/hooks/__mocks__/useSwagStorePermission';
import { useStoreTabVisibility } from '../../features/benefits/swag-store/hooks/useStoreTabVisibility';
import { BenefitsTopTabs } from '../BenefitsTopTabs';

const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockUseIsCountrySupported = useIsCountrySupportedBenefits as jest.MockedFn<typeof useIsCountrySupportedBenefits>;
const mockUseStoreTabVisibility = useStoreTabVisibility as jest.MockedFn<typeof useStoreTabVisibility>;

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
  heroPoints: {
    view: false,
  },
};

jest.mock('../../features/benefits/swag-store/hooks/useStoreTabVisibility');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: () => true,
}));
jest.mock('../../common/hooks/useIsCountrySupported');

jest.mock('../../common/hooks/useIsWorkzone');

describe('Benefits top tabs', () => {
  beforeEach(() => {
    const ebenStore = renderHook(() => useEbenTokenStore());
    ebenStore.result.current.token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    mockUseIsAccountAU.mockReturnValue(true);

    mockUsePurchaseTabVisibility.mockReturnValue({
      billTabVisibility: true,
      cashbackTabVisibility: true,
      storeTabVisibility: true,
      isFetched: true,
      permission: true,
    });

    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });

    mockUseStoreTabVisibility.mockReturnValue({ permission: true, isLoading: false, isFetched: true });
    mockUseBillStreamPermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });
    mockUseIsWorkzone.mockReturnValue(false);
    mockUseIsCountrySupported.mockReturnValue({
      isCountrySupported: true,
      isLoading: false,
      isFetched: true,
    });

    mockUseGetSuperAppToken.mockReturnValue({
      token: 'dasdasd',
      loginProvider: 'eh',
    });

    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      userID: '1',
      loginProvider: 'eh',
      attributes: {
        terminated: false,
      },
    };

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = initialPermissionsState;
    permissionStore.result.current.isFetchedPermission = true;
  });

  it('should show loading when exchange eben token failed', () => {
    const ebenStore = renderHook(() => useEbenTokenStore());
    ebenStore.result.current.tokenStatus = 'failed';

    const { getByTestId } = render(<BenefitsTopTabs />);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should render loading when super app is fetch permission', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = initialPermissionsState;
    permissionStore.result.current.isFetchedPermission = false;
    const { getByTestId } = render(<BenefitsTopTabs />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should render loading when does not have token', () => {
    mockUseGetSuperAppToken.mockReturnValue({
      token: '',
      loginProvider: undefined,
    });

    const { getByTestId } = render(<BenefitsTopTabs />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should render loading when initing eh country', () => {
    mockUseIsCountrySupported.mockReturnValue({
      isLoading: true,
      isCountrySupported: true,
      isFetched: false,
    });

    const { getByTestId } = render(<BenefitsTopTabs />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  describe('Benefits v2', () => {
    beforeEach(() => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        benefitsIAv2: {
          view: true,
        },
      };
    });
    it('should render all tabs IA v2 when all conditions meet', async () => {
      const { getByTestId } = render(<BenefitsTopTabs />);

      expect(getByTestId(BenefitsTabKeys.HOME)).toBeTruthy();
      expect(getByTestId(BenefitsTabKeys.ONLINE)).toBeTruthy();
      expect(getByTestId(BenefitsTabKeys.INSTORE)).toBeTruthy();
      expect(getByTestId(BenefitsTabKeys.PURCHASES)).toBeTruthy();
      expect(getByTestId(BenefitsTabKeys.SETTINGS)).toBeTruthy();
    });

    it('should render coming soon when country is not supported, dont have permission to purchase tab and using v2', async () => {
      mockUseIsCountrySupported.mockReturnValue({
        isLoading: false,
        isCountrySupported: false,
        isFetched: true,
      });

      mockUsePurchaseTabVisibility.mockReturnValue({
        billTabVisibility: false,
        cashbackTabVisibility: false,
        storeTabVisibility: false,
        isFetched: true,
        permission: false,
      });

      const { getByTestId } = render(<BenefitsTopTabs />);
      await waitFor(() => {
        expect(getByTestId('coming soon')).toBeTruthy();
      });
    });

    describe('Home tab', () => {
      it.each`
        isAU     | showCashbackFlow | showBills | storePermission | expected
        ${false} | ${true}          | ${true}   | ${true}         | ${false}
        ${false} | ${true}          | ${true}   | ${false}        | ${false}
        ${false} | ${true}          | ${false}  | ${true}         | ${false}
        ${false} | ${false}         | ${true}   | ${true}         | ${false}
        ${false} | ${false}         | ${true}   | ${false}        | ${false}
        ${false} | ${false}         | ${false}  | ${true}         | ${false}
        ${false} | ${true}          | ${false}  | ${false}        | ${false}
        ${false} | ${false}         | ${false}  | ${false}        | ${false}
        ${true}  | ${true}          | ${true}   | ${true}         | ${true}
        ${true}  | ${true}          | ${true}   | ${false}        | ${true}
        ${true}  | ${true}          | ${false}  | ${true}         | ${true}
        ${true}  | ${false}         | ${true}   | ${true}         | ${true}
        ${true}  | ${false}         | ${true}   | ${false}        | ${true}
        ${true}  | ${false}         | ${false}  | ${true}         | ${true}
      `('should show tab correctly', ({ expected, isAU, showBills, showCashbackFlow, storePermission }) => {
        mockUseIsAccountAU.mockReturnValue(isAU);
        mockUseCashbackPermission.mockReturnValue({
          permission: showCashbackFlow,
          isLoading: false,
          isFetched: true,
        });
        mockUseBillStreamPermission.mockReturnValue({
          permission: showBills,
          isFetched: true,
        });
        mockUseSwagStorePermission.mockReturnValue({ permission: storePermission, isLoading: false, isFetched: true });

        const { queryByText } = render(<BenefitsTopTabs />);
        if (expected) {
          expect(queryByText('Home')).toBeTruthy();
        } else {
          expect(queryByText('Home')).toBeNull();
        }
      });
    });

    describe('Online tab', () => {
      it.each`
        showCashbackFlow | showBills | storePermission | expected
        ${true}          | ${true}   | ${true}         | ${true}
        ${true}          | ${true}   | ${false}        | ${true}
        ${true}          | ${false}  | ${true}         | ${true}
        ${false}         | ${false}  | ${true}         | ${true}
        ${true}          | ${false}  | ${false}        | ${true}
        ${false}         | ${true}   | ${true}         | ${true}
        ${false}         | ${false}  | ${false}        | ${false}
      `('should show tab correctly', ({ expected, showBills, showCashbackFlow, storePermission }) => {
        mockUseCashbackPermission.mockReturnValue({
          permission: showCashbackFlow,
          isLoading: false,
          isFetched: true,
        });
        mockUseBillStreamPermission.mockReturnValue({
          permission: showBills,
          isFetched: true,
        });
        mockUseSwagStorePermission.mockReturnValue({ permission: storePermission, isLoading: false, isFetched: true });

        const { queryByText } = render(<BenefitsTopTabs />);
        if (expected) {
          expect(queryByText('Online')).toBeTruthy();
        } else {
          expect(queryByText('Online')).toBeNull();
        }
      });
    });

    describe('Instore tab', () => {
      it.each`
        showCashbackFlow | expected
        ${true}          | ${true}
        ${false}         | ${false}
      `('should show tab correctly', ({ expected, showCashbackFlow }) => {
        mockUseCashbackPermission.mockReturnValue({
          permission: showCashbackFlow,
          isLoading: false,
          isFetched: true,
        });

        const { queryByText } = render(<BenefitsTopTabs />);
        if (expected) {
          expect(queryByText('In-store')).toBeTruthy();
        } else {
          expect(queryByText('In-store')).toBeNull();
        }
      });
    });

    describe('Purchases tab', () => {
      it.each`
        showPurchaseTab | expected
        ${true}         | ${true}
        ${false}        | ${false}
      `('should show tab correctly', ({ expected, showPurchaseTab }) => {
        mockUsePurchaseTabVisibility.mockReturnValue({
          isFetched: true,
          permission: showPurchaseTab,
        } as never);
        const { queryByText } = render(<BenefitsTopTabs />);
        if (expected) {
          expect(queryByText('Purchases')).toBeTruthy();
        } else {
          expect(queryByText('Purchases')).toBeNull();
        }
      });
    });
  });
});
