import React from 'react';
import { Box, Divider, Spinner, Typography } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TransactionListItem } from './TransactionListItem';
import { TransactionListSectionHeader } from './TransactionListSectionHeader';
import Drawer, { DrawerSectionList } from '../../../../../../../common/components/drawer';
import type { CashbackTransaction } from '../../../../../../../new-graphql/generated';

export interface TransactionsDrawerProps {
  sections: { title: string; data: CashbackTransaction[] }[];
  isFetching?: boolean;
  isError?: boolean;
  snapPoints?: Array<string | number>;
  onTouchMove?: () => void;
}

const TransactionsDrawer = ({
  isError,
  isFetching,
  onTouchMove,
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
      {isError ? (
        <Box style={{ flex: 1 }}>
          <Box paddingVertical="small" paddingHorizontal="medium">
            <Typography.Title level="h6">Cashback history</Typography.Title>
          </Box>
          <Box paddingTop="smallMedium" marginHorizontal="small" justifyContent="center" alignItems="center">
            <Typography.Title level="h6" style={{ textAlign: 'center' }} accessibilityLabel="get transactions error">
              Unable to retrieve your transactions.{'\n'}Please come back later.
            </Typography.Title>
          </Box>
        </Box>
      ) : (
        <DrawerSectionList
          accessibilityLabel="Transactions List"
          accessibilityRole="menu"
          sections={sections}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: bottomInset }}
          keyExtractor={item => item.id.toString()}
          renderSectionHeader={({ section: { title } }) => <TransactionListSectionHeader title={title} />}
          renderItem={({ item }) => <TransactionListItem transaction={item} />}
          ListHeaderComponent={
            <Box paddingVertical="small" paddingHorizontal="medium">
              <Typography.Title level="h6">Cashback history</Typography.Title>
            </Box>
          }
          ListEmptyComponent={() => (
            <Box paddingTop="medium" alignItems="center">
              {isFetching ? (
                <Spinner size="small" />
              ) : (
                <Typography.Body variant="small">No transactions to display</Typography.Body>
              )}
            </Box>
          )}
          ItemSeparatorComponent={() => <Divider />}
          onEndReachedThreshold={0.3}
          onTouchMove={onTouchMove}
        />
      )}
    </Drawer>
  );
};

export { TransactionsDrawer };
