import { useGetOrgsQuery } from '../../new-graphql/generated';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { isEnabledForEh } from '../types/react-query';

// Is the current member a contractor in all their current memberships?
// if any membership is NOT a contractor, will return false.
export const useIsOnlyContractor = () => {
  const { loginProvider, token } = useGetSuperAppToken('useIsOnlyContractor');
  const { data, isError, isLoading } = useGetOrgsQuery(undefined, {
    enabled: isEnabledForEh(token, loginProvider),
    retryOnMount: false,
  });

  return {
    isOnlyContractor: data?.me?.orgs?.every(org => org.isIndependentContractor) ?? false,
    isError,
    isLoading,
  };
};
