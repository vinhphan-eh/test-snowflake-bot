import { useEbfCountry } from './useEbfCountry';
import { useIsWorkzone } from './useIsWorkzone';
import {
  UNITED_KINGDOM_COUNTRY_CODE,
  UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_UK_REGION,
} from '../constants/countries';

/**
 * Checks the account has an "UK" country code
 */
export const useIsAccountUK = () => {
  const isWorkzone = useIsWorkzone();
  const { ehCountryCode, workzoneCountryCode } = useEbfCountry();
  const isEhUkAccount =
    ehCountryCode === UNITED_KINGDOM_COUNTRY_CODE || ehCountryCode === UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE;

  return isWorkzone ? workzoneCountryCode === WORKZONE_UK_REGION : isEhUkAccount;
};

/**
 * Checks the account has an "UK" country code
 * with loading state returned for proper handling
 */
export const useIsAccountUKWithLoadingState = () => {
  const isWorkzone = useIsWorkzone();
  const { ehCountryCode, isFetched, isLoadingEhCountry, workzoneCountryCode } = useEbfCountry();
  const isEhUkAccount =
    ehCountryCode === UNITED_KINGDOM_COUNTRY_CODE || ehCountryCode === UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE;

  return {
    isLoading: isWorkzone ? false : isLoadingEhCountry,
    isUKaccount: isWorkzone ? workzoneCountryCode === WORKZONE_UK_REGION : isEhUkAccount,
    isFetched: isWorkzone ? true : isFetched,
  };
};
