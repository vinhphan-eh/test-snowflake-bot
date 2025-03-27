import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { List, useTheme, Typography, Spinner } from '@hero-design/rn';
import { AttributeRow } from './AttributeRow';
import type { SupportedCurrency } from '../../../../../common/utils/numbers';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { HeroPointsPrice } from '../../components/HeroPointsPrice';

type PaymentMethodProps = {
  isLoading: boolean;
  payByHeroPoints: number;
  payByCard: number;
  cardFeeAmount: number;
  isFulFill: boolean;
  disabled?: boolean;
  creditCardLabel: string;
  onPress: () => void;
  cardFee: number;
  currency: SupportedCurrency;
};

export const PaymentMethod = ({
  cardFee,
  cardFeeAmount,
  creditCardLabel,
  currency,
  disabled = false,
  isFulFill,
  isLoading,
  onPress,
  payByCard,
  payByHeroPoints,
}: PaymentMethodProps) => {
  const { space } = useTheme();
  const Intl = useIntl();
  const formatCurrency = createCurrencyFormatter();

  if (isLoading) {
    return <Spinner accessibilityLabel="spinner" style={{ height: 80 }} size="small" />;
  }

  const itemStyle: StyleProp<ViewStyle> = { padding: 0, marginTop: space.medium, backgroundColor: 'transparent' };
  const renderChild = () => {
    return (
      <>
        {payByHeroPoints > 0 && (
          <AttributeRow
            style={itemStyle}
            label="Hero points"
            content={<HeroPointsPrice price={payByHeroPoints} fontSize="large" />}
          />
        )}
        {payByCard > 0 && (
          <>
            <AttributeRow style={itemStyle} label={creditCardLabel} content={formatCurrency(payByCard, { currency })} />
            <AttributeRow
              style={itemStyle}
              label={Intl.formatMessage(
                { id: 'benefits.swagStore.payment.cardFee' },
                {
                  fee: cardFee,
                }
              )}
              content={formatCurrency(cardFeeAmount, { currency })}
            />
          </>
        )}
        {!isFulFill && (
          <Typography.Body variant="small-bold" style={{ marginTop: space.medium }} intent="primary">
            Add payment method
          </Typography.Body>
        )}
      </>
    );
  };

  return (
    <List.Item
      testID="payment_method"
      disabled={disabled}
      style={{ marginTop: space.medium, shadowOpacity: 0 }}
      variant="card"
      onPress={onPress}
      selected={!isFulFill}
      suffix="edit-template-outlined"
      title={<Typography.Body variant="small-bold">Payment details</Typography.Body>}
    >
      {renderChild()}
    </List.Item>
  );
};
