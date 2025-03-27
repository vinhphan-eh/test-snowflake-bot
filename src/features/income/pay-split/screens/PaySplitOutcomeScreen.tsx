import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useGetCurrentCardDetailsQuery } from '../../../../new-graphql/generated';
import type { PaySplitScreenNavigationProp } from '../navigation/navigationTypes';

const PaySplitOutcomeScreen = () => {
  const navigation = useNavigation<PaySplitScreenNavigationProp<'PaySplitOutcome'>>();
  const { data: currentCardDetails, isLoading: isCurrentCardDetailsLoading } = useGetCurrentCardDetailsQuery();

  const disableNextButton = isCurrentCardDetailsLoading;
  const isCardSetupDone = !!currentCardDetails?.me?.wallet?.card?.details?.id;

  const onSetupFinished = () => {
    if (isCardSetupDone) {
      navigateToTopTabs('income-tab');
    } else {
      navigation.navigate('CardSetupStack', {
        screen: 'PinSetupStack',
        params: {
          screen: 'ChoosePin',
          params: {
            header: 'Card set-up',
            title: 'Choose a secure 4 digit PIN for your card.',
            repeatedPinScreen: {
              header: 'Card set-up',
              title: 'Repeat your PIN.',
              onPinVerifiedSuccess: newPin => {
                navigation.navigate('CardSetupStack', {
                  screen: 'Confirmation',
                  params: { pin: newPin, isInOnboardingFlow: true },
                });
              },
            },
          },
        },
      });
    }
  };

  const content = isCardSetupDone ? '' : "Now it's time to set up your card.";
  const nextButtonTitle = isCardSetupDone ? 'Done' : 'Next';

  return (
    <OutcomeTemplate
      actions={[
        {
          buttonTitle: nextButtonTitle,
          onNext: onSetupFinished,
          isLoading: isCurrentCardDetailsLoading,
          isDisabled: disableNextButton,
          testId: 'pay-split-success-next-btn',
        },
      ]}
      title="Nice! Your Pay Split has been set up."
      content={content}
      imageName="jetpack-man-money"
      imageAccessibilityLabel="Rocket Money"
    />
  );
};

export { PaySplitOutcomeScreen };
