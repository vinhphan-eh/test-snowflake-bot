import { useEbfCountry } from './useEbfCountry';
import { useIsWorkzone } from './useIsWorkzone';
import { AUSTRALIA_COUNTRY_CODE, AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE, WORKZONE_AU_REGION } from '../constants/countries';
/**
 * Checks the account has an "AU" country code
 */
export const useIsAccountAU = () => {
  const isWorkzone = useIsWorkzone();
  const { ehCountryCode, workzoneCountryCode } = useEbfCountry();

  const isEhAuAccount = ehCountryCode === AUSTRALIA_COUNTRY_CODE || ehCountryCode === AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE;

  return isWorkzone ? workzoneCountryCode === WORKZONE_AU_REGION : isEhAuAccount;
};
