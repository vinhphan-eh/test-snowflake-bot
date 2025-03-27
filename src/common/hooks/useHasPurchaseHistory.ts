import { useIsCandidateV2 } from './useIsCandidate';
import { useIsWorkzone } from './useIsWorkzone';
import { useGetDiscountOrderHistoryQuery } from '../../new-graphql/generated';
import { useEbenTokenValidForQuery } from '../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../stores/useSessionStore';
import { isEnabledForEh } from '../types/react-query';

export const useHasPurchaseHistory = () => {
  const { loginProvider, token } = useGetSuperAppToken('useHasPurchaseHistory');
  const isCandidate = useIsCandidateV2();
  const isWorkZone = useIsWorkzone();
  // must have to turn off enabled of query, when using in combination with retryOnMount
  const isEbenTokenValid = useEbenTokenValidForQuery();
  const orgId = useSessionStore(state => state.currentOrgId ?? '');

  const { data, isError, isFetched, isLoading } = useGetDiscountOrderHistoryQuery(
    {
      input: {
        orgId,
        first: 1,
      },
    },
    {
      // why depend on superAppToken: when logging out, this called again (core navigation issue), but no token will fail and retryOnMount will effect - error cached, won't allow retry when re-login to other account, so hasSuperAppToken is to avoid this being called
      // this should stop calling once get error to avoid infinite loop in core
      // and this 99% doesn't need refetch in background, so set staleTime to avoid it
      // when it needs to update, there are invalidateQueries calls to make it work
      enabled: isEbenTokenValid && isEnabledForEh(token, loginProvider) && !isCandidate && !!orgId,
      retryOnMount: false,
      staleTime: Infinity,
    }
  );

  const countItems = data?.me?.swagStore?.discountOrderHistory?.edges.length;
  const ehFetched = isFetched && (isError ? true : countItems !== undefined);

  return {
    hasPurchaseHistory: (countItems ?? 0) > 0 && !isError && !isLoading,
    isError,
    isLoading,
    // After switching account: there is a short time that react-query return wrong isFetched
    // it returns isFetching = true, isFetched = true ==> which theoretically isFetched should be false when isFetching = true => could be react-query bug on v3.
    // But eventually it returns correct data => but this short period of wrong data makes our loading fails
    // so need to depend on API response !== undefined to check if it's really fetched
    // isFetched is true for workzone/candidate because workzone/candidate doesn't fetch this
    isFetched: isCandidate || isWorkZone ? true : ehFetched,
  };
};
