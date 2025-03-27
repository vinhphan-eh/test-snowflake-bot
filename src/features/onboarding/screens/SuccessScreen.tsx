import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { useShowPaySplit } from '../../../common/hooks/useShowPaySplit';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import { PaySplitIntroEntryPoint } from '../../income/pay-split/navigation/navigationTypes';
import { useCheckExistingCard } from '../../spend-account/hooks/useCheckExistingCard';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

export const SuccessScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'Success'>>();
  const showPaySplit = useShowPaySplit();
  const { isCardLoading, isCardNotFound } = useCheckExistingCard();

  const isLoading = isCardLoading;
  const disableNextButton = isCardLoading;
  const isUK = useIsAccountUK();

  const onNext = () => {
    if (showPaySplit) {
      navigation.navigate('PaySplitStack', {
        screen: 'PaySplitIntro',
        params: {
          entryPoint: PaySplitIntroEntryPoint.OnboardingSuccessNextBtn,
        },
      });
    } else if (!isCardNotFound) {
      navigateToTopTabs('income-tab');
    } else if (isUK) {
      navigation.navigate('CardSetupStack', {
        screen: 'UkBillingAddress',
      });
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

  return (
    <OutcomeTemplate
      testID="successful-wallet-next-btn"
      title="Great, your account is set up."
      // FIXME: content should change if showPaySplit == false
      content="Now it's time to add some money to your Swag Spend account."
      actions={[
        {
          testId: 'success-screen-next',
          buttonTitle: 'Next',
          onNext,
          isDisabled: disableNextButton,
          isLoading,
        },
      ]}
      imageName="jetpack-man-money"
    />
  );
};
