import { useEbenTokenValidForQuery } from '../../../common/auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { isEnabledForEh } from '../../../common/types/react-query';
import { useGetSubscriptionsQuery } from '../../../new-graphql/generated';

export const useHasActiveBillSubscription = () => {
  const { loginProvider, token } = useGetSuperAppToken('useHasActiveBillSubscription');

  const isEbenTokenValid = useEbenTokenValidForQuery();
  const {
    data: getSubScriptionResponse,
    isError,
    isFetched,
  } = useGetSubscriptionsQuery(
    {
      input: {
        first: 20,
      },
    },
    { enabled: isEnabledForEh(token, loginProvider) && isEbenTokenValid, retryOnMount: false }
  );

  const listData = getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges;
  const hasBillSubscription = listData?.some(e => e.node.status === 'ACTIVE' || e.node.status === 'CANCELLED') ?? false;
  return {
    hasBillSubscription: hasBillSubscription && !isError,
    isError,
    // After switching account: there is a short time that react-query return wrong isFetched
    // it returns isFetching = true, isFetched = true ==> which theoretically isFetched should be false when isFetching = true => could be react-query bug on v3.
    // But eventually it returns correct data => but this short period of wrong data makes our loading fails
    // so need to depend on API response !== undefined to check if it's really fetched
    isFetched: isFetched && (isError ? true : listData !== undefined),
  };
};
