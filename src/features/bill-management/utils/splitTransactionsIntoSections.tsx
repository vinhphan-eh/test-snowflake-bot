import { formatRelativeDate } from '../../../common/utils/date';
import type { Transaction } from '../../../new-graphql/generated';

interface TransactionsIntoSections {
  sections: { title: string; data: Array<Transaction> }[];
}

export const splitTransactionsIntoSections = ({
  transactions,
}: {
  transactions: Transaction[];
}): TransactionsIntoSections => {
  const groupByDate = transactions.reduce((acc, item) => {
    const date = new Date(item.transactionDate ?? '');
    const title = formatRelativeDate(date);
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(item);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const sections = Object.keys(groupByDate).map(date => {
    return { title: date, data: groupByDate[date] };
  });

  return { sections };
};
