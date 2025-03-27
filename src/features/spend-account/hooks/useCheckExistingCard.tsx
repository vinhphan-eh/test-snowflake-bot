import { useGetCurrentCardDetailsQuery, type GetCurrentCardDetailsQuery } from '../../../new-graphql/generated';

/**
 * For checking card of AU users
 */
export const useCheckExistingCard = () => {
  const {
    data: currentCardDetails,
    isError: isCardError,
    isLoading: isCardLoading,
  } = useGetCurrentCardDetailsQuery<GetCurrentCardDetailsQuery>();

  const isCardNotFound = !currentCardDetails?.me?.wallet?.card?.details?.id;

  return { isCardLoading, isCardNotFound, isServerDown: isCardError };
};
