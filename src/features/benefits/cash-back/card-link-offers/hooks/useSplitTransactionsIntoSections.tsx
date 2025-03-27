import { useEffect, useState } from 'react';
import { formatRelativeDate } from '../../../../../common/utils/date';
import type { CashbackTransaction } from '../../../../../new-graphql/generated';

type TransactionIntoSections = { title: string; data: CashbackTransaction[] }[];
type TransactionIntoSectionsResponse = {
  sections: TransactionIntoSections;
};

export const useSplitTransactionsIntoSections = ({
  transactions,
}: {
  transactions: CashbackTransaction[] | undefined;
}): TransactionIntoSectionsResponse => {
  const [sections, setSections] = useState<TransactionIntoSections>([]);
  const splitTransactionIntoSections = (mTransactions: CashbackTransaction[]) => {
    const groupByDate = mTransactions.reduce((acc, item) => {
      if (!item) {
        return acc;
      }

      const date = new Date(item.created);
      const title = formatRelativeDate(date);
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(item);
      return acc;
    }, {} as Record<string, CashbackTransaction[]>);

    return Object.keys(groupByDate).map(date => {
      return { title: date, data: groupByDate[date] };
    });
  };

  useEffect(() => {
    if (!transactions) {
      return;
    }
    setSections(splitTransactionIntoSections(transactions));
  }, [transactions]);

  return { sections };
};
