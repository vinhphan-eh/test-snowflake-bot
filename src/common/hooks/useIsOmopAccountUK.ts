import { useEbfCountry } from './useEbfCountry';
import { ukCountryCodes } from './useIsCountrySupported';

export const useIsOmopAccountUK = () => {
  const { ehCountryCode, isFetched, isLoadingEhCountry } = useEbfCountry();

  return {
    isOmopAccountUK: !!ehCountryCode && ukCountryCodes.includes(ehCountryCode),
    isFetched,
    isLoading: isLoadingEhCountry,
  };
};
