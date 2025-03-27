import React from 'react';
import { Error } from '@hero-design/rn';
import { useRoute } from '@react-navigation/native';
import images from '../../../../common/assets/images';
import { GeneralError } from '../../../../common/components/error';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { InstaPayRouteProp } from '../navigation/navigationTypes';
import { InstaPayDrawdownErrorCode } from '../navigation/navigationTypes';

export const InstaPayDrawdownErrorScreen = () => {
  const { formatMessage } = useIntl();
  const route = useRoute<InstaPayRouteProp<'InstaPayDrawdownError'>>();
  const { errorCode } = route.params;

  const onClose = () => {
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });
  };

  const onTryAgain = () => {
    navigateToTopTabs('income-tab');
  };

  if (errorCode === InstaPayDrawdownErrorCode.GeneralError) {
    return (
      <GeneralError
        themeName="wallet"
        onCtaPress={onClose}
        ctaText={formatMessage({ id: 'common.close' })}
        testID="Income general error"
      />
    );
  }

  if (errorCode === InstaPayDrawdownErrorCode.UnderMaintenance) {
    return (
      <OutcomeTemplate
        testID="instapay-now-maintenance-layout"
        imageWidth={156}
        imageHeight={156}
        title={formatMessage({ id: 'instapay.now.under-maintenance.title' })}
        content={formatMessage({ id: 'instapay.now.under-maintenance.description' })}
        imageName="instapay-now-maintenance"
        actions={[
          {
            testId: 'instapay-now-maintenance-close-button',
            buttonTitle: formatMessage({ id: 'common.close' }),
            onNext: onClose,
          },
        ]}
      />
    );
  }

  return (
    <Error
      title={formatMessage({ id: 'instapay.errorScreen.ssaError.title' })}
      description={formatMessage({ id: 'instapay.errorScreen.ssaError.description' })}
      image={images.skateboard}
      ctaText={formatMessage({ id: 'instapay.errorScreen.tryAgain' })}
      onCtaPress={onTryAgain}
      onSecondaryCtaPress={onClose}
      secondaryCtaText={formatMessage({ id: 'instapay.errorScreen.close' })}
      variant="full-screen"
    />
  );
};
