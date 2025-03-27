import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useCashbackTransactionsV2Query } from '../../../../new-graphql/generated';
import { PillComp } from '../components/PillComp';
import { useCheckCompletelyOnboardCashback } from '../hooks/useCheckCompletelyOnboardCashback';

type LifeTimeCashbackPillProps = {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
};

export const LifeTimeCashbackPill = ({ accessibilityLabel, onPress, style, testID }: LifeTimeCashbackPillProps) => {
  const { isCompleted } = useCheckCompletelyOnboardCashback();
  const {
    data: transactionsRes,
    isError,
    isLoading: isLoadingCashbackTransactions,
  } = useCashbackTransactionsV2Query({}, { enabled: isCompleted });

  const formatCurrency = createCurrencyFormatter();

  if (!isCompleted || isLoadingCashbackTransactions || isError) {
    return null;
  }

  return (
    <PillComp
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      style={style}
      icon="dollar-credit-card-outlined"
      label={formatCurrency(transactionsRes?.me?.cashback?.transactionsV2?.total || 0)}
    />
  );
};
