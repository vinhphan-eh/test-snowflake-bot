import { useIsCountrySupported } from './useIsCountrySupported';
import { useIsWorkzone } from './useIsWorkzone';
import { useWorkzonePermission } from './useWorkzonePermission';
import { usePermissionStore } from '../stores/usePermissionStore';

// Splitted out from useMoneyPillarPermission hook: Pillar permission without special condition to bypass like having wallet/subscription
// test case is under src/common/hooks/__tests__/useEbfPillarPermission.test.ts
export const usePureMoneyPillarPermission = () => {
  const isWorkzone = useIsWorkzone();
  const { isCountrySupported, isFetched: isFetchedCountry } = useIsCountrySupported();
  const { isFetched: isFetchedWorkzone, moneyPermission: workzonePermission } = useWorkzonePermission();

  const pillarMoneyPermission = usePermissionStore(state => state.permissions?.pillar_money?.view);
  const blackListMoneyPermission = usePermissionStore(state => state.permissions?.eben_money_pillar_black_list?.view);
  const ehPermission = (pillarMoneyPermission && !blackListMoneyPermission) ?? false;

  const pillarVisibility = isWorkzone ? workzonePermission : ehPermission;

  const isFetched = isWorkzone ? isFetchedWorkzone : isFetchedCountry;

  return {
    permission: isCountrySupported && pillarVisibility,
    isFetched,
  };
};
