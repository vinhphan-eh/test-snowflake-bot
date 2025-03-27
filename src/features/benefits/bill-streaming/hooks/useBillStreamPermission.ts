import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { Pid } from '../../../../new-graphql/generated';
import { useBenefitsPillarAccess } from '../../common/hooks/useBenefitsPillarAccess';

// Bill open for all user in AU (including terminated users) and only for users with access to the benefits pillar.
export const useBillStreamPermission = () => {
  const isAU = useIsAccountAU();
  const { isAccessible, isFetched } = useBenefitsPillarAccess();

  const billStreamingPermission = usePermissionStore(state => state.permissions?.benefitsBillStreaming?.view ?? false);

  const featureAccess = isAccessible && isAU && billStreamingPermission;

  return {
    permission: featureAccess,
    isFetched,
  };
};

export const useBillStreamPermissionByProvider = (pid: Pid) => {
  const { isFetched, permission: featureAccess } = useBillStreamPermission();

  const isTerminated = useSessionStore(state => state.currentUser?.attributes?.terminated);

  const billAhmPromoTilePermission = usePermissionStore(
    state => state.permissions?.benefitsBillAhmPromoTile?.view ?? false
  );
  const billMedibankPromoTilePermission = usePermissionStore(
    state => state.permissions?.benefitsBillMedibankPromoTile?.view ?? false
  );
  const benefitsFitnessFirstPermission = usePermissionStore(
    state => state.permissions?.benefitsFitnessFirst?.view ?? false
  );
  const benefitsGoodlifeFitnessPermission = usePermissionStore(
    state => state.permissions?.benefitsGoodlifeFitness?.view ?? false
  );

  // Return permission based on provider
  // Docs: https://employmenthero.atlassian.net/wiki/spaces/HSIB/pages/2504886826/Access+Control+for+benefits
  switch (pid) {
    case Pid.Ahm:
      return {
        permission: isTerminated ? false : featureAccess && billAhmPromoTilePermission,
        isFetched,
      };
    case Pid.Medibank:
      return {
        permission: isTerminated ? false : featureAccess && billMedibankPromoTilePermission,
        isFetched,
      };
    case Pid.FitnessFirst:
      return {
        permission: benefitsFitnessFirstPermission,
        isFetched,
      };
    case Pid.GoodlifeHealthClubs:
      return {
        permission: benefitsGoodlifeFitnessPermission,
        isFetched,
      };
    default:
      break;
  }

  // Return ENGIE Permission by default
  return {
    permission: featureAccess,
    isFetched,
  };
};
