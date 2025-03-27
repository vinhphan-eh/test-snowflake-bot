import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { useIsAccountUK } from '../../../../common/hooks/useIsAccountUK';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { CardSetupScreenNavigationProp, CardSetupScreenRouteProp } from '../navigation/navigationTypes';

export const ErrorScreen = () => {
  const navigation = useNavigation<CardSetupScreenNavigationProp<'Error'>>();
  const route = useRoute<CardSetupScreenRouteProp<'Error'>>();
  const { pin, resetCardPin: resetCardPinParam } = route.params;
  const resetCardPin = !!resetCardPinParam;
  const isUK = useIsAccountUK();

  let title = "We're sorry, something's gone wrong.";
  let content = 'Please try again.';
  let buttonTitle = 'Try again';

  if (resetCardPin) {
    title = "We're sorry, something went wrong.";
    content = 'Please try again later.';
    buttonTitle = 'Close';
  }

  const goBack = () => {
    if (resetCardPin) {
      navigateToTopTabs('card-tab');
    } else if (isUK) {
      // FIX: navigate to proper screen in next state
      navigation.navigate('UkBillingAddress');
    } else {
      navigation.navigate('Confirmation', { pin: pin ?? '' });
    }
  };

  return (
    <OutcomeTemplate
      title={title}
      content={content}
      imageName="ice-cream-account"
      actions={[
        {
          buttonTitle,
          onNext: goBack,
        },
      ]}
    />
  );
};
