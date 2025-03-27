import { usePermissionStore } from '../../../common/stores/usePermissionStore';
import { useGetStashMetadataQuery } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';

export const useCheckShowStashEntryCard = (onboardingDone: boolean) => {
  const { currentRegion } = useRegionLocalisation();
  const stashPermission = usePermissionStore(state => state.permissions?.eBenStash?.view);

  const { data: stashMeta, isLoading: isGetStashMetaLoading } = useGetStashMetadataQuery(undefined, {
    enabled: currentRegion === Region.au && stashPermission,
  });

  return (
    currentRegion === Region.au &&
    onboardingDone &&
    !isGetStashMetaLoading &&
    !stashMeta?.me?.wallet?.stash?.metadata?.isStashEntryButtonInSpendAccountHidden &&
    stashPermission
  );
};
