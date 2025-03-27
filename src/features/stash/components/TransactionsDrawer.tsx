import React from 'react';
import { Box, Spinner, Typography } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionListItem } from './TransactionListItem';
import { TransactionListSectionHeader } from './TransactionListSectionHeader';
import Drawer, { DrawerSectionList } from '../../../common/components/drawer';
import type { DrawerTransaction } from '../types';

export interface TransactionsDrawerProps {
  sections: { title: string; data: DrawerTransaction[] }[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  onEndReached: () => void;
  snapPoints?: Array<string | number>;
}

const calculateTotalAmount = (transactions: DrawerTransaction[]) => {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  return transactions.reduce((acc, item) => (acc += item.currencyAmount.amount), 0);
};

const TransactionsDrawer = ({
  isFetching,
  isFetchingNextPage,
  onEndReached,
  sections,
  snapPoints = ['50%', '100%'],
}: TransactionsDrawerProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <Drawer
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
      snapPoints={snapPoints}
    >
      <DrawerSectionList
        accessibilityLabel="Stash transactions"
        accessibilityRole="menu"
        contentContainerStyle={{ paddingBottom: bottomInset }}
        sections={sections}
        keyExtractor={item => item.id ?? ''}
        renderSectionHeader={({ section: { data, title } }) => (
          <TransactionListSectionHeader title={title} total={calculateTotalAmount(data)} />
        )}
        renderItem={({ item }) => <TransactionListItem transaction={item} />}
        ListHeaderComponent={
          <Box padding="medium">
            <Typography.Title level="h5">Transactions</Typography.Title>
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
          <Box marginHorizontal="smallMedium" backgroundColor="defaultSurface" style={{ height: 1 }} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
      />
    </Drawer>
  );
};

export { TransactionsDrawer };
