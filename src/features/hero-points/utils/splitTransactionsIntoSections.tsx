import { formatRelativeDate } from '../../../common/utils/date';
import type { HeroPointsTransactionItem } from '../../../new-graphql/generated';

interface TransactionsIntoSections {
  sections: { title: string; data: HeroPointsTransactionItem[] }[];
}

export const splitTransactionsIntoSections = ({
  transactions,
}: {
  transactions: Exclude<HeroPointsTransactionItem[], null | undefined>;
}): TransactionsIntoSections => {
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
  }, {} as Record<string, HeroPointsTransactionItem[]>);

  const sections = Object.keys(groupByDate).map(date => {
    return { title: date, data: groupByDate[date] };
  });

  return { sections };
};
