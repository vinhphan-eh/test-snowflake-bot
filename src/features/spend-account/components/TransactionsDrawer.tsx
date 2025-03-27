import React from 'react';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionListItem } from './TransactionListItem';
import { TransactionListSectionHeader } from './TransactionListSectionHeader';
import Drawer, { DrawerSectionList } from '../../../common/components/drawer';
import { getCurrencyFromCurrencyType, getFloatAmountFromMoney } from '../../../common/utils/currency';
import { CurrencyType, type FinancialTransaction } from '../../../new-graphql/generated';

export interface TransactionsDrawerProps {
  sections: { title: string; data: FinancialTransaction[] }[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
  snapPoints?: Array<string | number>;
  onChange?: (index: number) => void;
}

const calculateTotalAmount = (transactions: FinancialTransaction[]) => {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  return transactions.reduce((acc, item) => (acc += getFloatAmountFromMoney(item.currencyAmount) ?? 0), 0);
};

const getCurrencyOfTransactions = (transactions: FinancialTransaction[]) => {
  return getCurrencyFromCurrencyType(transactions?.[0]?.currencyAmount?.type ?? CurrencyType.CurrencyTypeUnspecified);
};

const TransactionsDrawer = ({
  isFetching,
  isFetchingNextPage,
  onChange = () => {},
  onEndReached,
  sections,
  snapPoints = ['50%', '100%'],
}: TransactionsDrawerProps) => {
  const { colors } = useTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  return (
    <Drawer
      backgroundStyle={{ backgroundColor: colors.defaultGlobalSurface }}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
      }}
      onChange={onChange}
      snapPoints={snapPoints}
    >
      <DrawerSectionList
        accessibilityLabel="Account transactions"
        accessibilityRole="menu"
        contentContainerStyle={{ paddingBottom: bottomInset }}
        sections={sections}
        keyExtractor={item => item.id ?? ''}
        renderSectionHeader={({ section: { data, title } }) => (
          <TransactionListSectionHeader
            title={title}
            total={calculateTotalAmount(data)}
            currency={getCurrencyOfTransactions(data)}
          />
        )}
        renderItem={({ item }) => <TransactionListItem transaction={item} />}
        ListHeaderComponent={
          <Box padding="medium">
            <Typography.Title level="h5">Account transactions</Typography.Title>
          </Box>
        }
        ListFooterComponent={
          isFetchingNextPage ? <Spinner size="small" accessibilityLabel="spinner" style={{ flex: 1 }} /> : null
        }
        ListEmptyComponent={() => (
          <Box justifyContent="center" alignItems="center" paddingTop="medium">
            {isFetching ? (
              <Spinner size="medium" accessibilityLabel="spinner" />
            ) : (
              <Typography.Body variant="regular">No transactions to display</Typography.Body>
            )}
          </Box>
        )}
        ItemSeparatorComponent={() => (
          <Box marginHorizontal="smallMedium" backgroundColor="defaultGlobalSurface" style={{ height: 1 }} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
      />
    </Drawer>
  );
};

export { TransactionsDrawer };
