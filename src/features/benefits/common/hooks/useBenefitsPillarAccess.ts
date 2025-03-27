import { useIsCountrySupportedBenefits } from '../../../../common/hooks/useIsCountrySupported';
import { useIsOmopAccountUK } from '../../../../common/hooks/useIsOmopAccountUK';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import { useWorkzonePermission } from '../../../../common/hooks/useWorkzonePermission';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

type UseBenefitsPillarAccess = {
  isAccessible: boolean;
  isFetched: boolean;
  isFetching: boolean;
};

export const useBenefitsPillarAccessLegacy = (): UseBenefitsPillarAccess => {
  const isWorkzone = useIsWorkzone();
  const {
    isCountrySupported,
    isFetched: isFetchedCountry,
    isLoading: isLoadingCountry,
  } = useIsCountrySupportedBenefits();
  const {
    benefitsPermission: workzonePermission,
    isFetched: isFetchedWorkzone,
    isFetching: isFetchingWorkzone,
  } = useWorkzonePermission();
  const pillarBenefitsPermission = usePermissionStore(state => state.permissions?.pillar_benefits?.view) ?? false;
  const blackListBenefitsPermission = usePermissionStore(
    state => state.permissions?.eben_benefits_pillar_black_list?.view
  );
  const internationalBenefitsRefusedPermission = usePermissionStore(
    state => state.permissions?.internationalBenefitsRefused?.view
  );
  const ehPermission =
    pillarBenefitsPermission && !blackListBenefitsPermission && !internationalBenefitsRefusedPermission;

  const pillarVisibility = isWorkzone ? workzonePermission : ehPermission;
  const isFetched = isWorkzone ? isFetchedWorkzone : isFetchedCountry;

  return {
    isAccessible: isCountrySupported && pillarVisibility,
    isFetched,
    isFetching: isLoadingCountry || isFetchingWorkzone,
  };
};

export const useBenefitsPillarAccessForOmop = (): UseBenefitsPillarAccess => {
  const { isFetched, isLoading, isOmopAccountUK } = useIsOmopAccountUK();
  const pillarBenefitsPermission = usePermissionStore(state => state.permissions?.pillar_benefits?.view) ?? false;

  return {
    isAccessible: isOmopAccountUK && pillarBenefitsPermission,
    isFetched,
    isFetching: isLoading,
  };
};

export const useBenefitsPillarAccess = (): UseBenefitsPillarAccess => {
  const isOmopAccount = useSessionStore(state => state.currentUser?.isOmopAccount);
  const legacyPermission = useBenefitsPillarAccessLegacy();
  const omopPermission = useBenefitsPillarAccessForOmop();

  return isOmopAccount ? omopPermission : legacyPermission;
};
