import type { LoginProviderType } from '../auth/types/types';

type ObserverResult = {
  // adding more observer props whenever needed
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  isFetched?: boolean;
  isLoadingError?: boolean;
  isSuccess?: boolean;
};

// light version of UseQueryResult (react-query) but with general Observer type
// because UseQueryResult comes with too complicated Observer type, which we don't use for testing, like: ObserverSuccess | ObserverFailed | ObserverIdle
export type MockQueryResult<T> = { data: T } & ObserverResult;

export type MockInfiniteQueryResult<T> = {
  data: {
    pages: T[];
    pageParams: unknown[];
  };
} & ObserverResult;

export type MockMutation = { mutate?: () => void; mutateAsync?: () => void } & ObserverResult;

export const isEnabledForEh = (token: string, loginProvider: LoginProviderType) =>
  !!token && (loginProvider === 'eh' || loginProvider === 'omop');
