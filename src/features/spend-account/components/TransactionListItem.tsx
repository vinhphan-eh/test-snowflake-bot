import React from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { getCurrencyFromCurrencyType, getFloatAmountFromMoney } from '../../../common/utils/currency';
import { createCurrencyFormatter } from '../../../common/utils/numbers';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { CurrencyType, type FinancialTransaction } from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider/hooks/useIntl';
import { mapTransactionTitle } from '../utils/transaction';

export const TRANSACTION_TIME_FORMAT = 'hh:mma';

export interface TransactionListItemProps {
  transaction: FinancialTransaction;
}

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  const Intl = useIntl();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { space } = useTheme();
  const { currencyAmount, dateTimeUTC, description, merchant, transferPeerDetails } = transaction;

  const dateFormatted = dayjs(dateTimeUTC).format(TRANSACTION_TIME_FORMAT);
  const formatCurrency = createCurrencyFormatter();
  const transferAmount = getFloatAmountFromMoney(currencyAmount);

  const amountFormatted = formatCurrency(Math.abs(transferAmount ?? 0), {
    currency: getCurrencyFromCurrencyType(currencyAmount.type ?? CurrencyType.CurrencyTypeUnspecified),
  });
  const showNegative = (transferAmount ?? 0) < 0;
  const showTransferFromHeroPoints =
    transferPeerDetails?.name === 'Employment Hero' &&
    (description?.includes('Transfer from Hero Dollars') || description?.includes('Transfer from Hero Points'));

  const transactionTitle = () => {
    if (showTransferFromHeroPoints) {
      return Intl.formatMessage({ id: 'heroPoints' });
    }

    if (description?.startsWith('DP')) {
      return Intl.formatMessage({ id: 'spend-account.transaction-list.instapay-daily.title' });
    }

    return mapTransactionTitle(merchant?.name || transferPeerDetails?.name || '');
  };

  const onPress = () => {
    navigation.navigate('PayAnyoneStack', { screen: 'TransactionDetails', params: { transaction } });
  };

  return (
    <Pressable
      accessibilityRole="menuitem"
      testID={`transaction-list-item-${transaction.id}`}
      onPress={onPress}
      style={{ flexDirection: 'row', paddingVertical: space.smallMedium, paddingHorizontal: space.medium }}
    >
      <Box flex={1} marginRight="medium">
        <Typography.Body variant="regular" numberOfLines={1} ellipsizeMode="tail">
          {transactionTitle()}
        </Typography.Body>
        <Typography.Caption style={{ marginTop: space.xsmall }} intent="subdued">
          {dateFormatted}
        </Typography.Caption>
      </Box>
      <Box justifyContent="center" alignItems="flex-end">
        <Typography.Body variant="regular" intent="body">
          <Typography.Body variant="regular" intent={showNegative ? 'danger' : 'success'}>
            {`${showNegative ? '-' : '+'}`}
          </Typography.Body>
          {amountFormatted}
        </Typography.Body>
        {showTransferFromHeroPoints && (
          <Box flexDirection="row" justifyContent="center" alignItems="center" marginTop="xsmall">
            <ThemeSwitcher name="eBens">
              <Icon
                testID="hero dollar icon"
                icon="star-circle-outlined"
                accessibilityLabel="hero dollar icon"
                intent="secondary"
                style={{ marginLeft: space.xxsmall }}
                size="xsmall"
              />
            </ThemeSwitcher>
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

export { TransactionListItem };
