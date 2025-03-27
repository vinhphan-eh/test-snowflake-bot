import React from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { DigitalWalletScreenNavigationProp, DigitalWalletScreenRouteProp } from '../navigation/navigationTypes';

export const DigitalWalletOutcomeScreen = () => {
  const navigation = useNavigation<DigitalWalletScreenNavigationProp<'DigitalWalletOutcome'>>();
  const route = useRoute<DigitalWalletScreenRouteProp<'DigitalWalletOutcome'>>();

  const { isOnboarding, outcome } = route.params;
  const isSuccess = outcome === 'success';

  const walletProvider = Platform.OS === 'ios' ? 'Apple' : 'Google';

  const onNext = () => {
    if (isOnboarding) {
      navigation.navigate('CardSetupStack', { screen: 'CardSetupComplete' });
    } else {
      navigateToTopTabs('card-tab');
    }
  };

  return (
    <OutcomeTemplate
      title={isSuccess ? `Card added to ${walletProvider} Wallet.` : `We're sorry, something went wrong.`}
      content={
        isSuccess
          ? `You can now use your card to make mobile payments using ${walletProvider} Pay.`
          : `Your card hasn't been added to your Wallet. Please try again later.`
      }
      imageName={isSuccess ? 'flying-card' : 'ice-cream-income'}
      actions={[{ buttonTitle: isOnboarding ? 'Next' : 'Done', onNext }]}
    />
  );
};
