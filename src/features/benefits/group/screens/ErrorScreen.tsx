import React from 'react';
import images from '../../../../common/assets/images';
import { GeneralError } from '../../../../common/components/error';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';

export const ErrorScreen = () => {
  const onNext = () => navigateToTopTabs('benefits-tab');

  return <GeneralError themeName="wallet" ctaText="Close" onCtaPress={onNext} image={images.iceCream} />;
};
