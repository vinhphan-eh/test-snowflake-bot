import React, { useState } from 'react';
import { Alert as HDAlert, Typography, useTheme } from '@hero-design/rn';
import { useInAppBrowser } from '../../../../../../../common/shared-hooks/useInAppBrowser';
import { WalletSetupStatus } from '../../../../../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../../../../../providers/LocalisationProvider';

interface AlertProps {
  walletStatus?: WalletSetupStatus | null;
}

export const Alert = ({ walletStatus }: AlertProps) => {
  const [isOpen, setOpen] = useState(true);
  const { space } = useTheme();
  const { formatMessage } = useRegionLocalisation();
  const { openUrl } = useInAppBrowser();

  const goToHelpCenter = () => {
    const helpCentreUrl = formatMessage({ id: 'benefits.faq.url' });
    openUrl(helpCentreUrl);
  };

  if (!walletStatus || !isOpen) {
    return null;
  }

  if (walletStatus === WalletSetupStatus.InProgress) {
    return (
      <HDAlert
        style={{ marginHorizontal: space.medium, marginTop: space.medium }}
        testID="alert"
        intent="warning"
        content="We’re checking your details. Come back later to see the status of your Spend account application."
      />
    );
  }

  if (walletStatus === WalletSetupStatus.Failed) {
    return (
      <HDAlert
        testID="alert"
        onClose={() => {
          setOpen(false);
        }}
        style={{ marginHorizontal: space.medium, marginTop: space.medium }}
        intent="error"
        content={
          <Typography.Body variant="small">
            Sorry, you didn’t qualify for a Spend account. Try again later or{' '}
            <Typography.Body
              variant="small"
              intent="info"
              style={{ textDecorationLine: 'underline' }}
              onPress={goToHelpCenter}
            >
              Visit our Help Centre
            </Typography.Body>
          </Typography.Body>
        }
      />
    );
  }
  return null;
};
