import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { formatPoints } from '../../../common/utils/numbers';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import {
  HeroPointsClientType,
  HeroPointsReasonType,
  HeroPointsTransactionType,
  type HeroPointsTransactionItem,
} from '../../../new-graphql/generated';
import { useTracking } from '../hooks/useTracking';
import useStoreName from '../../../common/hooks/useStoreName';

const TRANSACTION_TIME_FORMAT = 'hh:mma';

const ITEM_NAME_MAPPING: Record<Lowercase<HeroPointsClientType>, string> = {
  employee_milestone: 'Employee Milestone',
  employment_hero: 'Employment Hero',
  hero_dollar_purchase: 'Hero Points Purchase',
  marketplace: 'Swag Store',
  nomination: 'Recognition',
  organisation_issuance: 'Organisation Issuance',
  sap: 'SAP',
  ebf_shaype: 'Reimbursed to Spend account',
};

const TRANSACTION_TYPE_MAPPING: Record<string, string> = {
  deduction: 'Deduction',
  deduction_reversion: 'Deduction Reversion',
  topup: 'Top-up',
  topup_reversion: 'Top-up Reversion',
  withdrawal: 'Withdrawal',
  withdrawal_reversion: 'Withdrawal Reversion',
};

export interface TransactionListItemProps {
  transaction: HeroPointsTransactionItem;
}

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  const { space } = useTheme();
  const storeName = useStoreName();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { clientType, points = 0, reasonType, transactionTimeUtc, transactionType } = transaction;

  const dateFormatted = dayjs(transactionTimeUtc).format(TRANSACTION_TIME_FORMAT);
  const amountFormatted = formatPoints(Math.abs(points));
  const showNegative = points < 0;

  const itemNameMapping = useMemo((): Record<Lowercase<HeroPointsClientType>, string> => {
    return {
      ...ITEM_NAME_MAPPING,
      [HeroPointsClientType.Marketplace.toLowerCase()]: `${storeName} Store`,
    };
  }, [storeName]);

  const { trackClickTransactionList } = useTracking();

  const onPress = () => {
    trackClickTransactionList();

    navigation.navigate('HeroPointsStack', {
      screen: 'heroPoints/transactionDetail',
      params: { transactionData: transaction },
    });
  };

  const renderItemName = (transactionData: HeroPointsTransactionItem): string => {
    if (transactionData.reasonType?.toLowerCase() === HeroPointsReasonType.TransactionFee.toLowerCase()) {
      return 'Transaction Fee';
    }

    const lowerCaseClientType = transactionData.clientType?.toLowerCase() as Lowercase<HeroPointsClientType>;

    if (lowerCaseClientType === HeroPointsClientType.EbfShaype.toLowerCase()) {
      return itemNameMapping[lowerCaseClientType];
    }

    return transactionData.reason ?? itemNameMapping[lowerCaseClientType];
  };

  const isEbfShaypeTransaction =
    clientType.toLowerCase() === HeroPointsClientType.EbfShaype.toLowerCase() &&
    reasonType?.toLowerCase() !== HeroPointsReasonType.TransactionFee.toLowerCase() &&
    transactionType.toLowerCase() === HeroPointsTransactionType.Withdrawal.toLowerCase();

  return (
    <Pressable
      accessibilityRole="menuitem"
      testID="hero-points-transaction-item"
      onPress={onPress}
      style={{
        paddingVertical: space.smallMedium,
        paddingHorizontal: space.medium,
      }}
    >
      <Box flexDirection="row" justifyContent="space-between" style={{ maxWidth: '100%' }}>
        <Typography.Body style={{ flex: 1 }} variant="regular" numberOfLines={1} ellipsizeMode="tail">
          {renderItemName(transaction)}
        </Typography.Body>
        <Typography.Body variant="regular" intent="body">
          <Typography.Body variant="regular" intent={showNegative ? 'danger' : 'success'}>
            {`${showNegative ? '-' : '+'}`}
          </Typography.Body>
          {amountFormatted}
        </Typography.Body>
      </Box>
      <Box flexDirection="row" alignItems="flex-end" justifyContent="space-between">
        <Typography.Body style={{ marginTop: space.xsmall }} variant="small" intent="subdued">
          {dateFormatted}
        </Typography.Body>
        {isEbfShaypeTransaction ? (
          <Box flexDirection="row" justifyContent="center" alignItems="center" marginTop="xsmall">
            <Icon
              testID="spend account icon"
              icon="money-notes"
              accessibilityLabel="spend account icon"
              intent="text"
              style={{ marginLeft: space.xxsmall }}
            />
          </Box>
        ) : (
          <Typography.Body style={{ marginTop: space.xsmall, textAlign: 'right' }} variant="small" intent="subdued">
            {TRANSACTION_TYPE_MAPPING[transactionType.toLowerCase()]}
          </Typography.Body>
        )}
      </Box>
    </Pressable>
  );
};

export { TransactionListItem };
