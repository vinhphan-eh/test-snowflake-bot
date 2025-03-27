import { renderHook } from '@testing-library/react-native';
import { useBillManagementMoneyAccess } from '../../../features/bill-management/hooks/useBillManagementMoneyAccess';
import { useGetSuperAppToken } from '../../auth/store/useSuperAppTokenStore';
import { WalletTabKeys } from '../../constants/navigation';
import { switchPillar } from '../../stores/useMiniAppSwitcherStore';
import { usePermissionStore } from '../../stores/usePermissionStore';
import { mockUseEbfCountry } from '../__mocks__/useEbfCountry';
import { mockReturnIncomeVisibility } from '../__mocks__/useIncomeVisibility';
import { mockUseIsAccountAU } from '../__mocks__/useIsAccountAU';
import { mockUseSpendVisibility } from '../__mocks__/useSpendVisibility';
import { useGetMoneyTabs } from '../useGetMoneyTabs';
import { useHeroPointsVisibility } from '../useHeroPointsVisibility';

const mockUseGetSuperAppToken = useGetSuperAppToken as jest.MockedFn<typeof useGetSuperAppToken>;
const mockUseHeroPointsVisibility = useHeroPointsVisibility as jest.MockedFn<typeof useHeroPointsVisibility>;
const mockUseBillManagementMoneyAccess = useBillManagementMoneyAccess as jest.MockedFn<
  typeof useBillManagementMoneyAccess
>;

jest.mock('../../auth/store/useSuperAppTokenStore');
jest.mock('../useIncomeVisibility');
jest.mock('../useHeroPointsVisibility');
jest.mock('../../../features/bill-management/hooks/useBillManagementMoneyAccess');
jest.mock('../../stores/useMiniAppSwitcherStore', () => ({
  ...jest.requireActual('../../stores/useMiniAppSwitcherStore'),
  switchPillar: jest.fn(),
}));

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

describe('useGetMoneyTabs', () => {
  beforeEach(() => {
    mockUseSpendVisibility.mockReturnValue({
      showSpendTab: true,
      showCardTab: true,
      showStashTab: true,
      isLoading: false,
      isError: false,
    });

    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });

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

    const { result } = renderHook(() => useGetMoneyTabs());
    expect(result.current).toEqual([]);
  });

  describe('when there is a super app token', () => {
    beforeEach(() => {
      mockUseGetSuperAppToken.mockReturnValue({ token: 'super-app-token', loginProvider: 'eh' });
    });

    it('returns the correct tabs', () => {
      const { result } = renderHook(() => useGetMoneyTabs());
      const expectedTabs = [
        {
          key: WalletTabKeys.SPEND,
          name: 'Spend',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.STASH,
          name: 'Stash',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.INCOME,
          name: 'Income',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.BILL_MANAGEMENT,
          name: 'Bill Management',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.HERO_POINTS,
          name: 'Points',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.CARD,
          name: 'Card',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.SUPER,
          name: 'Super',
          module: 'money',
          onPress: expect.any(Function),
        },
        {
          key: WalletTabKeys.SUPPORT,
          name: 'Support',
          module: 'money',
          onPress: expect.any(Function),
        },
      ];
      expect(result.current).toEqual(expectedTabs);
    });

    it('calls the onPress function with the correct arguments', () => {
      const mockedOnFinish = jest.fn();
      const { result } = renderHook(() => useGetMoneyTabs());
      const [{ onPress }] = result.current;

      onPress({ onFinish: mockedOnFinish });

      expect(switchPillar).toHaveBeenCalledWith({
        to: {
          pillarId: expect.any(String),
          tab: expect.any(String),
          onFinish: mockedOnFinish,
        },
      });
    });
  });
});
