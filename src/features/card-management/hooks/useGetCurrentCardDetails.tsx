import {
  CardStatus as AUCardStatus,
  PaymentCardStatus,
  useGetCurrentCardDetailsQuery,
  useGetEWalletUkCurrentPaymentCardDetailsQuery,
  type GetCurrentCardDetailsQuery,
  type GetEWalletUkCurrentPaymentCardDetailsQuery,
} from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';

export const AllPaymentCardStatus = { ...AUCardStatus, ...PaymentCardStatus };

export const useGetCurrentCardDetails = (accessToken = '') => {
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
    data: ukCurrentCardDetails,
    isError: isUKCardError,
    isFetching: isUKCardFetching,
    isLoading: isUKCardLoading,
  } = useGetEWalletUkCurrentPaymentCardDetailsQuery<GetEWalletUkCurrentPaymentCardDetailsQuery>(
    { accessToken: accessToken ?? '' },
    {
      enabled: currentRegion === Region.gb && !!accessToken,
    }
  );

  switch (currentRegion) {
    case Region.gb:
      return {
        data: ukCurrentCardDetails?.me?.wallet?.UKCurrentPaymentCardV2,
        isError: isUKCardError,
        isLoading: isUKCardLoading,
        isFetching: isUKCardFetching,
        currentRegion,
      };

    default:
      return {
        data: currentCardDetails?.me?.wallet?.card?.details,
        isError: isCardError,
        isLoading: isCardLoading,
        isFetching: isCardFetching,
        currentRegion,
      };
  }
};
