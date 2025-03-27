import { graphql, type GraphQLContext, type GraphQLRequest, type ResponseResolver } from 'msw';
import type { GetWalletTransactionsV2Query, GetWalletTransactionsV2QueryVariables } from '../../generated';

export const mockInfiniteGetWalletTransactionsV2Query = (
  resolver: ResponseResolver<
    GraphQLRequest<GetWalletTransactionsV2QueryVariables>,
    GraphQLContext<GetWalletTransactionsV2Query>,
    any
  >
) =>
  graphql.query<GetWalletTransactionsV2Query, GetWalletTransactionsV2QueryVariables>(
    'GetWalletTransactionsV2',
    resolver
  );
