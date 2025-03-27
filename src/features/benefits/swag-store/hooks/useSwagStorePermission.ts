import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { useIsAccountNZ } from '../../../../common/hooks/useIsAccountNZ';
import { useIsAccountUK } from '../../../../common/hooks/useIsAccountUK';
import { useIsCandidateV2 } from '../../../../common/hooks/useIsCandidate';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { useBenefitsPillarAccess } from '../../common/hooks/useBenefitsPillarAccess';

type SwagStorePermission = {
  permission: boolean;
  isLoading?: boolean;
  isFetched: boolean;
};

export const useSwagStorePermission = (): SwagStorePermission => {
  const isTerminated = useSessionStore(state => state.currentUser?.attributes?.terminated);

  const benefitsPermission = usePermissionStore(state => state.permissions?.superAppBenefits?.view) ?? false;
  const isFetchedEhPermission = usePermissionStore(state => state.isFetchedPermission) ?? false;
  const { isAccessible, isFetched: isFetchedPillarAccess } = useBenefitsPillarAccess();
  const isOpenForUK = usePermissionStore(state => state.permissions?.benefitsStoreAppUK?.view) ?? false;
  const isOpenForNZ = usePermissionStore(state => state.permissions?.benefitsStoreAppNZ?.view) ?? false;
  const isAU = useIsAccountAU();
  const isUK = useIsAccountUK();
  const { isNZaccount: isNZ } = useIsAccountNZ();

  // swag store is available for AU and UK users
  const isCountrySupported = isAU || (isUK && isOpenForUK) || (isNZ && isOpenForNZ);

  const isCandidate = useIsCandidateV2();
  const isWorkZone = useIsWorkzone();
  const restrictedUSerType = isWorkZone || isCandidate;
  const ehStoreAccess = benefitsPermission && isCountrySupported && !restrictedUSerType;

  return {
    permission: !isTerminated && ehStoreAccess && isAccessible,
    isFetched: isFetchedEhPermission && isFetchedPillarAccess,
  };
};
