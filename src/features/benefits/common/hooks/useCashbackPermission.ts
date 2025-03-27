import { useBenefitsPillarAccess } from './useBenefitsPillarAccess';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

type CashbackPermission = {
  permission: boolean;
  isLoading: boolean;
  isFetched: boolean;
};

export const useCashbackPermissionLegacy = (): CashbackPermission => {
  const isAU = useIsAccountAU();
  const { isAccessible, isFetched, isFetching } = useBenefitsPillarAccess();
  // this permission already included candidate check
  const permission = usePermissionStore(state => state.permissions?.superAppCashback?.view) ?? false;

  // when blacklisted from pillar, it might still open pillar and some feature tab, but not cashback
  return {
    permission: isAccessible && permission && isAU,
    isLoading: isFetching,
    isFetched,
  };
};

export const useCashbackPermissionForOmop = (): CashbackPermission => {
  const { isAccessible, isFetched: isFetchedBenefitsAccess, isFetching } = useBenefitsPillarAccess();

  const isAU = useIsAccountAU();
  const permission = usePermissionStore(state => state.permissions?.superAppCashback?.view) ?? false;

  return {
    // when blacklisted from pillar, it might still open pillar and some feature tab, but not cashback
    permission: isAccessible && permission && isAU,
    isLoading: isFetching,
    isFetched: isFetchedBenefitsAccess,
  };
};

export const useCashbackPermission = (): CashbackPermission => {
  const isOmopAccount = useSessionStore(state => state.currentUser?.isOmopAccount);
  const legacyPermission = useCashbackPermissionLegacy();
  const omopPermission = useCashbackPermissionForOmop();

  return isOmopAccount ? omopPermission : legacyPermission;
};
