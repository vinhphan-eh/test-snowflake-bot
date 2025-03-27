import { useGetWalletStatusQuery, WalletSetupStatus } from '../../new-graphql/generated';
import { useEbenTokenValidForQuery } from '../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { isEnabledForEh } from '../types/react-query';

/**
 * Check if account wallet status is "Complete"
 */
export const useIsWalletSetupComplete = () => {
  const { loginProvider, token } = useGetSuperAppToken('useIsWalletSetupComplete');

  const isEbenTokenValid = useEbenTokenValidForQuery();
  const { data, isError, isFetched, isLoading } = useGetWalletStatusQuery(
    {},
    {
      // why depend on superAppToken: when logging out, this called again (core navigation issue), but no token will fail and retryOnMount will effect - error cached, won't allow retry when re-login to other account, so hasSuperAppToken is to avoid this being called
      // this should stop calling once get error to avoid infinite loop in core
      // and this 99% doesn't need refetch in background, so set staleTime to avoid it
      // when it needs to update, there are invalidateQueries calls to make it work
      enabled: isEnabledForEh(token, loginProvider) && isEbenTokenValid,
      retryOnMount: false,
      staleTime: Infinity,
    }
  );

  const walletStatus = data?.me?.wallet?.details.setupStatus?.status;

  return {
    isWalletSetupComplete: walletStatus === WalletSetupStatus.Completed,
    isLoading,
    // After switching account: there is a short time that react-query return wrong isFetched
    // it returns isFetching = true, isFetched = true ==> which theoretically isFetched should be false when isFetching = true => could be react-query bug on v3.
    // But eventually it returns correct data => but this short period of wrong data makes our loading fails
    // so need to depend on API response !== undefined to check if it's really fetched
    isFetched: isFetched && (isError ? true : walletStatus !== undefined),
    isError,
  };
};
