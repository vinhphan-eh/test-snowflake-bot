import React, { useState } from 'react';
import { Alert, Button, Typography, useTheme } from '@hero-design/rn';
import { HeroWalletReminderCard } from './HeroWalletReminderCard';
import { WalletSetupStatus } from '../../../../../new-graphql/generated';

type HeroWalletStatusType = {
  cashbackBalance?: number;
  heroWalletStatus?: string | null | undefined;
  navigateToHeroWalletOnboarding: () => void;
  navigateToHelpCenter: () => void;
  onManualHeroWalletEnrolment?: () => void;
};

export const HeroWalletStatusCard = ({
  cashbackBalance,
  heroWalletStatus,
  navigateToHelpCenter,
  navigateToHeroWalletOnboarding,
  onManualHeroWalletEnrolment,
}: HeroWalletStatusType) => {
  const { space } = useTheme();
  const [showAlert, setShowAlert] = useState(true);

  const closeAlert = () => setShowAlert(false);

  if (heroWalletStatus === WalletSetupStatus.InProgress) {
    if (showAlert) {
      return (
        <Alert
          intent="warning"
          content="We’re checking your details. Come back later to see the status of your Spend account application."
          onClose={closeAlert}
        />
      );
    }

    return (
      <HeroWalletReminderCard
        label="Application in progress..."
        header="Thanks for applying!"
        onPress={navigateToHeroWalletOnboarding}
        cashbackBalance={cashbackBalance}
      />
    );
  }

  if (heroWalletStatus === WalletSetupStatus.Failed) {
    if (showAlert) {
      const alertContent = (
        <>
          <Typography.Body variant="small">
            Sorry, you didn’t qualify for a Spend account. Try again later or{' '}
          </Typography.Body>
          <Button
            onPress={navigateToHelpCenter}
            text={
              <Typography.Body
                variant="small"
                intent="info"
                style={{ textDecorationLine: 'underline', textAlign: 'left' }}
              >
                Visit our Help Centre
              </Typography.Body>
            }
            variant="inline-text"
            style={{ justifyContent: 'flex-start', marginVertical: space.large }}
          />
        </>
      );
      return <Alert intent="error" content={alertContent} onClose={closeAlert} />;
    }
    return <HeroWalletReminderCard onPress={navigateToHeroWalletOnboarding} cashbackBalance={cashbackBalance} />;
  }

  if (heroWalletStatus === WalletSetupStatus.Completed && onManualHeroWalletEnrolment) {
    return (
      <HeroWalletReminderCard
        header="Enrol Swag Visa Debit card"
        onPress={onManualHeroWalletEnrolment}
        cashbackBalance={cashbackBalance}
      />
    );
  }

  return <HeroWalletReminderCard onPress={navigateToHeroWalletOnboarding} cashbackBalance={cashbackBalance} />;
};
