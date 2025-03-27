import React from 'react';
import { Pressable, TouchableOpacity, Image } from 'react-native';
import { Box, Icon, Tag, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import { BillStatus, SubscriptionStatus, SubscriptionType } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { getTagIntentByStatus } from '../types';

export type BillCardProps = {
  title: string;
  savedAmount: number;
  currency: SupportedCurrency;
  amount?: number;
  status?: BillStatus;
  dueDate?: string;
  subscriptionStatus?: SubscriptionStatus;
  onPress?: () => void;
  onRenew?: () => void;
  testID?: string;
  signUpLink?: string;
  logoUrl?: string;
  subscriptionType?: SubscriptionType;
  description?: string;
};

export const BillCard = ({
  amount,
  currency,
  description,
  dueDate,
  logoUrl,
  onPress = () => {},
  onRenew,
  savedAmount,
  signUpLink,
  status,
  subscriptionStatus,
  subscriptionType,
  testID,
  title,
}: BillCardProps) => {
  const { colors, radii, space } = useTheme();
  const { formatMessage } = useIntl();

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel="bill-management-card"
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginTop: space.xsmall,
        backgroundColor: colors.defaultGlobalSurface,
        marginBottom: space.medium,
        borderRadius: radii.medium,
      }}
    >
      <Image
        source={{ uri: logoUrl }}
        resizeMode="contain"
        testID="bill-management-card-logo"
        style={{
          width: 96,
          height: '100%',
          borderRadius: radii.base,
          borderWidth: space.xxsmall,
          borderColor: colors.secondaryOutline,
        }}
      />
      <Box paddingVertical="medium" marginLeft="smallMedium" flex={1} paddingRight="medium">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="large">
          <Typography.Body numberOfLines={1} variant="small-bold" style={{ flex: 1 }}>
            {title}
          </Typography.Body>
          {subscriptionStatus !== SubscriptionStatus.Cancelled && amount ? (
            <CurrencyText
              testID="amount"
              amount={amount}
              currency={currency}
              renderCurrency={currencyAmount => <Typography.Body variant="regular">{currencyAmount}</Typography.Body>}
              renderDecimal={currencyAmount => <Typography.Body variant="small">{currencyAmount}</Typography.Body>}
            />
          ) : null}
          {subscriptionStatus === SubscriptionStatus.Cancelled && signUpLink ? (
            <Pressable
              onPress={onRenew}
              style={({ pressed }) => ({
                backgroundColor: pressed ? colors.highlightedSurface : 'white',
                flexDirection: 'row',
                alignItems: 'center',
              })}
            >
              <Typography.Body variant="regular-bold" intent="primary" style={{ marginRight: space.small }}>
                {formatMessage({ id: 'benefits.bill.renew' })}
              </Typography.Body>
              <Icon icon="arrow-rightwards" intent="primary" />
            </Pressable>
          ) : null}
        </Box>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          {subscriptionType === SubscriptionType.HealthInsurance ? (
            <Box flexDirection="row" alignItems="baseline">
              <Typography.Caption>{description}</Typography.Caption>
            </Box>
          ) : (
            <Box flexDirection="row" alignItems="baseline">
              <Typography.Caption>Saved: </Typography.Caption>
              <CurrencyText
                testID="saved-amount"
                amount={savedAmount}
                currency={currency}
                renderCurrency={currencyAmount => <Typography.Body variant="small">{currencyAmount}</Typography.Body>}
                renderDecimal={currencyAmount => <Typography.Body variant="small">{currencyAmount}</Typography.Body>}
              />
            </Box>
          )}
          {status && status !== BillStatus.Unknown ? (
            <Tag
              testID="bill-card-status"
              intent={getTagIntentByStatus(status)}
              content={status === BillStatus.Due ? `Due ${dueDate}` : (status as string)}
            />
          ) : null}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
