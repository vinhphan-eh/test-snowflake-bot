import React from 'react';
import images from '../../../../common/assets/images';
import { GeneralError } from '../../../../common/components/error';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useIntl } from '../../../../providers/LocalisationProvider';

export const DailyLimitErrorScreen = () => {
  const { formatMessage } = useIntl();

  const onNext = () => navigateToTopTabs('spend-tab');

  return (
    <GeneralError
      themeName="wallet"
      title={formatMessage({ id: 'spend-account.pay-anyone.error.dailyLimit.title' })}
      description={formatMessage({ id: 'spend-account.pay-anyone.error.dailyLimit.description' })}
      onCtaPress={onNext}
      ctaText={formatMessage({ id: 'common.close' })}
      image={images.skateboard}
    />
  );
};
