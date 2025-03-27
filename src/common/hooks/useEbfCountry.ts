import { useEffect } from 'react';
import { useIsWorkzone } from './useIsWorkzone';
import { useMixpanel } from './useMixpanel';
import { useGetEhProfileQuery } from '../../new-graphql/generated';
import { useEbenTokenValidForQuery } from '../auth/store/ebenTokenStore';
import { useGetSuperAppToken } from '../auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../stores/useSessionStore';
import { isEnabledForEh } from '../types/react-query';

const ON_LATEST_RESIDENTIAL_COUNTRY_CODE = 'On latest residential country code';

export const useInitEhCountryCode = () => {
  const isEbenTokenValid = useEbenTokenValidForQuery();
  const { loginProvider, token } = useGetSuperAppToken('useInitEhCountryCode');
  const isWorkZone = useIsWorkzone();

  const {
    data: profile,
    isError,
    isFetched,
    isLoading,
  } = useGetEhProfileQuery(undefined, {
    // why depend on ehToken: when logging out, this called again (core navigation issue), but no token will fail and retryOnMount will effect - error cached, won't allow retry when re-login to other account, so !!ehToken is to avoid this being called
    // this should stop calling once get error to avoid infinite loop in core
    // and this 99% doesn't need refetch in background, so set staleTime to avoid it
    // when it needs to update, there are invalidateQueries calls to make it work
    enabled: isEbenTokenValid && isEnabledForEh(token, loginProvider),
    retryOnMount: false,
    staleTime: Infinity,
  });
  const profileCountryCode = profile?.me?.hrDetails?.countryCode;
  const ehFetched = isFetched && (isError ? true : profileCountryCode !== undefined);

  return {
    ehCountryCode: profileCountryCode,
    isLoading,
    // After switching account: there is a short time that react-query return wrong isFetched
    // it returns isFetching = true, isFetched = true ==> which theoretically isFetched should be false when isFetching = true => could be react-query bug on v3.
    // But eventually it returns correct data => but this short period of wrong data makes our loading fails
    // so need to depend on API response !== undefined to check if it's really fetched
    // isFetched is true for workzone because workzone doesn't fetch this
    isFetched: isWorkZone ? true : ehFetched,
    isError,
  };
};

let savedCountryCode = '';

export const useEbfCountry = () => {
  const { ehCountryCode, isFetched, isLoading } = useInitEhCountryCode();
  const workzoneCountryCode = useSessionStore(state => state.workzoneCountryCode);

  // Sync country code to Mixpanel
  const { eventTracking } = useMixpanel();
  const isWorkzone = useIsWorkzone();
  const countryCode = isWorkzone ? workzoneCountryCode : ehCountryCode;
  useEffect(() => {
    (async () => {
      /**
       * - Track country code every time user enters the app -
       * The bug that it aggressively fire the events:
       * It stored the country code in local storage to prevent tracking the same country code multiple times
       * Because this hook has multiple instances, it logged multiple times when the storage returns null
       * A file scope variable is enough to solve it, and local storage approach isn't fast enough to deal with concurrency
       */
      if (!countryCode || savedCountryCode) {
        return;
      }

      savedCountryCode = countryCode;

      eventTracking({
        event: ON_LATEST_RESIDENTIAL_COUNTRY_CODE,
        categoryName: 'user action',
        metaData: {
          module: 'Others',
          residentialCountryCode: countryCode,
        },
      });
    })();
  }, [countryCode]);

  return {
    ehCountryCode,
    isLoadingEhCountry: isLoading,
    workzoneCountryCode,
    isFetched,
  };
};
