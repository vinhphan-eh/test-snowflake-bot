import type { BillStatus } from '../../new-graphql/generated';

export type BillingStatus = 'Paid' | 'Due' | 'Overdue';

export type TagIntent = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'archived';

export const getTagIntentByStatus = (status: BillStatus): TagIntent => {
  switch (status) {
    case 'Paid':
      return 'success';
    case 'Due':
      return 'warning';
    case 'Overdue':
      return 'danger';
    default:
      return 'success';
  }
};
