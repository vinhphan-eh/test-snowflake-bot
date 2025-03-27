import React from 'react';
import { Text, View } from 'react-native';
import { mockUseGetSuperAppToken } from '../../common/auth/store/__mocks__/useSuperAppTokenStore';
import { useEbenTokenStore } from '../../common/auth/store/ebenTokenStore';
import { WalletTabKeys } from '../../common/constants/navigation';
import { mockUseEbfCountry } from '../../common/hooks/__mocks__/useEbfCountry';
import { mockReturnIncomeVisibility } from '../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseSpendVisibility } from '../../common/hooks/__mocks__/useSpendVisibility';
import { useIsWorkzone } from '../../common/hooks/useIsWorkzone';
import { usePermissionStore } from '../../common/stores/usePermissionStore';
import { render, renderHook } from '../../common/utils/testing';
import { useBillManagementMoneyAccess } from '../../features/bill-management/hooks/useBillManagementMoneyAccess';
import { getTabs, type TabKeysType, TabPositionsWithIP, TopTabsNavigator } from '../TopTabsNavigator';

const mockUseBillManagementMoneyAccess = useBillManagementMoneyAccess as jest.MockedFn<
  typeof useBillManagementMoneyAccess
>;
const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;

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
    view: true,
  },
};

jest.mock('../../features/bill-management/hooks/useBillManagementMoneyAccess');

jest.mock('../../features/income/screens/IncomeDashboardScreen', () => ({ IncomeDashboardScreen: View }));

jest.mock('../../features/support/screens/SupportDashboardScreen', () => ({ SupportDashboardScreen: View }));

jest.mock('../../features/super/screens/SuperDashboardScreen', () => ({ SuperDashboardScreen: View }));

jest.mock('../../features/spend-account/screens/SpendAccountComingSoonScreen', () => ({
  SpendAccountComingSoonScreen: () => <Text>Spend Account Comming Soon Screen</Text>,
}));

jest.mock('../../features/spend-account/screens/SpendAccountDashboardScreen', () => ({
  SpendAccountDashboardScreen: View,
}));

jest.mock('../../features/card-management/screens/CardManagementDashboardScreen.tsx', () => ({
  CardManagementDashboardScreen: View,
}));

jest.mock('../../common/hooks/useIsWorkzone');

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: () => true,
}));

jest.mock('../../common/hooks/useEbfCountry');

describe('Money top tabs', () => {
  beforeEach(() => {
    const ebenStore = renderHook(() => useEbenTokenStore());
    ebenStore.result.current.token = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    mockUseIsWorkzone.mockReturnValue(false);
    mockUseSpendVisibility.mockReturnValue({
      showSpendTab: true,
      showCardTab: true,
      showStashTab: true,
      isLoading: false,
      isError: false,
    });
    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });
    mockUseEbfCountry.mockReturnValue({
      isLoadingEhCountry: false,
      workzoneCountryCode: 'en-AU',
      ehCountryCode: 'AUS',
      isFetched: true,
    });
    mockUseBillManagementMoneyAccess.mockReturnValue({ permission: true });

    mockUseGetSuperAppToken.mockReturnValue({
      token: 'asda',
      loginProvider: 'eh',
    });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = initialPermissionsState;
    permissionStore.result.current.isFetchedPermission = true;
  });

  it('should render all tabs when all conditions met', () => {
    const { getByText } = render(<TopTabsNavigator />);

    expect(getByText('Spend')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getByText('Income')).toBeTruthy();
    expect(getByText('Support')).toBeTruthy();
    expect(getByText('Card')).toBeTruthy();
    expect(getByText('Bill Management')).toBeTruthy();
  });

  it('should render comming soon screen when not AU', () => {
    mockUseEbfCountry.mockReturnValue({
      isLoadingEhCountry: false,
      workzoneCountryCode: 'en-MY',
      ehCountryCode: 'MY',
      isFetched: true,
    });

    const { getByText } = render(<TopTabsNavigator />);

    expect(getByText('Spend Account Comming Soon Screen')).toBeTruthy();
  });

  it('should show loading when exchange eben token failed', () => {
    const ebenStore = renderHook(() => useEbenTokenStore());
    ebenStore.result.current.tokenStatus = 'failed';

    const { getByTestId } = render(<TopTabsNavigator />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should show loading when super app is fetching permission', () => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = initialPermissionsState;
    permissionStore.result.current.isFetchedPermission = false;

    const { getByTestId } = render(<TopTabsNavigator />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should show loading when user is not workzone and no eh token', () => {
    mockUseGetSuperAppToken.mockReturnValue({
      token: '',
      loginProvider: 'eh',
    });
    const { getByTestId } = render(<TopTabsNavigator />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should show loading when initing eh country', () => {
    mockUseEbfCountry.mockReturnValue({
      isLoadingEhCountry: true,
      workzoneCountryCode: undefined,
      ehCountryCode: undefined,
      isFetched: false,
    });

    const { getByTestId } = render(<TopTabsNavigator />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should show loading when loading spend visibility', () => {
    mockUseSpendVisibility.mockReturnValue({
      showSpendTab: true,
      showCardTab: true,
      showStashTab: true,
      isLoading: true,
      isError: false,
    });
    const { getByTestId } = render(<TopTabsNavigator />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('should show loading when loading income visibility', () => {
    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true, isLoading: true });
    const { getByTestId } = render(<TopTabsNavigator />);

    expect(getByTestId('spinner')).toBeTruthy();
  });

  describe('Hero Points tab', () => {
    beforeEach(() => {
      const initialState = {
        ...initialPermissionsState,
        heroPoints: {
          view: true,
        },
      };
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = initialState;
    });

    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Points')).toBeTruthy();
    });

    it('should not show when it is not AU user', () => {
      mockUseEbfCountry.mockReturnValue({
        isLoadingEhCountry: false,
        workzoneCountryCode: 'en-GB',
        ehCountryCode: 'GB',
        isFetched: true,
      });
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Points')).toBeNull();
    });
  });

  describe('Bill Management tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Bill Management')).toBeTruthy();
    });

    it('should not show when no permission', () => {
      mockUseBillManagementMoneyAccess.mockReturnValue({ permission: false });
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Bill Management')).toBeNull();
    });
  });

  describe('Spend tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Spend')).toBeTruthy();
    });

    it('should not show when no spend permission', () => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab: false,
        showCardTab: false,
        showStashTab: false,
        isLoading: false,
        isError: false,
      });
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Spend')).toBeNull();
    });
  });

  describe('Stash tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Stash')).toBeTruthy();
    });

    it('should not show when no stash permission', () => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab: false,
        showCardTab: false,
        showStashTab: false,
        isLoading: false,
        isError: false,
      });
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Stash')).toBeNull();
    });
  });

  describe('Card tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Card')).toBeTruthy();
    });

    it('should not show when no card permission', () => {
      mockUseSpendVisibility.mockReturnValue({
        showSpendTab: false,
        showCardTab: false,
        showStashTab: false,
        isLoading: false,
        isError: false,
      });
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Card')).toBeNull();
    });
  });

  describe('Income tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Income')).toBeTruthy();
    });

    it('should not show when no income permission', () => {
      mockReturnIncomeVisibility({});
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('AcIncomecount')).toBeNull();
    });
  });

  describe('Support tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Support')).toBeTruthy();
    });

    it('should not show when no support permission', () => {
      const initialState = {
        ...initialPermissionsState,
        superAppSettings: {
          view: false,
        },
      };
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = initialState;
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Support')).toBeNull();
    });
  });

  describe('Super tab', () => {
    it('should show correctly', () => {
      const { getByText } = render(<TopTabsNavigator />);

      expect(getByText('Super')).toBeTruthy();
    });

    it('should not show when no super choice permission', () => {
      const initialState = {
        ...initialPermissionsState,
        superChoiceSwag: {
          view: false,
        },
      };
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = initialState;
      const { queryByText } = render(<TopTabsNavigator />);

      expect(queryByText('Super')).toBeNull();
    });
  });
});

describe(getTabs, () => {
  it('should return all tabs with permission', () => {
    const allTabs = getTabs(
      {
        card: true,
        stash: true,
        spend: true,
        income: true,
        super: true,
        support: true,
        heroPoints: true,
        billManagement: true,
      },
      TabPositionsWithIP
    );

    const expectedTabKeys = [
      WalletTabKeys.INCOME,
      WalletTabKeys.SPEND,
      WalletTabKeys.STASH,
      WalletTabKeys.BILL_MANAGEMENT,
      WalletTabKeys.HERO_POINTS,
      WalletTabKeys.CARD,
      WalletTabKeys.SUPER,
      WalletTabKeys.SUPPORT,
    ];

    allTabs.forEach(tab => {
      expect(tab.key).toBeDefined();
      expect(expectedTabKeys.includes(tab.key as never)).toBeTruthy();
    });
  });

  it('should return tabs with correct position', () => {
    // Card and hero points are not available
    const allTabs = getTabs(
      {
        card: false,
        stash: true,
        spend: true,
        income: true,
        super: true,
        support: true,
        heroPoints: false,
        billManagement: true,
      },
      TabPositionsWithIP
    );

    const sortedTabKeys = allTabs.map(tab => tab.key) as TabKeysType[];
    // Card and hero points are not available, so they should not be in the list
    // Expected tab keys are sorted by position
    const expectedTabKeys = [
      WalletTabKeys.INCOME,
      WalletTabKeys.SPEND,
      WalletTabKeys.STASH,
      WalletTabKeys.BILL_MANAGEMENT,
      WalletTabKeys.SUPER,
      WalletTabKeys.SUPPORT,
    ];

    expect(sortedTabKeys).toStrictEqual(expectedTabKeys);
  });
});
