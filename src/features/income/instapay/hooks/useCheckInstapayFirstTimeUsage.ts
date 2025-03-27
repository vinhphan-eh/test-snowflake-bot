import type { InstapayUsage } from '../../../../new-graphql/generated';
import { useGetInstapayUsageQuery } from '../../../../new-graphql/generated';

export const useCheckInstapayFirstTimeUsage = () => {
  const { data, isError, isLoading } = useGetInstapayUsageQuery({}, { cacheTime: 0 });
  const isFirstTime = isError || !data ? false : (data?.me?.instapay?.usage as InstapayUsage).isFirstTime;

  return {
    isLoading,
    isFirstTime,
  };
};
