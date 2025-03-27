import { useIsAccountAU } from './useIsAccountAU';
import { useIsAccountUK } from './useIsAccountUK';
import { AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE, UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE } from '../constants/countries';

export const useGetCountryCode = () => {
  const isUKAccount = useIsAccountUK();
  const isAUAccount = useIsAccountAU();

  if (isUKAccount) {
    return UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE;
  }
  if (isAUAccount) {
    return AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE;
  }
  return 'UNKNOWN';
};
