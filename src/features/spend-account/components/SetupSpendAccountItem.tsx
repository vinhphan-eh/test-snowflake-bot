import React from 'react';
import { Box, Spinner } from '@hero-design/rn';
import { SetupSpendAccountCard } from './setup-spend-account-card';
import { BalanceCard } from '../../../common/components/balance-card';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import type { IdvProfile, UkAuthFactor } from '../../../new-graphql/generated';
import { WalletSetupStatus } from '../../../new-graphql/generated';
import { useContinueOnboardingCTA } from '../hooks/useContinueOnboardingCTA';

type SetupSpendAccountItemType = {
  idvProfileData: IdvProfile | null | undefined;
  isLoading: boolean;
  isCardFound: boolean;
  availableBalance: number | undefined;
  eWalletSetupStatus: WalletSetupStatus | null | undefined;
  currency?: SupportedCurrency;
  ukAuthFactors: (UkAuthFactor | null)[] | null | undefined;
};

export const SetupSpendAccountItem = ({
  availableBalance,
  currency = 'AUD',
  eWalletSetupStatus,
  idvProfileData,
  isCardFound,
  isLoading,
  ukAuthFactors,
}: SetupSpendAccountItemType) => {
  const { navigate: onContinue } = useContinueOnboardingCTA({
    eWalletSetupStatus,
    idvProfileData,
    ukAuthFactors,
  });

  if (isLoading) {
    return (
      <Box
        paddingHorizontal="xlarge"
        paddingVertical="large"
        backgroundColor="defaultGlobalSurface"
        borderBottomStartRadius="xxxlarge"
        borderBottomEndRadius="xxxlarge"
        style={{ minHeight: 132 }}
      >
        <Spinner accessibilityLabel="spinner" />
      </Box>
    );
  }

  const showBalance = availableBalance !== null && availableBalance !== undefined && isCardFound;
  if (showBalance) {
    return (
      <BalanceCard
        title="Account balance"
        balance={availableBalance}
        icon="money-notes"
        iconIntent="text"
        balanceTestId="account balance"
        marginBottom={undefined}
        currency={currency}
        enabledRemindBalance
      />
    );
  }

  const eWalletUncompleted = !eWalletSetupStatus || eWalletSetupStatus !== WalletSetupStatus.Completed;

  if (eWalletUncompleted || !isCardFound) {
    return (
      <Box padding="medium">
        <SetupSpendAccountCard eWalletSetupStatus={eWalletSetupStatus} onContinue={onContinue} />
      </Box>
    );
  }

  return null;
};
