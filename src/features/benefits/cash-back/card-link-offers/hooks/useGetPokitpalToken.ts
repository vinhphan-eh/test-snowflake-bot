import { useCashbackUserTokenQuery } from '../../../../../new-graphql/generated';
import { useCheckCompletelyOnboardCashback } from '../../hooks/useCheckCompletelyOnboardCashback';

export const useGetPokitpalToken = () => {
  const { isCompleted, isLoading: isLoadingOnboard } = useCheckCompletelyOnboardCashback();
  const {
    data: userTokenData,
    isError,
    isLoading: isLoadingToken,
    refetch: refetchUserToken,
  } = useCashbackUserTokenQuery(
    {},
    {
      // can only load when completing onboarding
      enabled: isCompleted,
    }
  );

  const fetchUserToken = async () => {
    try {
      const response = await refetchUserToken();
      return response?.data?.me?.cashback?.cashbackUserToken;
    } catch {
      throw new Error('Error fetching user token');
    }
  };

  const isLoading = isLoadingOnboard || isLoadingToken;

  const getToken = async () => {
    let userToken;
    try {
      if (!isCompleted) {
        userToken = await fetchUserToken();
      } else if (userTokenData && !isLoading && !isError) {
        userToken = userTokenData?.me?.cashback?.cashbackUserToken;
      }
      return userToken;
    } catch {
      return userToken;
    }
  };

  return { getToken, isLoading };
};
