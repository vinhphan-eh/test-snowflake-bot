import type { ReactNode } from 'react';
import React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { Typography } from '@hero-design/rn';
import type { TitleProps } from '@hero-design/rn/types/components/Typography/Title';
import type { SupportedCurrency } from '../../utils/numbers';
import { createCurrencyFormatter } from '../../utils/numbers';

type CustomTitleProps = {
  typeface: TitleProps['typeface'];
  intent: TitleProps['intent'];
  style: StyleProp<TextStyle>;
  amount: string;
};

const DefaultCurrency = ({ amount, intent, style, typeface }: CustomTitleProps) => {
  return (
    <Typography.Title level="h2" intent={intent} style={style} typeface={typeface}>
      {amount}
    </Typography.Title>
  );
};

const DefaultDecimal = ({ amount, intent, style, typeface }: CustomTitleProps) => {
  return (
    <Typography.Title level="h4" intent={intent} style={style} typeface={typeface}>
      {amount}
    </Typography.Title>
  );
};

export interface CurrencyTextProps {
  amount: number;
  disabled?: boolean;
  typeface?: TitleProps['typeface'];
  testID?: string;
  styleProps?: StyleProp<TextStyle>;
  decimalStyle?: StyleProp<TextStyle>;
  currency?: SupportedCurrency;
  isShowDecimal?: boolean;
  renderCurrency?: (value: string) => ReactNode;
  renderDecimal?: (value: string) => ReactNode;
}

export const CurrencyText = ({
  amount,
  currency = 'AUD',
  decimalStyle,
  disabled,
  isShowDecimal = true,
  renderCurrency,
  renderDecimal,
  styleProps,
  testID,
  typeface = 'neutral',
}: CurrencyTextProps) => {
  const formatCurrency = createCurrencyFormatter();
  const [dollarAmount, pennyAmount] = formatCurrency(amount, { currency }).split('.');
  const [currencyValue, currencySuffix] = dollarAmount.split(/\s/);
  const intent = disabled ? 'archived' : undefined;
  const decimalAmount = currency !== 'POINTS' ? `.${pennyAmount}` : currencySuffix;

  const renderDecimalPart = () => {
    if (renderDecimal) {
      return renderDecimal(decimalAmount);
    }
    return <DefaultDecimal amount={decimalAmount} intent={intent} style={decimalStyle} typeface={typeface} />;
  };
  return (
    <Text testID={testID} allowFontScaling={false}>
      {renderCurrency?.(currencyValue) ?? (
        <DefaultCurrency amount={currencyValue} intent={intent} style={styleProps} typeface={typeface} />
      )}
      {isShowDecimal ? renderDecimalPart() : null}
    </Text>
  );
};
