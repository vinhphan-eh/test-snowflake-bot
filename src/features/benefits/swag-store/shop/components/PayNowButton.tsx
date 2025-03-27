import React from 'react';
import { Box, Button, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getEnvConfig } from '../../../../../common/utils/env';
import { createCurrencyFormatter, type SupportedCurrency } from '../../../../../common/utils/numbers';
import { useIntl } from '../../../../../providers/LocalisationProvider';

type Props = {
  onPressed: () => void;
  isLoading: boolean;
  productCurrency: SupportedCurrency;
  orderAmount: number;
  amountToPayViaCardAfterFee: number;
  pointsToPay: number;
  disabled: boolean;
  // Height of the view containing the button
  onButtonAreaHeightChange?: (height: number) => void;
};

const usePayButtonText = ({
  amountToPayViaCardAfterFee,
  currency,
  orderAmount,
  pointsToPay,
}: {
  orderAmount: number;
  amountToPayViaCardAfterFee: number;
  pointsToPay: number;
  currency: SupportedCurrency;
}) => {
  const { formatMessage } = useIntl();
  const formatCurrency = createCurrencyFormatter();
  const pointsText = formatCurrency(pointsToPay, { currency: 'POINTS' });
  const amountText = formatCurrency(amountToPayViaCardAfterFee, { currency });

  if (orderAmount === 0) {
    return formatMessage({ id: 'benefits.swagStore.payment.payNow' });
  }

  if (amountToPayViaCardAfterFee === 0) {
    return formatMessage({ id: 'benefits.swagStore.payment.payWithPoints' }, { points: pointsText });
  }

  if (pointsToPay === 0) {
    return formatMessage({ id: 'benefits.swagStore.payment.payWithCard' }, { amount: amountText });
  }

  if (pointsToPay > 0 && amountToPayViaCardAfterFee > 0) {
    return formatMessage(
      { id: 'benefits.swagStore.payment.payWithPointsAndCard' },
      {
        amount: amountText,
        points: pointsText,
      }
    );
  }

  return formatMessage({ id: 'benefits.swagStore.payment.payNow' });
};

// Pay now button on product details screen
export const PayNowButton = ({
  amountToPayViaCardAfterFee,
  disabled,
  isLoading,
  onButtonAreaHeightChange,
  onPressed,
  orderAmount,
  pointsToPay,
  productCurrency,
}: Props) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { space } = useTheme();
  const payButtonText = usePayButtonText({
    orderAmount,
    amountToPayViaCardAfterFee,
    pointsToPay,
    currency: productCurrency,
  });

  // on iOS, bottomInset > 0, use this value to set paddingBottom
  // on Android, bottomInset = 0, use space.medium to set paddingBottom
  const paddingBottom = bottomInset || space.medium;

  return (
    <Box
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom }}
      paddingHorizontal="medium"
      onLayout={e => {
        onButtonAreaHeightChange?.(e.nativeEvent.layout.height);
      }}
    >
      <Button
        intent="primary"
        testID="buy-button"
        text={payButtonText}
        disabled={disabled}
        onPress={onPressed}
        // loading prevent clicking Complete Authentication button in stripe payment
        loading={getEnvConfig().IS_E2E === 'true' ? false : isLoading}
      />
    </Box>
  );
};
