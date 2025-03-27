import { useIsAccountAU } from './useIsAccountAU';
import { useIsAccountUK } from './useIsAccountUK';
import { useIsWorkzone } from './useIsWorkzone';
import { usePermissionStore } from '../stores/usePermissionStore';

export const useHeroPointsVisibility = () => {
  const isAuAccount = useIsAccountAU();
  const isUKAccount = useIsAccountUK();
  const eligibleHPAccounts = isAuAccount || isUKAccount;
  const isWorkzoneUser = useIsWorkzone();
  const heroPointsPermission = usePermissionStore(state => state.permissions?.heroPoints?.view);

  return eligibleHPAccounts && !isWorkzoneUser && heroPointsPermission;
};

export const useSpendHPOnSwagCardVisiblity = () => {
  const heroPointsPermission = useHeroPointsVisibility();
  const spendHPOnSwagCardPermission = usePermissionStore(
    state => state.permissions?.eBenSpendHeroDollarsOnSwagCard?.view
  );

  return heroPointsPermission && spendHPOnSwagCardPermission;
};
