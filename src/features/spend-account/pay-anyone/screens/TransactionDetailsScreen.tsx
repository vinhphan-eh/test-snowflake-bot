import React from 'react';
import { Button, useTheme } from '@hero-design/rn';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DataCardItem } from '../../../../common/components/data-card';
import { DataCard } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { getCurrencyFromCurrencyType, getFloatAmountFromMoney } from '../../../../common/utils/currency';
import { formatUTCToLocalDateTimeString } from '../../../../common/utils/date';
import { formatToBSBValue, formatToSortCodeValue, createCurrencyFormatter } from '../../../../common/utils/numbers';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import {
  CurrencyType,
  type BsbTransferPeerDetails,
  type FasterPaymentsTransferPeerDetails,
} from '../../../../new-graphql/generated';
import { STASH_TRANSACTION_TYPE } from '../../hooks/useSplitTransactionsIntoSections';
import { mapTransactionDescription, mapTransactionDetail } from '../../utils/transaction';
import type { PayAnyoneScreenRouteProp } from '../navigation/navigationTypes';
import useBrandName from '../../../../common/hooks/useBrandName';

const EMPLOYMENT_HERO_TRANSFER_PEER = 'Employment Hero';

export const TransactionDetailsScreen = () => {
  const {
    params: { transaction },
  } = useRoute<PayAnyoneScreenRouteProp<'TransactionDetails'>>();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const amount = getFloatAmountFromMoney(transaction?.currencyAmount) ?? 0;
  const showNegative = amount < 0;
  const cardTransaction = !!transaction.cardId;
  const isStashTransaction = transaction.type === STASH_TRANSACTION_TYPE;
  const isHeroDollarTransaction =
    transaction.transferPeerDetails?.name === EMPLOYMENT_HERO_TRANSFER_PEER &&
    (transaction?.description === 'Transfer from Hero Dollars' ||
      transaction?.description === 'Transfer from Hero Points');
  const bottomCardDisplay = !(isStashTransaction || isHeroDollarTransaction);
  const formatCurrency = createCurrencyFormatter();

  const paymentDataCard: DataCardItem[] = [];
  const payeeDataCard: DataCardItem[] = [];

  const { space } = useTheme();
  const brandName = useBrandName();

  if (cardTransaction) {
    paymentDataCard.push(
      {
        label: 'You spent',
        content: `${formatCurrency(Math.abs(amount), {
          currency: getCurrencyFromCurrencyType(
            transaction?.currencyAmount?.type ?? CurrencyType.CurrencyTypeUnspecified
          ),
        })}`,
      },
      {
        label: 'When',
        content: formatUTCToLocalDateTimeString(transaction.dateTimeUTC),
      }
    );
    payeeDataCard.push({
      label: 'At this merchant',
      content: transaction.merchant?.name ?? '',
      bottomLabel: transaction.merchant?.singleLineAddress ?? '',
    });
  } else {
    paymentDataCard.push(
      {
        label: showNegative ? 'You sent' : 'You received',
        content: `${formatCurrency(Math.abs(amount), {
          currency: getCurrencyFromCurrencyType(
            transaction?.currencyAmount?.type ?? CurrencyType.CurrencyTypeUnspecified
          ),
        })}`,
      },
      {
        label: 'At this time',
        content: formatUTCToLocalDateTimeString(transaction.dateTimeUTC),
      },
      {
        label: 'Description',
        content: mapTransactionDescription(transaction.description ?? ''),
      }
    );

    if (bottomCardDisplay) {
      payeeDataCard.push({
        label: showNegative ? 'To this account' : 'From',
        content: mapTransactionDetail(transaction.transferPeerDetails?.name ?? '', brandName),
      });
    }
  }

  if (showNegative && transaction.transferPeerDetails) {
    const isBSBPeerTransfer = () => {
      return (transaction.transferPeerDetails as BsbTransferPeerDetails).bsb !== undefined;
    };

    const accountBranchValue = isBSBPeerTransfer()
      ? formatToBSBValue((transaction.transferPeerDetails as BsbTransferPeerDetails).bsb ?? '')
      : formatToSortCodeValue((transaction.transferPeerDetails as FasterPaymentsTransferPeerDetails).sortCode ?? '');

    payeeDataCard.push({
      content: `${accountBranchValue} ${transaction.transferPeerDetails.accountNumber}`,
    });
  }

  if (transaction.reference) {
    paymentDataCard.push({ label: 'Reference', content: transaction.reference });
  }

  const onDone = () => navigateToTopTabs('spend-tab');

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={onDone} hideRight title="Payment Details" />
      <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
        <Page.Body marginTop="large">
          <DataCard data={paymentDataCard} hideIcon disabled />
          {!!payeeDataCard.length && (
            <DataCard data={payeeDataCard} style={{ marginTop: space.medium }} hideIcon disabled />
          )}
        </Page.Body>
        <Page.Footer>
          <Button text="Done" accessibilityLabel="Done" onPress={onDone} />
        </Page.Footer>
      </Page>
    </>
  );
};
