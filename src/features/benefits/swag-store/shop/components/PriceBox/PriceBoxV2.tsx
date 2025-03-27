import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../../../../common/components/currency-text/CurrencyText';
import type { SupportedCurrency } from '../../../../../../common/utils/numbers';
import { useIntl } from '../../../../../../providers/LocalisationProvider';
import { HeroPointsPrice } from '../../../components/HeroPointsPrice';

type PriceBoxProps = {
  priceInPoints: number | null; // | null prevents some product that may have missing price in points from showing during migration without setting it as optional
  discountPrice: number;
  currency?: SupportedCurrency;
  style?: StyleProp<ViewStyle>;
  // If multi variants, prefix "From" will be shown
  multiVariants?: boolean;
};

export const PriceBoxV2 = ({
  currency = 'AUD',
  discountPrice,
  multiVariants,
  priceInPoints,
  style = {},
}: PriceBoxProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();

  if (!priceInPoints) {
    return (
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <CurrencyText
          currency={currency}
          amount={discountPrice}
          renderCurrency={amount => <Typography.Title level="h4">{amount}</Typography.Title>}
          renderDecimal={amount => <Typography.Title level="h4">{amount}</Typography.Title>}
        />
      </Box>
    );
  }

  return (
    <Box style={style} flexDirection="column" justifyContent="flex-start">
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        {multiVariants && (
          <Typography.Body intent="subdued" style={{ marginRight: space.smallMedium }}>
            {formatMessage({ id: 'benefits.swagStore.fromPricePrefix' })}
          </Typography.Body>
        )}
        <HeroPointsPrice price={priceInPoints} fontSize="xxxlarge" iconSize="xsmall" />
        <Typography.Body style={{ marginHorizontal: space.small }} variant="small">
          {formatMessage({ id: 'benefits.swagStore.orPrice' })}
        </Typography.Body>
        <CurrencyText
          currency={currency}
          amount={discountPrice}
          renderCurrency={amount => <Typography.Title level="h4">{amount}</Typography.Title>}
          renderDecimal={amount => <Typography.Title level="h4">{amount}</Typography.Title>}
        />
      </Box>
    </Box>
  );
};
