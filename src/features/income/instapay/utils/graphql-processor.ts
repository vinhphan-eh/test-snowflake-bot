import type { InstapayError } from '../../../../new-graphql/generated';

/*
The omit is a workaround to avoid type narrowing issue
The issue is that the types generated in the query may not match the GQL generated types
e.g. in this query
export type GetInstapayTransactionsQuery = {
  __typename?: 'Query';
... transactions:
          | { __typename?: 'InstapayError'; code: InstapayErrorCode }
          | {
              __typename?: 'InstapayTransactions';
              transactions: ...
            };
      } | null;
    }>;
  } | null;
};
the InstapayError type does not exactly match the generated type
export type InstapayError = {
  __typename?: 'InstapayError';
  code: InstapayErrorCode;
  context?: Maybe<ErrorContext>;
};
So this type guard, while it works in that it returns a false value if `__typename` is not correct, does not
actually remove InstapayError from the `transaction` union.
    historyData?.me?.orgs.flatMap(orgData => {
      const result = orgData.instapay?.transactions;
      if (!result || isInstapayError(result)) {
        return [];
      }
      return result.transactions || []; <---- result still contains `{__typename: 'InstapayError'} | { ...`
    }) || [];
    
    
In fact we should not be using type guard for this code, instead we should switch on `__typename`
    historyData?.me?.orgs.flatMap(orgData => {
      // eslint-disable-next-line no-underscore-dangle
      switch (orgData?.instapay?.transactions?.__typename) {
        case 'InstapayError':
          return [];
        case 'InstapayTransactions':
          return orgData.instapay.transactions?.transactions || [];
        default:
          return [];
      }
    }) || [];
will refactor later
*/
export const isInstapayError = (error: unknown): error is Omit<InstapayError, 'context'> =>
  // eslint-disable-next-line no-underscore-dangle
  !!error && (error as { __typename?: string }).__typename === 'InstapayError';
