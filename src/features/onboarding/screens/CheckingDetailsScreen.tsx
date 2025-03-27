import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { useInitiateEWalletSetupMutation } from '../../../new-graphql/generated';
import type { OnboardingScreenNavigationProp, OnboardingScreenRouteProp } from '../navigation/navigationTypes';

export const CheckingDetailsScreen = () => {
  const route = useRoute<OnboardingScreenRouteProp<'CheckingDetails'>>();
  const navigation = useNavigation<OnboardingScreenNavigationProp<'CheckingDetails'>>();
  const initiateEWalletSetup = useInitiateEWalletSetupMutation();
  const statusIsInprogress = route.params?.statusIsInprogress;

  const onClose = () => {
    navigation.navigate('PersonalDetails');
  };

  const submitApplication = async () => {
    try {
      const data = await initiateEWalletSetup.mutateAsync({});

      if (data.initiateAUWallet.success) {
        // NOTE: Wait for 5 seconds as F1 need some times to get correct status.
        setTimeout(() => {
          navigation.navigate('Waiting');
        }, 5000);
      }
    } catch {
      navigation.navigate('GeneralError', { closeCallback: onClose });
    }
  };

  useEffect(() => {
    // NOTE: Keyboard may stay open after Onfido verification.
    Keyboard.dismiss();

    let timeoutId: NodeJS.Timeout | undefined;
    if (!statusIsInprogress) {
      submitApplication();
    } else {
      timeoutId = setTimeout(() => {
        navigation.navigate('Waiting');
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <OutcomeTemplate imageName="waiting" title="Checking your details" content="Please wait a moment..." />;
};
