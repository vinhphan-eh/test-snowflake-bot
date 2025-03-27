import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GeneralError } from '../../../common/components/error';
import type { OnboardingScreenNavigationProp, OnboardingScreenRouteProp } from '../navigation/navigationTypes';

export const GeneralErrorScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'GeneralError'>>();
  const route = useRoute<OnboardingScreenRouteProp<'GeneralError'>>();

  const onClose = () => {
    const callback = route.params?.closeCallback;
    if (callback) {
      callback();
      return;
    }

    navigation.goBack();
  };

  const { ctaText, secondaryCtaCallback, secondaryCtaText } = { ...route.params };

  return (
    <GeneralError
      themeName="wallet"
      ctaText={ctaText ?? 'Close'}
      onCtaPress={onClose}
      title="We're sorry, something's gone wrong"
      description="Please try again later"
      secondaryCtaText={secondaryCtaText ?? ''}
      onSecondaryCtaPress={secondaryCtaCallback}
    />
  );
};
