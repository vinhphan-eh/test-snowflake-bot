import React from 'react';
import { GeneralError } from '../../../../common/components/error';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useIntl } from '../../../../providers/LocalisationProvider';

export const InstaPayTrustedBeneficiaryErrorScreen = () => {
  const { formatMessage } = useIntl();

  const onClose = () =>
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });

  return (
    <GeneralError
      themeName="wallet"
      title={formatMessage({ id: 'instapay.trustedBeneficiary.error.title' })}
      description={formatMessage({ id: 'instapay.trustedBeneficiary.error.description' })}
      onCtaPress={onClose}
      ctaText={formatMessage({ id: 'common.close' })}
    />
  );
};
