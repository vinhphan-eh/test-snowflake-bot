import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import { useWorkzonePermission } from '../../../../common/hooks/useWorkzonePermission';

/**
 * Check if the user is eligible to see the groups feature, based on the user's country and workzone blacklist
 * @returns {boolean} - Whether the user is able to see the groups
 */
export const useIsAbleToShowGroups = () => {
  const isWorkzone = useIsWorkzone();
  const {
    benefitsPermission,
    isFetched: isFetchedWorkzonePermission,
    isFetching: isFetchingWorkzonePermission,
    moneyPermission,
  } = useWorkzonePermission();

  const onWorkzoneBlacklist =
    isWorkzone &&
    isFetchedWorkzonePermission &&
    // If any user can not access to Benefits or Money pillar, that means user is in Workzone blacklist
    (!moneyPermission || !benefitsPermission);

  if (isFetchingWorkzonePermission) {
    // Wait until we get the workzone permission
    return false;
  }

  if (onWorkzoneBlacklist) {
    // User in Workzone blacklist
    return false;
  }

  return true;
};
