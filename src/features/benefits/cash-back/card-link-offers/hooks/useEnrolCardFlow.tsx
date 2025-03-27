import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import { useGetPokitpalToken } from './useGetPokitpalToken';
import { queryClient } from '../../../../../common/libs/queryClient';
import { useToast } from '../../../../../common/shared-hooks/useToast';
import { getEnvConfig } from '../../../../../common/utils/env';
import type { CashbackCard, CashbackLinkedCardsQuery } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { AutoEnrolStatus } from '../constants/autoEnrol';

interface UseEnrolCardFlow {
  isLoading: boolean;
  enrolCard(enrolCardData: EnrolCardData): Promise<CashbackCard | null>;
}

export interface EnrolCardData {
  cardNumber: string;
  expiryDate: string;
  bankProvider: string;
}

const getMessage = (cardNumber: string, expiryDate: string): string => {
  const normalizedExpiryDate = expiryDate.replace('/', '');
  const normalizedCardNumber = cardNumber.replace(/\s/g, '');
  return `${normalizedCardNumber}${normalizedExpiryDate}`;
};

export const useEnrolCardFlow = (showToastOnError = false): UseEnrolCardFlow => {
  const { getToken } = useGetPokitpalToken();
  const [isLoading, setIsLoading] = useState(false);
  const Toast = useToast();
  const { formatMessage } = useIntl();

  const errorMsgMap = {
    '-1': formatMessage({ id: 'enrolCardError.invalidCardDetails' }),
    '-45': formatMessage({ id: 'enrolCardError.cardAlreadyLinkedRewards' }),
    '-50': formatMessage({ id: 'enrolCardError.cardAlreadyLinked' }),
    '-5': formatMessage({ id: 'enrolCardError.maxCardsLinked' }),
    '-2': formatMessage({ id: 'enrolCardError.incorrectCardDetails' }),
    '-3': formatMessage({ id: 'enrolCardError.incorrectExpiryDate' }),
    '-4': formatMessage({ id: 'enrolCardError.providerCommunicationIssue' }),
  };

  const enrolCard = async (enrolCardData: EnrolCardData): Promise<CashbackCard | null> => {
    try {
      const userToken = await getToken();
      if (!userToken) {
        throw new Error('User does not registered!');
      }

      const { key, token } = userToken;
      const message = getMessage(enrolCardData.cardNumber, enrolCardData.expiryDate);

      const encryptedKey = CryptoJS.enc.Utf8.parse(key);
      const iv = CryptoJS.enc.Utf8.parse(String.fromCharCode());
      const encryptedData = CryptoJS.AES.encrypt(message, encryptedKey, { iv });

      setIsLoading(true);

      const { data } = await axios.post(
        `${getEnvConfig().SWAG_PERSONAL_POKITPAL_URL}/v1/DebitCards/Enrol`,
        JSON.stringify({
          data: encryptedData.toString(),
          bankCode: enrolCardData.bankProvider,
          isDefault: false,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newEnrolledCard: CashbackCard = data.card;
      newEnrolledCard.lastFour = newEnrolledCard.cardMasked.substring(15);

      queryClient.setQueryData(
        ['CashbackLinkedCards'],
        (old: CashbackLinkedCardsQuery | undefined): CashbackLinkedCardsQuery => {
          if (!old) {
            return {
              me: {
                cashback: {
                  linkedCards: {
                    cards: [newEnrolledCard],
                  },
                },
              },
            };
          }
          // CashbackLinkedCardsQuery object is nested, so we use deep clone it to
          // make sure new object is created and react-query can detect the change
          const newData: CashbackLinkedCardsQuery = JSON.parse(JSON.stringify(old));
          const oldCardList = old?.me?.cashback?.linkedCards.cards || [];
          if (newData.me?.cashback?.linkedCards?.cards) {
            newData.me.cashback.linkedCards.cards = [...oldCardList, newEnrolledCard];
          }
          return newData;
        }
      );

      return newEnrolledCard as CashbackCard;
    } catch (error: unknown) {
      let errMsg = '';
      if (error instanceof AxiosError) {
        const errorCode = error.response?.data?.code as keyof typeof errorMsgMap;
        errMsg = errorMsgMap[errorCode] || 'Something went wrong';
      } else if (error instanceof Error) {
        errMsg = error.message || 'Something went wrong';
      }

      if (showToastOnError && errMsg) {
        Toast.show({
          content: errMsg,
        });
      }

      // TODO: check here
      throw new Error(AutoEnrolStatus.CAN_NOT_ENROL_SWAG_CARD);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    enrolCard,
  };
};
