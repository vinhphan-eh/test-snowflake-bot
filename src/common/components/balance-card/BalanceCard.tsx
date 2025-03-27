import React from 'react';
import type { IconName } from '@hero-design/rn';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';
import { useGetHeroPointsBalanceQuery, useGetHeroPointsPaymentPreferencesQuery } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useSpendHPOnSwagCardVisiblity } from '../../hooks/useHeroPointsVisibility';
import type { SupportedCurrency } from '../../utils/numbers';
import { CurrencyText } from '../currency-text/CurrencyText';

type BalanceCardProps = {
  balance: number;
  balanceTestId?: string;
  icon?: IconName;
  iconIntent?: IconButtonProps['intent'];
  iconTestId?: string;
  title: string;
  titleTestId?: string;
  currency?: SupportedCurrency;
  currencySymbol?: string;
  enabledRemindBalance?: boolean;
} & BoxProps;

export const BalanceCard = ({
  balance,
  balanceTestId = 'balance test id',
  currency = 'AUD',
  currencySymbol,
  enabledRemindBalance,
  icon,
  iconIntent = 'secondary',
  iconTestId = 'icon test id',
  title,
  titleTestId = 'title test id',
  ...boxProps
}: BalanceCardProps) => {
  const { lineHeights } = useTheme();
  const { formatMessage } = useIntl();

  const { data: paymentPreferences } = useGetHeroPointsPaymentPreferencesQuery();
  const payWithHPOnSwagCard = paymentPreferences?.me?.heroPoints?.paymentPreferences?.payWithHPOnSwagCard;

  const spendHDOnSwagCardPermission = useSpendHPOnSwagCardVisiblity();
  const { data: transactionsRes } = useGetHeroPointsBalanceQuery({}, { enabled: spendHDOnSwagCardPermission });
  const heroPointBalance = transactionsRes?.me?.heroPoints?.balance || 0;

  const remindMessage = heroPointBalance > balance ? formatMessage({ id: 'heroPoints.topup.remindBalanceCard' }) : '';

  const checkTopupCondition =
    enabledRemindBalance && payWithHPOnSwagCard && spendHDOnSwagCardPermission && remindMessage && balance < 10;

  return (
    <Box
      backgroundColor="defaultGlobalSurface"
      borderBottomStartRadius="xxxlarge"
      borderBottomEndRadius="xxxlarge"
      paddingVertical="large"
      style={{
        minHeight: 132,
      }}
      {...boxProps}
    >
      <Box paddingHorizontal="xlarge">
        <CurrencyText
          amount={balance}
          renderCurrency={amount => (
            <Typography.Title level="h1" testID={balanceTestId} style={{ fontWeight: '600' }}>
              {amount}
            </Typography.Title>
          )}
          renderDecimal={amount => (
            <Typography.Title
              level={currency === 'POINTS' ? 'h5' : 'h2'}
              style={{ lineHeight: lineHeights['7xlarge'] }}
            >
              {amount}
            </Typography.Title>
          )}
          testID={balanceTestId}
          currency={currency}
        />

        <Box flexDirection="row" alignItems="flex-end" justifyContent="space-between" marginTop="small">
          <Typography.Body variant="regular" typeface="playful" testID={titleTestId}>
            {title}
          </Typography.Body>
          {icon && <Icon testID={iconTestId} icon={icon} accessibilityLabel="hero dollars icon" intent={iconIntent} />}
        </Box>
      </Box>

      {checkTopupCondition && (
        <Box paddingLeft="xlarge" marginTop="small">
          <Typography.Caption testID="remind message" intent="warning">
            {remindMessage}
          </Typography.Caption>
        </Box>
      )}
    </Box>
  );
};
