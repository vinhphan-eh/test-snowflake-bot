import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { useIsCandidateV2 } from '../../../../common/hooks/useIsCandidate';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../../common/types/react-query';
import { useShowInstapayIntroductionQuery } from '../../../../new-graphql/generated';

export const useShowInstapayOnboarding = () => {
  const { loginProvider, token } = useGetSuperAppToken('useShowInstapayOnboarding');
  const isCandidate = useIsCandidateV2();
  const isWorkzone = useIsWorkzone();

  const instapayOnboardingWidgetFlag = usePermissionStore(
    state => state.permissions?.instapayOnboardingWidget?.view ?? false
  );
  const isFetchedPermission = usePermissionStore(state => state.isFetchedPermission);

  const currentOrgUuid = useSessionStore(state => state.currentOrgUuid);
  const {
    data,
    isError,
    isFetched: isFetchedShowInstapayWidget,
    isLoading,
  } = useShowInstapayIntroductionQuery(
    { id: currentOrgUuid ?? '' },
    {
      enabled: !isCandidate && !!currentOrgUuid && isEnabledForEh(token, loginProvider) && instapayOnboardingWidgetFlag,
    }
  );
  const isNotEh = isCandidate || isWorkzone;
  const flagIsOffAfterFetched = !instapayOnboardingWidgetFlag && isFetchedPermission;

  const showIntroduction = data?.me?.org?.instapay?.showInstapayIntroductionV2 ?? false;

  const isFetched = isFetchedPermission && isFetchedShowInstapayWidget;

  return {
    // UI wait for isFetched status to render, so when useShowInstapayIntroductionQuery is not enabled, it should consider it as done fetching
    isFetched: isNotEh || flagIsOffAfterFetched ? true : isFetched,
    isError,
    isLoading,
    showInstapayIntroduction: instapayOnboardingWidgetFlag && showIntroduction,
  };
};
