import { useEffect } from 'react';
import { useCashbackOnboardStatusQuery } from '../../../../../new-graphql/generated';

export const useLaunchCashbackIntroduction = (onNavigateToCashbackIntroduction: () => void) => {
  const { data, isError, isFetched } = useCashbackOnboardStatusQuery();
  const isOnboarded = data?.me?.cashback?.onboardStatus?.hasCLOOnboarded ?? false;

  useEffect(() => {
    if (!isOnboarded && isFetched && !isError) {
      // navigate to cashback introduction screen
      onNavigateToCashbackIntroduction();
    }
  }, [isError, isFetched, isOnboarded]);
};
