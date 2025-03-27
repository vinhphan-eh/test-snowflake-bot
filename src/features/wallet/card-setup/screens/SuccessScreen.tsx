import React from 'react';
import { MppCardDataParameters } from '@meawallet/react-native-mpp';
import { useNavigation, useRoute } from '@react-navigation/native';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useGetOemProvisioningQuery } from '../../../../new-graphql/generated';
import { useDigitalWalletStore } from '../../../card-management/digital-wallet/stores/useDigitalWalletStore';
import { useShowCardInformationalAlertStore } from '../../../spend-account/stores/useShowCardInformationalAlertStore';
import type { CardSetupScreenNavigationProp, CardSetupScreenRouteProp } from '../navigation/navigationTypes';

export const SuccessScreen = () => {
  const navigation = useNavigation<CardSetupScreenNavigationProp<'Success'>>();
  const route = useRoute<CardSetupScreenRouteProp<'Success'>>();
  const setShowCardInformationalAlert = useShowCardInformationalAlertStore(
    state => state.setShowCardInformationalAlert
  );
  const userID = useSessionStore(state => state.currentUser?.userID) ?? '';

  const resetCardPin = !!route.params?.resetCardPin;
  let title = 'Your card is on the way!';
  let content = `It should arrive in 7-10 business days. Now let's add your card to your digital wallet.`;
  let buttonTitle = 'Next';

  const { getDigitalWalletStatus } = useDigitalWalletStore(state => state);

  useGetOemProvisioningQuery(undefined, {
    onSuccess: data => {
      const oemData = data.me?.wallet?.card?.oemProvisioning;
      if (oemData) {
        const base64HolderName = Base64.stringify(Utf8.parse(oemData.cardHolderName));
        const cardParamaters = MppCardDataParameters.withCardSecret(
          `${oemData.cardToken}#${oemData.expiryDate}#${base64HolderName}`,
          `001#${oemData.otp}`
        );
        getDigitalWalletStatus(cardParamaters);
      }
    },
  });

  if (resetCardPin) {
    title = 'Nice one!';
    content = 'Your Visa debit card PIN has been updated.';
    buttonTitle = 'Done';
  }

  const onNext = () => {
    if (resetCardPin) {
      return navigateToTopTabs('card-tab');
    }

    setShowCardInformationalAlert(userID, true);

    return navigation.navigate('DigitalWalletStack', {
      screen: 'DigitalWalletSetup',
      params: { isOnboarding: true },
    });
  };

  return (
    <OutcomeTemplate
      title={title}
      content={content}
      actions={[
        {
          buttonTitle,
          onNext,
          testId: 'card-success-next-btn',
        },
      ]}
      imageName="flying-card"
      imageWidth={165}
      imageHeight={156}
    />
  );
};
