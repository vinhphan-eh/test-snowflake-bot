import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useCashbackTransactionsV2Query } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BalanceCard } from '../../common/components/BalanceCard';
import { BalanceCardSkeleton } from '../../common/components/skeletons/BalanceCardSkeleton';
import { useBenefitsTracking } from '../../common/hooks/useBenefitsTracking';
import { useCheckCompletelyOnboardCashback } from '../hooks/useCheckCompletelyOnboardCashback';

type LifeTimeCashbackBalanceProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
};

export const LifeTimeCashbackBalanceCard = ({
  accessibilityLabel,
  onPress,
  style,
  testID,
}: LifeTimeCashbackBalanceProps) => {
  const Intl = useIntl();
  const { trackClickOnLifeTimeCashback } = useBenefitsTracking();
  const { isCompleted, isLoading: isCheckingOnboardStatus } = useCheckCompletelyOnboardCashback();
  const {
    data: transactionsRes,
    isError,
    isLoading: isLoadingCashbackTransactions,
  } = useCashbackTransactionsV2Query({}, { enabled: isCompleted });

  const formatCurrency = createCurrencyFormatter();
  const balance = transactionsRes?.me?.cashback?.transactionsV2?.total || 0;

  if (isLoadingCashbackTransactions || isCheckingOnboardStatus) {
    return <BalanceCardSkeleton testID={testID} />;
  }

  if (!isCompleted || isError) {
    return null;
  }
  return (
    <BalanceCard
      style={style}
      onPress={() => {
        trackClickOnLifeTimeCashback();
        onPress();
      }}
      accessibilityLabel={accessibilityLabel}
      balanceText={`${Intl.formatMessage({ id: 'benefits.cashback.lifetimeCashbackPrefix' })} ${formatCurrency(
        balance
      )}`}
      testID={testID}
    />
  );
};
