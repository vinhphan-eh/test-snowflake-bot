import { useMemo } from 'react';
import { useEbfCountry } from './useEbfCountry';
import { useHeroPointsVisibility } from './useHeroPointsVisibility';
import { useIncomeVisibility } from './useIncomeVisibility';
import { useIsAccountAU } from './useIsAccountAU';
import { useSpendVisibility } from './useSpendVisibility';
import { useBillManagementMoneyAccess } from '../../features/bill-management/hooks/useBillManagementMoneyAccess';
import type { TabPermissions } from '../../navigation/TopTabsNavigator';
import { useEbenTokenStore } from '../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { usePermissionStore } from '../stores/usePermissionStore';
import { getMoneyTabKeys } from '../utils/getMoneyTabKeys';

export const useGetMoneyTabKeys = () => {
  const { isLoading: showSpendLoading, showCardTab, showSpendTab, showStashTab } = useSpendVisibility();
  const { isLoading: showIncomeLoading, showIncomeTab } = useIncomeVisibility();
  const heroPointsPermission = useHeroPointsVisibility();
  const { permission: billManagementPermission } = useBillManagementMoneyAccess();
  const superPermission = usePermissionStore(state => state.permissions?.superChoiceSwag?.view);
  const settingsPermission = usePermissionStore(state => state.permissions?.superAppSettings?.view);
  const isAustralian = useIsAccountAU();
  const { token: superAppToken } = useGetSuperAppToken('useGetMoneyTabKeys');
  const { isLoadingEhCountry: isInitingCountry } = useEbfCountry();
  const isFetchedPermission = usePermissionStore(state => state.isFetchedPermission ?? false);

  const ebenToken = useEbenTokenStore(state => state.token);

  const spendVisibility = showSpendTab;
  const cardVisibility = showCardTab;
  const stashVisibility = showStashTab;
  const incomeVisibility = showIncomeTab;
  const superVisibility = superPermission && isAustralian;

  const tabPermission: TabPermissions = useMemo(() => {
    return {
      spend: spendVisibility,
      heroPoints: heroPointsPermission,
      stash: stashVisibility,
      card: cardVisibility,
      income: incomeVisibility,
      billManagement: billManagementPermission,
      super: superVisibility,
      support: settingsPermission,
    };
  }, [
    billManagementPermission,
    cardVisibility,
    heroPointsPermission,
    incomeVisibility,
    settingsPermission,
    spendVisibility,
    stashVisibility,
    superVisibility,
  ]);

  const moneyTabKeys = useMemo(() => {
    return getMoneyTabKeys(tabPermission);
  }, [tabPermission]);

  const isLoadingData =
    (spendVisibility && showSpendLoading) ||
    (incomeVisibility && showIncomeLoading) ||
    isInitingCountry ||
    !isFetchedPermission;

  if (!superAppToken || isLoadingData || !ebenToken?.accessToken) {
    return [];
  }

  return moneyTabKeys;
};
