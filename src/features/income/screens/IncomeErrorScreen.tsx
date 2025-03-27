import React from 'react';
import { GeneralError } from '../../../common/components/error';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';

export const IncomeErrorScreen = () => {
  const onNext = () => navigateToTopTabs('income-tab');

  return <GeneralError themeName="wallet" onCtaPress={onNext} ctaText="Close" testID="Income error" />;
};
