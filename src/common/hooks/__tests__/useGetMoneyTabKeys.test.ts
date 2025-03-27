import { renderHook } from '@testing-library/react-native';
import { useBillManagementMoneyAccess } from '../../../features/bill-management/hooks/useBillManagementMoneyAccess';
import { useEbenTokenStore } from '../../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../../auth/store/useSuperAppTokenStore';
import { WalletTabKeys } from '../../constants/navigation';
import { usePermissionStore } from '../../stores/usePermissionStore';
import { mockUseEbfCountry } from '../__mocks__/useEbfCountry';
import { mockReturnIncomeVisibility } from '../__mocks__/useIncomeVisibility';
import { mockUseIsAccountAU } from '../__mocks__/useIsAccountAU';
import { mockUseSpendVisibility } from '../__mocks__/useSpendVisibility';
import { useGetMoneyTabKeys } from '../useGetMoneyTabKeys';
import { useHeroPointsVisibility } from '../useHeroPointsVisibility';

const mockUseGetSuperAppToken = useGetSuperAppToken as jest.MockedFn<typeof useGetSuperAppToken>;
const mockUseHeroPointsVisibility = useHeroPointsVisibility as jest.MockedFn<typeof useHeroPointsVisibility>;
const mockUseBillManagementMoneyAccess = useBillManagementMoneyAccess as jest.MockedFn<
  typeof useBillManagementMoneyAccess
>;

jest.mock('../../auth/store/useSuperAppTokenStore');
jest.mock('../useHeroPointsVisibility');
jest.mock('../../../features/bill-management/hooks/useBillManagementMoneyAccess');

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
  superChoiceSwag: {
    view: true,
  },
  eBenStash: {
    view: true,
  },
  heroPoints: {
    view: false,
  },
};

describe('useGetMoneyTabKeys', () => {
  beforeEach(() => {
    mockUseSpendVisibility.mockReturnValue({
      showSpendTab: true,
      showCardTab: true,
      showStashTab: true,
      isLoading: false,
      isError: false,
    });

    mockReturnIncomeVisibility({
      showIncomeTab: true,
      showInstapay: true,
    });

    mockUseHeroPointsVisibility.mockReturnValue(true);
    mockUseBillManagementMoneyAccess.mockReturnValue({ permission: true });
    mockUseIsAccountAU.mockReturnValue(true);
    mockUseEbfCountry.mockReturnValue({
      isLoadingEhCountry: false,
      ehCountryCode: 'AU',
      workzoneCountryCode: undefined,
      isFetched: true,
    });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = initialPermissionsState;
    permissionStore.result.current.isFetchedPermission = true;
  });

  it('returns an empty array when there is no super app token', () => {
    mockUseGetSuperAppToken.mockReturnValue({ token: '', loginProvider: 'eh' });

    const { result } = renderHook(() => useGetMoneyTabKeys());
    expect(result.current).toEqual([]);
  });

  it('returns an empty array when there is no eben token', () => {
    mockUseGetSuperAppToken.mockReturnValue({ token: 'super-app-token', loginProvider: 'eh' });
    const ebenStore = renderHook(() => useEbenTokenStore());
    ebenStore.result.current.token = null;
    const { result } = renderHook(() => useGetMoneyTabKeys());
    expect(result.current).toEqual([]);
  });

  describe('when there is a super app token', () => {
    beforeEach(() => {
      mockUseGetSuperAppToken.mockReturnValue({ token: 'super-app-token', loginProvider: 'eh' });
    });

    it('returns the correct tab keys', () => {
      const { result } = renderHook(() => useGetMoneyTabKeys());
      expect(result.current).toEqual([
        WalletTabKeys.SPEND,
        WalletTabKeys.STASH,
        WalletTabKeys.INCOME,
        WalletTabKeys.BILL_MANAGEMENT,
        WalletTabKeys.HERO_POINTS,
        WalletTabKeys.CARD,
        WalletTabKeys.SUPER,
        WalletTabKeys.SUPPORT,
      ]);
    });

    it.each`
      showSpendLoading | showIncomeLoading | isInitingCountry | isFetchedPermission | isLoading
      ${true}          | ${false}          | ${false}         | ${true}             | ${true}
      ${false}         | ${true}           | ${false}         | ${true}             | ${true}
      ${false}         | ${false}          | ${true}          | ${true}             | ${true}
      ${false}         | ${false}          | ${false}         | ${false}            | ${true}
      ${false}         | ${false}          | ${false}         | ${true}             | ${false}
    `(
      `should return correct tab keys when loading`,
      ({ isFetchedPermission, isInitingCountry, isLoading, showIncomeLoading, showSpendLoading }) => {
        mockUseSpendVisibility.mockReturnValue({
          showSpendTab: true,
          showCardTab: true,
          showStashTab: true,
          isLoading: showSpendLoading,
          isError: false,
        });

        mockReturnIncomeVisibility({
          showIncomeTab: true,
          isLoading: showIncomeLoading,
          showInstapay: true,
        });

        mockUseEbfCountry.mockReturnValue({
          isLoadingEhCountry: isInitingCountry,
          ehCountryCode: 'AU',
          workzoneCountryCode: undefined,
          isFetched: true,
        });

        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.isFetchedPermission = isFetchedPermission;

        const { result } = renderHook(() => useGetMoneyTabKeys());
        if (isLoading) {
          expect(result.current).toEqual([]);
        } else {
          expect(result.current).toEqual([
            WalletTabKeys.SPEND,
            WalletTabKeys.STASH,
            WalletTabKeys.INCOME,
            WalletTabKeys.BILL_MANAGEMENT,
            WalletTabKeys.HERO_POINTS,
            WalletTabKeys.CARD,
            WalletTabKeys.SUPER,
            WalletTabKeys.SUPPORT,
          ]);
        }
      }
    );

    it.each`
      showStashTab
      ${true}
      ${false}
    `(`returns correct stash tab when showStashTab is $showStashTab`, ({ showStashTab }) => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab: false,
        showCardTab: false,
        showStashTab,
        isLoading: false,
        isError: false,
      });

      const { result } = renderHook(() => useGetMoneyTabKeys());
      if (showStashTab) {
        expect(result.current).toContain(WalletTabKeys.STASH);
      } else {
        expect(result.current).not.toContain(WalletTabKeys.STASH);
      }
    });

    it.each`
      showSpendTab
      ${true}
      ${false}
    `(`returns correct spend tab when showSpendTab is $showSpendTab`, ({ showSpendTab }) => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab,
        showCardTab: false,
        showStashTab: false,
        isLoading: false,
        isError: false,
      });

      const { result } = renderHook(() => useGetMoneyTabKeys());
      if (showSpendTab) {
        expect(result.current).toContain(WalletTabKeys.SPEND);
      } else {
        expect(result.current).not.toContain(WalletTabKeys.SPEND);
      }
    });

    it.each`
      showCardTab
      ${true}
      ${false}
    `(`returns correct card tab when showCardTab is $showCardTab`, ({ showCardTab }) => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab: false,
        showCardTab,
        showStashTab: false,
        isLoading: false,
        isError: false,
      });

      const { result } = renderHook(() => useGetMoneyTabKeys());
      if (showCardTab) {
        expect(result.current).toContain(WalletTabKeys.CARD);
      } else {
        expect(result.current).not.toContain(WalletTabKeys.CARD);
      }
    });

    it.each`
      heroPointsPermission
      ${true}
      ${false}
    `(
      `returns correct hero points tab when heroPointsPermission is $heroPointsPermission`,
      ({ heroPointsPermission }) => {
        mockUseHeroPointsVisibility.mockReturnValue(heroPointsPermission);

        const { result } = renderHook(() => useGetMoneyTabKeys());
        if (heroPointsPermission) {
          expect(result.current).toContain(WalletTabKeys.HERO_POINTS);
        } else {
          expect(result.current).not.toContain(WalletTabKeys.HERO_POINTS);
        }
      }
    );

    it.each`
      showIncomeTab
      ${true}
      ${false}
    `(`returns correct income tab when showIncomeTab is $showIncomeTab`, ({ showIncomeTab }) => {
      mockReturnIncomeVisibility({
        showIncomeTab,
        showInstapay: true,
      });
      const { result } = renderHook(() => useGetMoneyTabKeys());
      if (showIncomeTab) {
        expect(result.current).toContain(WalletTabKeys.INCOME);
      } else {
        expect(result.current).not.toContain(WalletTabKeys.INCOME);
      }
    });

    it.each`
      billManagementPermission
      ${true}
      ${false}
    `(
      `returns correct bill management tab when billManagementPermission is $billManagementPermission`,
      ({ billManagementPermission }) => {
        mockUseBillManagementMoneyAccess.mockReturnValue({ permission: billManagementPermission });

        const { result } = renderHook(() => useGetMoneyTabKeys());
        if (billManagementPermission) {
          expect(result.current).toContain(WalletTabKeys.BILL_MANAGEMENT);
        } else {
          expect(result.current).not.toContain(WalletTabKeys.BILL_MANAGEMENT);
        }
      }
    );

    it.each`
      superPermission | isAustralian | expected
      ${true}         | ${true}      | ${true}
      ${true}         | ${false}     | ${false}
      ${false}        | ${true}      | ${false}
    `(
      `returns correct super tab when superPermission is $superPermission and isAustralian is $isAustralian`,
      ({ expected, isAustralian, superPermission }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          ...initialPermissionsState,
          superChoiceSwag: { view: superPermission },
        };
        permissionStore.result.current.isFetchedPermission = true;
        mockUseIsAccountAU.mockReturnValue(isAustralian);

        const { result } = renderHook(() => useGetMoneyTabKeys());
        if (expected) {
          expect(result.current).toContain(WalletTabKeys.SUPER);
        } else {
          expect(result.current).not.toContain(WalletTabKeys.SUPER);
        }
      }
    );

    it.each`
      settingsPermission
      ${true}
      ${false}
    `(`returns correct support tab when settingsPermission is $settingsPermission`, ({ settingsPermission }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        ...initialPermissionsState,
        superAppSettings: { view: settingsPermission },
      };
      permissionStore.result.current.isFetchedPermission = true;
      const { result } = renderHook(() => useGetMoneyTabKeys());
      if (settingsPermission) {
        expect(result.current).toContain(WalletTabKeys.SUPPORT);
      } else {
        expect(result.current).not.toContain(WalletTabKeys.SUPPORT);
      }
    });
  });
});
