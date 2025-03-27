import { formatRelativeDate } from '../../../common/utils/date';
import type { FinancialTransaction } from '../../../new-graphql/generated';

export const STASH_TRANSACTION_TYPE = 'STASH';

interface TransactionsIntoSections {
  sections: { title: string; data: FinancialTransaction[] }[];
}

export const useSplitTransactionsIntoSections = ({
  transactions,
}: {
  transactions: Exclude<(FinancialTransaction | null)[], null | undefined>;
}): TransactionsIntoSections => {
  const groupByDate = transactions.reduce((acc, item) => {
    if (!item) {
      return acc;
    }

    const newItem = { ...item };

    if (newItem.type === STASH_TRANSACTION_TYPE) {
      const stashName = `${newItem.transferPeerDetails?.name ?? 'Unknown'} Stash`;
      newItem.transferPeerDetails = { ...newItem.transferPeerDetails, name: stashName };
      newItem.description = `Transfer ${(newItem.currencyAmount.units ?? 0) < 0 ? 'to' : 'from'} ${stashName}`;
    }

    const date = new Date(newItem.dateTimeUTC ?? '');
    const title = formatRelativeDate(date);
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(newItem);
    return acc;
  }, {} as Record<string, FinancialTransaction[]>);

  const sections = Object.keys(groupByDate).map(date => {
    return { title: date, data: groupByDate[date] };
  });

  return { sections };
};
