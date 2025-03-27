import type { CardData, CardError } from '@ehrocks/react-native-meawallet-mcd';
import { getCardData, getCardId, getSecret, initialize } from '@ehrocks/react-native-meawallet-mcd';
import { getEnvConfig } from '../../../../../common/utils/env';
import { useGetOemProvisioningQuery } from '../../../../../new-graphql/generated';
import { AutoEnrolStatus } from '../constants/autoEnrol';

export const generateFakeCard = (): CardData => {
  const fakeDay = (Math.floor(Math.random() * (31 - 1 + 1)) + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const fakeMonth = (Math.floor(Math.random() * (12 - 1 + 1)) + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return {
    pan: '4368929491964365',
    expiry: `2026-${fakeMonth}-${fakeDay}`,
    cvv: '123',
  };
};

export const useMeaWalletMcd = () => {
  const { data, isLoading } = useGetOemProvisioningQuery();

  const getUserCardData = async () => {
    const oemData = data?.me?.wallet?.card?.oemProvisioning;
    if (!oemData) {
      throw new Error(AutoEnrolStatus.NO_OEM_DATA);
    }

    if (getEnvConfig().ENV === 'production') {
      try {
        await initialize();
        const info = {
          cardId: getCardId(oemData?.cardToken, oemData.expiryDate, oemData.cardHolderName),
          cardSecret: getSecret(oemData.otp),
        };
        const cardData = await getCardData(info.cardId, info.cardSecret);
        return cardData;
      } catch (err) {
        const { message } = err as CardError;
        throw new Error(`${AutoEnrolStatus.MCD_ERROR}: ${message}`);
      }
    }
    // temporarily use fake card, because MCD is only testable on prod
    return generateFakeCard();
  };

  return { getUserCardData, isLoading };
};
