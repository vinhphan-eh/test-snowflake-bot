import React from 'react';
import { GeneralError } from '../../../../common/components/error';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';

export const InstaPaySchedulingErrorScreen = () => {
  const onClose = () =>
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });

  return <GeneralError themeName="wallet" onCtaPress={onClose} ctaText="Close" />;
};
