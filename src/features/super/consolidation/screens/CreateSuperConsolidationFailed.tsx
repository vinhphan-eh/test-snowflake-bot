import React from 'react';
import { useRoute } from '@react-navigation/native';
import { GeneralError } from '../../../../common/components/error';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { ConsolidationScreenRouteProp } from '../navigation/navigationTypes';

export const CreateSuperConsolidationFailedScreen = () => {
  const route = useRoute<ConsolidationScreenRouteProp<'CreateSuperConsolidationFailed'>>();
  const errorMessage = route?.params.errorMessage;

  const goToSuper = () => navigateToTopTabs('super-tab');

  return <GeneralError themeName="eBens" onCtaPress={goToSuper} ctaText="Close" title={errorMessage} />;
};
