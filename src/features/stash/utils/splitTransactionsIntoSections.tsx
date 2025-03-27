import { getFloatAmountFromMoneyV2 } from '../../../common/utils/currency';
import { formatRelativeDate } from '../../../common/utils/date';
import type { StashTransaction } from '../../../new-graphql/generated';
import type { DrawerTransaction } from '../types';

export const convertStashTransactionToDrawerListItemFormat = (transaction: StashTransaction): DrawerTransaction => {
  return {
    id: transaction.id ?? '',
    currencyAmount: { amount: transaction.amount ? getFloatAmountFromMoneyV2(transaction.amount) : 0 },
    transferPeerDetails: { name: 'Swag Spend' },
    dateTimeUTC: transaction.transactionTimeUtc ?? '',
  };
};

export const splitStashTransactionsToSections = (transactions: (StashTransaction | null)[]) => {
  const groupByDate = transactions.reduce((acc, item) => {
    if (!item) {
      return acc;
    }

    const date = new Date(item.transactionTimeUtc ?? '');
    const title = formatRelativeDate(date);
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(item);
    return acc;
  }, {} as Record<string, StashTransaction[]>);

  const convertToCompatibleTransactionDrawerFormats = (data: StashTransaction[]) => {
    return data.map(convertStashTransactionToDrawerListItemFormat);
  };

  const sections = Object.keys(groupByDate).map(date => {
    return { title: date, data: convertToCompatibleTransactionDrawerFormats(groupByDate[date]) };
  });

  return sections;
};
