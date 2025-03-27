import React from 'react';
import { Box, useTheme, Spinner } from '@hero-design/rn';
import { BalanceCard } from '../../../../../../../common/components/balance-card';

interface LifeTimeCashbackProps {
  amount: number;
  isLoading?: boolean;
}
export const LifeTimeCashback = ({ amount, isLoading }: LifeTimeCashbackProps) => {
  const { space } = useTheme();

  return (
    <>
      <BalanceCard title="lifetime cashback" balance={amount} icon="dollar-credit-card-outlined" />
      {isLoading && (
        <Box
          paddingVertical="large"
          paddingHorizontal="xlarge"
          style={{
            borderBottomRightRadius: space.xlarge,
            borderBottomLeftRadius: space.xlarge,
          }}
          backgroundColor="defaultGlobalSurface"
        >
          <Box
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomRightRadius: space.xlarge,
              borderBottomLeftRadius: space.xlarge,
            }}
          >
            <Spinner testID="spinner" size="small" />
          </Box>
        </Box>
      )}
    </>
  );
};
