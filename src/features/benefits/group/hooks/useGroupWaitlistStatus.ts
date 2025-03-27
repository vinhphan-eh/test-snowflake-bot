import { useIsAbleToShowGroups } from './useIsAbleToShowGroups';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useGetUserWaitListQuery } from '../../../../new-graphql/generated';

export const useGroupWaitlistStatus = () => {
  const isAccountAu = useIsAccountAU();
  const toggleMegaDealsMvpCtaPermission = usePermissionStore(state => state.permissions?.toggleMegaDealsMvpCta?.view);
  const toggleMegaDealsGroupsPermission = usePermissionStore(
    state => state.permissions?.toggleMegaDealsCommunitiesCtas?.view
  );

  const { data, isError, isLoading: isFetchingUserWaitlist } = useGetUserWaitListQuery();
  const isJoinedWaitlist = !!data?.me?.group?.waitList?.userId;

  const isLoading = isFetchingUserWaitlist;

  const isAbleToShowGroups = useIsAbleToShowGroups();

  // Logic for showing/hiding megadeal CTA:
  const isShowMegadealCTA =
    !isLoading &&
    !isError &&
    isAccountAu &&
    isAbleToShowGroups &&
    // 3. FF toggleMegaDealsGroupsPermission AND toggleMegaDealsMvpCtaPermission FF are true
    toggleMegaDealsGroupsPermission &&
    toggleMegaDealsMvpCtaPermission;

  return { isShowMegadealCTA, isJoinedWaitlist };
};
