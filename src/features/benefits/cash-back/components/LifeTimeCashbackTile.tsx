import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Icon, List, Skeleton, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import { useCashbackTransactionsV2Query } from '../../../../new-graphql/generated';
import { useCheckCompletelyOnboardCashback } from '../hooks/useCheckCompletelyOnboardCashback';

type LifeTimeCashbackTileProps = {
  style?: StyleProp<ViewStyle>;
  goToManageCashback: () => void;
};

export const LifeTimeCashbackTile = ({ goToManageCashback, style }: LifeTimeCashbackTileProps) => {
  const { isCompleted } = useCheckCompletelyOnboardCashback();
  const { data: transactionsRes, isLoading: isLoadingCashbackTransactions } = useCashbackTransactionsV2Query(
    {},
    { enabled: isCompleted }
  );
  const { lineHeights, space } = useTheme();

  if (!isCompleted) {
    return null;
  }

  return (
    <List.Item
      testID="lifetime-cashback"
      suffix={<Icon icon="arrow-right" intent="primary" size="xlarge" />}
      variant="card"
      onPress={goToManageCashback}
      style={style}
      title={
        <>
          {isLoadingCashbackTransactions ? (
            <Skeleton
              style={{ width: 150, height: lineHeights.xxxxlarge }}
              testID="skeleton-lifetime-cashback"
              variant="rectangular"
            />
          ) : (
            <CurrencyText
              amount={transactionsRes?.me?.cashback?.transactionsV2?.total || 0}
              renderCurrency={amount => <Typography.Title level="h3">{amount}</Typography.Title>}
            />
          )}

          <Box alignItems="center" flexDirection="row">
            <Icon
              style={{ marginRight: space.xsmall }}
              size="xsmall"
              icon="dollar-credit-card-outlined"
              intent="primary"
            />
            <Typography.Caption fontWeight="semi-bold">lifetime cashback</Typography.Caption>
          </Box>
        </>
      }
    />
  );
};
