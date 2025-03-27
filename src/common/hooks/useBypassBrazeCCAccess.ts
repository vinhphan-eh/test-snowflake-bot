import { useEbfCountry } from './useEbfCountry';
import { usePermissionStore } from '../stores/usePermissionStore';

const nzCountryCodes = ['NZL', 'NZ'];
const seaCountryCodes = [
  // Singapore
  'SGP',
  'SG',
  // Malaysia
  'MYS',
  'MY',
];

type Result = {
  shouldShowBrazeCC: boolean;
};

export const useBypassBrazeCCAccess = (): Result => {
  const { ehCountryCode } = useEbfCountry();
  const supportSeaRegion = usePermissionStore(state => state.permissions?.ebenBrazeAtSwagDBForSea?.view);
  const supportNZ = usePermissionStore(state => state.permissions?.ebenBrazeAtSwagDBForNz?.view);

  if (!ehCountryCode) {
    return { shouldShowBrazeCC: false };
  }

  const supportedCountries = [...(supportNZ ? nzCountryCodes : []), ...(supportSeaRegion ? seaCountryCodes : [])];
  const shouldShowBrazeCC = supportedCountries.includes(ehCountryCode);

  return {
    shouldShowBrazeCC,
  };
};
