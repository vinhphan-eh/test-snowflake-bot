import {
  useGetCurrentCardDetailsQuery,
  useGetEWalletUkAccountDetailsQuery,
  type GetCurrentCardDetailsQuery,
  type GetEWalletUkAccountDetailsQuery,
} from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';

/**
 * For checking existing card of multi-region features, supporting both AU and UK users
 */

export const useCheckCardByRegion = () => {
  const { currentRegion } = useRegionLocalisation();
  const {
    data: currentCardDetails,
    isError: isCardError,
    isFetching: isCardFetching,
    isLoading: isCardLoading,
  } = useGetCurrentCardDetailsQuery<GetCurrentCardDetailsQuery>(undefined, {
    enabled: currentRegion === Region.au,
  });

  const {
    data: ukWalletDetails,
    isError: isUKCardError,
    isFetching: isUKCardFetching,
    isLoading: isUKCardLoading,
  } = useGetEWalletUkAccountDetailsQuery<GetEWalletUkAccountDetailsQuery>(undefined, {
    enabled: currentRegion === Region.gb,
  });

  const isCardNotFound =
    !currentCardDetails?.me?.wallet?.card?.details?.id && !ukWalletDetails?.me?.wallet?.UKWalletDetails?.cardId;

  return {
    isCardLoading: isCardLoading || isUKCardLoading,
    isCardNotFound,
    isServerDown: isCardError || isUKCardError,
    isFetching: isUKCardFetching || isCardFetching,
    currentRegion,
  };
};
