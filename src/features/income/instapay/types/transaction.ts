import type { GetInstapayUserTransactionsQuery } from '../../../../new-graphql/generated';

export type TransactionItem = { orgName: string } & Extract<
  NonNullable<NonNullable<GetInstapayUserTransactionsQuery['me']>['instapay']>['transactions'],
  { __typename?: 'InstapayTransactions' }
>['transactions'][0];
