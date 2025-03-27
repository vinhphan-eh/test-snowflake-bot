import { useState } from 'react';
import type { EnrolCardData } from './useEnrolCardFlow';
import { useEnrolCardFlow } from './useEnrolCardFlow';
import { useGetPokitpalToken } from './useGetPokitpalToken';
import { useMeaWalletMcd } from './useMeaWalletMcd';
import { usePokitpalAccount } from './usePokitpalAccount';
import { CARD_DATA_FORMAT, ENROL_CARD_FORMAT } from '../../../../../common/constants/date';
import { formatStringToDate } from '../../../../../common/utils/date';
import {
  useCashbackDeleteCardMutation,
  useCashbackLinkedCardsQuery,
  useGetCurrentCardDetailsQuery,
  useGetEhProviderIdQuery,
} from '../../../../../new-graphql/generated';
import { AutoEnrolStatus, EMPLOYMENT_HERO_PROVIDER } from '../constants/autoEnrol';

/**
 *
 * @deprecated use useCheckAutoEnrollment instead
 */
export const useAutoEnrolHeroWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: cardDetails, isLoading: isLoadingCardDetails } = useGetCurrentCardDetailsQuery();
  const { isLoading: isLoadingPokitpalRelated, registerUserBankIfDoNotExist } = usePokitpalAccount();
  const { getToken, isLoading: isLoadingToken } = useGetPokitpalToken();
  const { refetch: refetchCardLink } = useCashbackLinkedCardsQuery({}, { enabled: false });
  const { getUserCardData, isLoading: isLoadingCardData } = useMeaWalletMcd();
  const { enrolCard } = useEnrolCardFlow();
  const { data: ehProvider, isLoading: isLoadingEhProvider } = useGetEhProviderIdQuery();
  const { mutateAsync: deleteCardAsync } = useCashbackDeleteCardMutation();

  const ehProviderId = ehProvider?.me?.cashback?.ehProviderId.id;
  const heroWalletId = cardDetails?.me?.wallet?.card?.details?.id;
  const haveHeroWallet = heroWalletId;

  const isPreparingData =
    isLoadingPokitpalRelated || isLoadingCardDetails || isLoadingCardData || isLoadingEhProvider || isLoadingToken;

  // enrol swag visa debit card to pokitpal linked cards
  const enrolSwagCard = async () => {
    const userCard = await getUserCardData();
    if (userCard?.pan && userCard?.expiry && ehProviderId) {
      // register to cashback linked cards
      const normalizeExpiryDate = formatStringToDate(userCard.expiry, CARD_DATA_FORMAT, ENROL_CARD_FORMAT);
      const enrolledData: EnrolCardData = {
        cardNumber: userCard.pan,
        expiryDate: normalizeExpiryDate,
        bankProvider: ehProviderId,
      };
      await enrolCard(enrolledData);
    } else {
      throw new Error(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);
    }
  };

  const deleteOldAndEnrolNewCard = async (cardId: number) => {
    try {
      await deleteCardAsync({ deleteCard: { cardId } });
      await enrolSwagCard();
    } catch {
      throw new Error(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);
    }
  };

  const autoEnrolCard = async (shouldDeregisterOldCard = false) => {
    try {
      setIsLoading(true);
      const userToken = await getToken();
      if (!userToken?.token) {
        throw new Error(AutoEnrolStatus.NO_POKITPAL_TOKEN);
      }
      // if deregister old card, override user bank details
      // if not, only update user bank if it's empty
      // this run independently from enrolling card and need to be under getToken(), it doesn't throw any error, all handlers are inside
      // not moving it out to avoid a big refactor
      registerUserBankIfDoNotExist(shouldDeregisterOldCard);

      const { data } = await refetchCardLink();
      const cardList = data?.me?.cashback?.linkedCards.cards ?? [];

      const linkedSwagCard = cardList.find(e => e.provider === EMPLOYMENT_HERO_PROVIDER);
      if (haveHeroWallet && !linkedSwagCard) {
        // check hero wallet enrolment & user bank (bsb & account number)
        await enrolSwagCard();
      } else if (haveHeroWallet && linkedSwagCard?.id && shouldDeregisterOldCard) {
        // deregister old linked card, enrol new car
        await deleteOldAndEnrolNewCard(linkedSwagCard.id);
      } else if (!haveHeroWallet) {
        throw new Error(AutoEnrolStatus.NO_SWAG_CARD);
      } else if (linkedSwagCard?.id) {
        // enrolled, do nothing
        // eslint-disable-next-line no-useless-return
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    autoEnrolCard,
    isPreparingData,
  };
};
