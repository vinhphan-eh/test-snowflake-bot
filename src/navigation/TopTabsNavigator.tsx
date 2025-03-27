import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { TabType } from '@hero-design/rn';
import { Box, Spinner, Tabs, useTheme } from '@hero-design/rn';
import { useIsFocused } from '@react-navigation/native';
import { addBreadcrumb } from '@sentry/react-native';
import { withErrorBoundary } from './ErrorBoundary';
import { topTabUtils } from './utils';
import { useEbenTokenValidForQuery } from '../common/auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../common/auth/store/useSuperAppTokenStore';
import { TopTabItem } from '../common/components/top-tab/TopTabItem';
import { WalletTabKeys } from '../common/constants/navigation';
import { useHandlePendingDeepLink } from '../common/deep-link/useHandlePendingDeepLink';
import { useEbfCountry } from '../common/hooks/useEbfCountry';
import { useHeroPointsVisibility } from '../common/hooks/useHeroPointsVisibility';
import { useIncomeVisibility } from '../common/hooks/useIncomeVisibility';
import { useIsAccountAU } from '../common/hooks/useIsAccountAU';
import { useIsCountrySupported } from '../common/hooks/useIsCountrySupported';
import { useIsWorkzone } from '../common/hooks/useIsWorkzone';
import { useMixpanel } from '../common/hooks/useMixpanel';
import { useSpendVisibility } from '../common/hooks/useSpendVisibility';
import { useHandlePendingOpenedNotification } from '../common/notification/useHandlePendingOpenedNotification';
import { setReadyToSwitchTab } from '../common/stores/useMiniAppSwitcherStore';
import { usePermissionStore } from '../common/stores/usePermissionStore';
import { EventTrackingCategory } from '../common/stores/useSessionStore';
import { useTopTabStore } from '../common/stores/useTopTabStore';
import { humanize } from '../common/utils/string';
import { useBillManagementMoneyAccess } from '../features/bill-management/hooks/useBillManagementMoneyAccess';
import { BillManagementDashboardScreen } from '../features/bill-management/screens/BillManagementDashboardScreen';
import { CardManagementDashboardScreen } from '../features/card-management/screens/CardManagementDashboardScreen';
import { HeroPointsDashboardScreen } from '../features/hero-points/screens/HeroPointsDashboardScreen';
import { IncomeDashboardScreen } from '../features/income/screens/IncomeDashboardScreen';
import { useGetWeavrAccessToken } from '../features/onboarding/hooks/useGetWeavrAccessToken';
import { SpendAccountComingSoonScreen } from '../features/spend-account/screens/SpendAccountComingSoonScreen';
import { SpendAccountDashboardScreen } from '../features/spend-account/screens/SpendAccountDashboardScreen';
import { StashDashboardScreen } from '../features/stash/screens/StashDashboardScreen';
import { SuperDashboardScreen } from '../features/super/screens/SuperDashboardScreen';
import { SupportDashboardScreen } from '../features/support/screens/SupportDashboardScreen';
import { useCountryPicker } from '../providers/CountryPickerProvider/useCountryPicker';
import { useRegionLocalisation } from '../providers/LocalisationProvider';
import { Region } from '../providers/LocalisationProvider/constants';

type TabKeysIndexes = keyof typeof WalletTabKeys;

export type TabKeysType = (typeof WalletTabKeys)[TabKeysIndexes];
export type TabPermissions = {
  spend?: boolean;
  stash?: boolean;
  income?: boolean;
  billManagement?: boolean;
  heroPoints?: boolean;
  support?: boolean;
  card?: boolean;
  super?: boolean;
};

// Lowest number will be on the top position of the tab
export type TabPositions = {
  [key in TabKeysType]: number;
};

export const TabPositionsWithIP: TabPositions = {
  [WalletTabKeys.INCOME]: 0,
  [WalletTabKeys.SPEND]: 1,
  [WalletTabKeys.STASH]: 2,
  [WalletTabKeys.BILL_MANAGEMENT]: 3,
  [WalletTabKeys.HERO_POINTS]: 4,
  [WalletTabKeys.CARD]: 5,
  [WalletTabKeys.SUPER]: 6,
  [WalletTabKeys.SUPPORT]: 7,
  // FIXME: it seems like benefits and hero dollars are not used anymore
  [WalletTabKeys.BENEFITS]: 99,
  [WalletTabKeys.HERO_DOLLARS]: 99,
  [WalletTabKeys.NONE]: 99,
};

export const TabPositionsWithoutIP: TabPositions = {
  [WalletTabKeys.SPEND]: 0,
  [WalletTabKeys.INCOME]: 1,
  [WalletTabKeys.STASH]: 2,
  [WalletTabKeys.BILL_MANAGEMENT]: 3,
  [WalletTabKeys.HERO_POINTS]: 4,
  [WalletTabKeys.CARD]: 5,
  [WalletTabKeys.SUPER]: 6,
  [WalletTabKeys.SUPPORT]: 7,
  // FIXME: it seems like benefits and hero dollars are not used anymore
  [WalletTabKeys.BENEFITS]: 99,
  [WalletTabKeys.HERO_DOLLARS]: 99,
  [WalletTabKeys.NONE]: 99,
};

const findTabPosition = (tabKey: TabKeysType, tabPositions: TabPositions): number => {
  return tabPositions[tabKey] ?? 100;
};

export const getTabs = (permissions: TabPermissions, tabPositions: TabPositions): Array<TabType> => {
  const availableTabsBasedOnPermissions = [
    permissions.income ? WalletTabKeys.INCOME : undefined,
    permissions.spend ? WalletTabKeys.SPEND : undefined,
    permissions.stash ? WalletTabKeys.STASH : undefined,
    permissions.billManagement ? WalletTabKeys.BILL_MANAGEMENT : undefined,
    permissions.heroPoints ? WalletTabKeys.HERO_POINTS : undefined,
    permissions.card ? WalletTabKeys.CARD : undefined,
    permissions.super ? WalletTabKeys.SUPER : undefined,
    permissions.support ? WalletTabKeys.SUPPORT : undefined,
  ].filter(Boolean) as TabKeysType[];

  const sortedTabs = availableTabsBasedOnPermissions.sort((a, b) => {
    return findTabPosition(a, tabPositions) - findTabPosition(b, tabPositions);
  });

  // Map typeKey to its component
  return (
    sortedTabs
      .map(tabKey => {
        switch (tabKey) {
          case WalletTabKeys.INCOME:
            return {
              key: WalletTabKeys.INCOME,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.INCOME} title="Income" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.INCOME} title="Income" />,
              component: withErrorBoundary(IncomeDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.SPEND:
            return {
              key: WalletTabKeys.SPEND,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.SPEND} title="Spend" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.SPEND} title="Spend" />,
              component: withErrorBoundary(SpendAccountDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.STASH:
            return {
              key: WalletTabKeys.STASH,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.STASH} title="Stash" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.STASH} title="Stash" />,
              component: withErrorBoundary(StashDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.BILL_MANAGEMENT:
            return {
              key: WalletTabKeys.BILL_MANAGEMENT,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.BILL_MANAGEMENT} title="Bill Management" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.BILL_MANAGEMENT} title="Bill Management" />,
              component: withErrorBoundary(BillManagementDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.HERO_POINTS:
            return {
              key: WalletTabKeys.HERO_POINTS,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.HERO_POINTS} title="Points" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.HERO_POINTS} title="Points" />,
              component: withErrorBoundary(HeroPointsDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.CARD:
            return {
              key: WalletTabKeys.CARD,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.CARD} title="Card" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.CARD} title="Card" />,
              component: withErrorBoundary(CardManagementDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.SUPER:
            return {
              key: WalletTabKeys.SUPER,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.SUPER} title="Super" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.SUPER} title="Super" />,
              component: withErrorBoundary(SuperDashboardScreen, 'wallet'),
            };
          case WalletTabKeys.SUPPORT:
            return {
              key: WalletTabKeys.SUPPORT,
              activeItem: () => <TopTabItem isActive testID={WalletTabKeys.SUPPORT} title="Support" />,
              inactiveItem: () => <TopTabItem testID={WalletTabKeys.SUPPORT} title="Support" />,
              component: withErrorBoundary(SupportDashboardScreen, 'wallet'),
            };
          default:
            return undefined;
        }
      })
      // Remove all undefined
      .filter(Boolean) as TabType[]
  );
};
export const TopTabsNavigator = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<TabKeysType>(WalletTabKeys.NONE);
  const { token: superAppToken } = useGetSuperAppToken('TopTabsNavigator');
  const { isLoadingEhCountry: isInitingCountry } = useEbfCountry();
  const { setReady: setDeeplinkReady } = useHandlePendingDeepLink(false);
  const { setReady: setNotiReady } = useHandlePendingOpenedNotification(false);
  const isFetchedPermission = usePermissionStore(state => state.isFetchedPermission ?? false);
  const { isLoading: showSpendLoading, showCardTab, showSpendTab, showStashTab } = useSpendVisibility();
  const heroPointsPermission = useHeroPointsVisibility();
  const { permission: billManagementPermission } = useBillManagementMoneyAccess();
  const settingsPermission = usePermissionStore(state => state.permissions?.superAppSettings?.view);
  const superPermission = usePermissionStore(state => state.permissions?.superChoiceSwag?.view);
  const finishLoading = useRef(false);
  const { isLoading: showIncomeLoading, showIncomeTab, showInstapay } = useIncomeVisibility();
  const { colors } = useTheme();
  const isEbenTokenValid = useEbenTokenValidForQuery();

  const isWorkzoneUser = useIsWorkzone();
  const isAustralian = useIsAccountAU();

  const spendVisibility = showSpendTab;
  const cardVisibility = showCardTab;
  const stashVisibility = showStashTab;
  const incomeVisibility = showIncomeTab;
  const superVisibility = superPermission && isAustralian;

  const { screenTracking } = useMixpanel();
  const tabKeyPrevious = useRef(selectedTabKey);
  const isFocused = useIsFocused();
  const isFocusedPrevious = useRef(isFocused);
  const countryPicker = useCountryPicker();
  const { isCountrySupported } = useIsCountrySupported();
  const { currentRegion } = useRegionLocalisation();
  const { accessToken, startBiometricLogin } = useGetWeavrAccessToken();

  const isLoadingData = showSpendLoading || showIncomeLoading || isInitingCountry || !isFetchedPermission;

  const tabPermission: TabPermissions = useMemo(
    () => ({
      spend: spendVisibility,
      heroPoints: heroPointsPermission,
      stash: stashVisibility,
      card: cardVisibility,
      income: incomeVisibility,
      billManagement: billManagementPermission,
      super: superVisibility,
      support: settingsPermission,
    }),
    [
      billManagementPermission,
      cardVisibility,
      heroPointsPermission,
      incomeVisibility,
      settingsPermission,
      spendVisibility,
      stashVisibility,
      superVisibility,
    ]
  );

  const allTabHidden = Object.keys(tabPermission).every(key => tabPermission[key as keyof TabPermissions] === false);

  const tabs = useMemo(() => {
    return getTabs(tabPermission, showInstapay ? TabPositionsWithIP : TabPositionsWithoutIP);
  }, [showInstapay, tabPermission]);

  useEffect(() => {
    return () => {
      useTopTabStore.setState({
        selectedTab: undefined,
      });
    };
  }, []);

  useEffect(() => {
    topTabUtils.initMoneySelectTab(setSelectedTabKey, isWorkzoneUser);
    return () => {
      topTabUtils.setSelectedTab = undefined;
    };
  }, [isWorkzoneUser]);

  useEffect(() => {
    if (selectedTabKey === WalletTabKeys.NONE && tabs.length > 0 && !isLoadingData) {
      setSelectedTabKey(tabs[0].key as TabKeysType);
      setReadyToSwitchTab(true);
      // should wait for tabs finish loading before navigation
      setDeeplinkReady(true);
      setNotiReady(true);
    } else if (selectedTabKey !== WalletTabKeys.NONE) {
      useTopTabStore.setState({
        selectedTab: selectedTabKey,
      });
    }
  }, [tabs, selectedTabKey, isLoadingData]);

  useEffect(() => {
    if (tabKeyPrevious.current !== selectedTabKey || isFocusedPrevious.current !== isFocused) {
      if (selectedTabKey !== WalletTabKeys.NONE && isFocused) {
        screenTracking({
          event: `Visit personal ${humanize(selectedTabKey)}`,
          categoryName: EventTrackingCategory.USER_ACTION,
          metaData: { module: 'Money pillar' },
        });
        addBreadcrumb({
          category: 'tab',
          type: 'navigation',
          message: 'selected tab',
          data: { previousTab: tabKeyPrevious.current, currentTab: selectedTabKey },
        });
      }

      tabKeyPrevious.current = selectedTabKey;
      isFocusedPrevious.current = isFocused;
    }
  }, [selectedTabKey, screenTracking, isFocused]);

  useEffect(() => {
    if (selectedTabKey === WalletTabKeys.CARD && isFocused) {
      if (currentRegion === Region.gb && !accessToken) {
        startBiometricLogin();
      }
    }
  }, [selectedTabKey]);

  if (allTabHidden) {
    return null;
  }

  // Fix app crash when all feature flag data is off
  // or no token provided yet
  // or is loading income ( with incomeVisibility, if not, doesn't need to wait)
  // or when not initializing country: avoid jumping UI when Money is startup app of super app

  // when tabs is already rendered, no need to show spinner anymore and
  // when query got error, childrens (tabs) could use the same one and trigger the loading again -> loop
  // the solution is to use finishLoading (ref) to prevent this case
  const shouldRenderSpinner = !selectedTabKey || !superAppToken || isLoadingData || !isEbenTokenValid;
  if (shouldRenderSpinner && !finishLoading.current) {
    return (
      <Box style={{ flex: 1 }} backgroundColor="neutralGlobalSurface">
        <Spinner testID="spinner" />
      </Box>
    );
  }

  if (!isCountrySupported) {
    return <SpendAccountComingSoonScreen openCountrySelector={countryPicker.open} />;
  }

  finishLoading.current = true;

  return (
    <Tabs.Scroll
      containerStyle={{ flex: 1, backgroundColor: colors.neutralGlobalSurface }}
      barStyle={{ backgroundColor: colors.defaultGlobalSurface }}
      onTabPress={newTabKey => {
        const tabKey = newTabKey as TabKeysType;
        topTabUtils.selectedTab = tabKey;
        setSelectedTabKey(tabKey);
      }}
      selectedTabKey={selectedTabKey}
      tabs={tabs}
      lazy
      lazyPreloadDistance={3}
    />
  );
};
