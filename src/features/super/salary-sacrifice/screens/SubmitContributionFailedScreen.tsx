import React from 'react';
import { useRoute } from '@react-navigation/native';
import { GeneralError } from '../../../../common/components/error';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { SalarySacrificeScreenRouteProp } from '../navigation/navigationTypes';

export const SubmitContributionFailedScreen = () => {
  const route = useRoute<SalarySacrificeScreenRouteProp<'SubmitContributionFailed'>>();
  const errorMessage = route?.params.errorMessage;

  const goToSuper = () => navigateToTopTabs('super-tab');

  return <GeneralError themeName="eBens" onCtaPress={goToSuper} ctaText="Close" title={errorMessage} />;
};
