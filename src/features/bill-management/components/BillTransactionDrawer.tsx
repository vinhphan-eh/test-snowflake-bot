import React from 'react';
import { Box, Divider, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BillTransactionItem } from './BillTransactionItem';
import Drawer, { DrawerSectionList } from '../../../common/components/drawer';
import { formatUTCToLocalDateString } from '../../../common/utils/date';
import type { BillTransaction, PaymentTransaction, Transaction } from '../../../new-graphql/generated';
import { PaymentMethod, PaymentType } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';

export type BillTransactionDrawerProps = {
  sections: Array<{ title: string; data: Array<Transaction> }>;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  isError?: boolean;
  snapPoints?: Array<string | number>;
  providerName?: string;
  onTouchMove?: () => void;
  onEndReached?: () => void;
};

export const BillTransactionDrawer = ({
  isError,
  isFetching,
  isFetchingNextPage,
  onEndReached,
  onTouchMove,
  providerName,
  sections,
  snapPoints = ['50%', '100%'],
}: BillTransactionDrawerProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { formatMessage } = useRegionLocalisation();
  const { space } = useTheme();

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
            <Typography.Title level="h5">Bill activity</Typography.Title>
          </Box>
          <Box paddingTop="smallMedium" marginHorizontal="small" justifyContent="center" alignItems="center">
            <Typography.Body
              variant="regular-bold"
              style={{ textAlign: 'center' }}
              accessibilityLabel="get transactions error"
            >
              {formatMessage({ id: 'benefits.bill.getTransactionError' })}
            </Typography.Body>
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
          renderSectionHeader={({ section: { title } }) => (
            <Box paddingVertical="small" paddingHorizontal="medium" backgroundColor="decorativePrimarySurface">
              <Typography.Caption>{title}</Typography.Caption>
            </Box>
          )}
          renderItem={({ item }) => {
            if (item.type === 'BILL') {
              const bill = item as BillTransaction;
              return (
                <BillTransactionItem
                  title="Bill received"
                  description={`Bill period: ${formatUTCToLocalDateString(
                    bill.dateFrom
                  )} - ${formatUTCToLocalDateString(bill.dateTo)}`}
                  amount={bill.amount.amount}
                  status={bill.status}
                  currency={bill.amount.currency}
                />
              );
            }
            const bill = item as PaymentTransaction;
            const title = `Payment via ${bill.paymentType === PaymentType.Mastercard ? 'Mastercard' : 'Visa'}`;
            const description = `Paid directly with ${
              bill.paymentMethod === PaymentMethod.DirectToProvider ? providerName : ''
            }`;
            return (
              <BillTransactionItem
                title={title}
                description={description}
                amount={bill.amount.amount}
                currency={bill.amount.currency}
              />
            );
          }}
          ListHeaderComponent={
            <Box paddingVertical="small" paddingHorizontal="medium">
              <Typography.Title level="h5">Bill activity</Typography.Title>
            </Box>
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <Spinner
                testID="bill_transaction_drawer_spinner"
                size="small"
                accessibilityLabel="spinner"
                style={{ flex: 1, marginBottom: space.medium }}
              />
            ) : null
          }
          ListEmptyComponent={() => (
            <Box paddingTop="smallMedium" marginHorizontal="small" justifyContent="center" alignItems="center">
              {isFetching ? (
                <Spinner
                  testID="bill_transaction_drawer_spinner"
                  size="small"
                  style={{ flex: 1, marginBottom: space.medium }}
                />
              ) : (
                <Typography.Body
                  variant="regular-bold"
                  style={{ textAlign: 'center' }}
                  accessibilityLabel="empty transaction list"
                >
                  {formatMessage({ id: 'benefits.bill.noBillActivity' })}
                </Typography.Body>
              )}
            </Box>
          )}
          ItemSeparatorComponent={() => <Divider />}
          onEndReachedThreshold={0.3}
          onTouchMove={onTouchMove}
          onEndReached={onEndReached}
        />
      )}
    </Drawer>
  );
};
