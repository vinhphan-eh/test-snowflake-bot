import { useMemo } from 'react';
import type { BenefitsTabType } from './constants';
import { getTabsV2 } from './constants';
import { useEbenTokenValidForQuery } from '../../../../../common/auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../../../../../common/auth/store/useSuperAppTokenStore';
import { useIsAccountAU } from '../../../../../common/hooks/useIsAccountAU';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { useBillStreamPermission } from '../../../bill-streaming/hooks/useBillStreamPermission';
import { useSwagStorePermission } from '../../../swag-store/hooks/useSwagStorePermission';
import { useCashbackPermission } from '../useCashbackPermission';
import { usePurchaseTabVisibility } from '../usePurchaseTabVisibility';

type ReturnType = {
  tabs: Array<BenefitsTabType>;
  isFetched: boolean;
  specialPillarAccess: boolean;
};

/**
 * Test cases are covered at src/navigation/__tests__/BenefitsTopTabs.test.tsx
 */
export const useBenefitsTabs = (): ReturnType => {
  const isFetchedPermission = usePermissionStore(state => state.isFetchedPermission ?? false);

  const { isFetched: isFetchedCashbackTab, permission: showCashbackFlow } = useCashbackPermission();
  const { permission: storePermission } = useSwagStorePermission();
  const { permission: showBills } = useBillStreamPermission();
  const { isFetched: isFetchedPurchaseTab, permission: showPurchaseTab } = usePurchaseTabVisibility();
  const isAU = useIsAccountAU();

  const { token: superAppToken } = useGetSuperAppToken('useBenefitsTabs');
  const isEbenTokenValid = useEbenTokenValidForQuery();

  const isFetched = isFetchedPermission && isFetchedCashbackTab && isFetchedPurchaseTab;

  const specialPillarAccess = showPurchaseTab;

  const tabs = useMemo(
    () =>
      getTabsV2({
        online: storePermission || showBills || showCashbackFlow,
        instore: showCashbackFlow,
        home: isAU && (showCashbackFlow || showBills || storePermission),
        purchase: showPurchaseTab,
      }),
    [isAU, showCashbackFlow, showBills, storePermission, showPurchaseTab]
  );

  if (!isFetched || !superAppToken || !isEbenTokenValid) {
    return {
      tabs: [],
      isFetched: false,
      specialPillarAccess: false,
    };
  }

  return {
    tabs,
    isFetched,
    specialPillarAccess,
  };
};
