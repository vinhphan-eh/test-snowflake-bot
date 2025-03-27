import { useEbfCountry } from './useEbfCountry';
import { useIsWorkzone } from './useIsWorkzone';
import {
  NEW_ZEALAND_COUNTRY_CODE,
  NEW_ZEALAND_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_NZ_REGION,
} from '../constants/countries';

/**
 * Checks the account has an "NZ" country code
 * with loading state returned for proper handling
 */
export const useIsAccountNZ = () => {
  const isWorkzone = useIsWorkzone();
  const { ehCountryCode, isFetched, isLoadingEhCountry, workzoneCountryCode } = useEbfCountry();
  const isEhNzAccount =
    ehCountryCode === NEW_ZEALAND_COUNTRY_CODE || ehCountryCode === NEW_ZEALAND_ISO_ALPHA2_COUNTRY_CODE;

  return {
    isLoading: isWorkzone ? false : isLoadingEhCountry,
    isNZaccount: isWorkzone ? workzoneCountryCode === WORKZONE_NZ_REGION : isEhNzAccount,
    isFetched: isWorkzone ? true : isFetched,
  };
};
