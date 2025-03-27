import { useEbfCountry } from './useEbfCountry';
import { useIsWorkzone } from './useIsWorkzone';
import {
  AUSTRALIA_COUNTRY_CODE,
  AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE,
  UNITED_KINGDOM_COUNTRY_CODE,
  UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_UK_REGION,
  WORKZONE_AU_REGION,
  NEW_ZEALAND_COUNTRY_CODE,
  NEW_ZEALAND_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_NZ_REGION,
} from '../constants/countries';
import { usePermissionStore } from '../stores/usePermissionStore';

/**
 *
 * this hook is to get correct loading value of supported country, super app needs it
 * for internal usage, we read country from zustand store, doesn't care abt loading, and avoid redundant fetch
 */

const supportedCountries = [
  // AU
  AUSTRALIA_COUNTRY_CODE,
  AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_AU_REGION,
];

// TODO: When the feature flag is removed, merge supportedCountries & ukCountryCodes
export const ukCountryCodes = [
  // UK
  UNITED_KINGDOM_COUNTRY_CODE,
  UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_UK_REGION,
];

export const nzCountryCodes = [
  // NZ
  NEW_ZEALAND_COUNTRY_CODE,
  NEW_ZEALAND_ISO_ALPHA2_COUNTRY_CODE,
  WORKZONE_NZ_REGION,
];

type CountrySupportedOutput = {
  isCountrySupported: boolean;
  isLoading: boolean;
  isFetched: boolean;
};

export const useIsCountrySupported = (): CountrySupportedOutput => {
  const { ehCountryCode, isFetched, isLoadingEhCountry, workzoneCountryCode } = useEbfCountry();
  const isWhitelistedUK = usePermissionStore(state => state.permissions?.eBenWhitelistedUkMoney?.view);
  const isWorkzone = useIsWorkzone();

  const countryCode = isWorkzone ? workzoneCountryCode : ehCountryCode;
  const countries = [...supportedCountries, ...(isWhitelistedUK ? ukCountryCodes : [])];

  const isCountrySupported = countries.some(e => e === countryCode);

  return {
    isCountrySupported,
    isLoading: isLoadingEhCountry,
    isFetched,
  };
};

export const useIsCountrySupportedBenefits = (): CountrySupportedOutput => {
  const { ehCountryCode, isFetched, isLoadingEhCountry, workzoneCountryCode } = useEbfCountry();
  const isWhitelistedUK = usePermissionStore(state => state.permissions?.eBenWhitelistedUkBenefits?.view);
  const isWhitelistedNz = usePermissionStore(state => state.permissions?.eBenWhitelistedNzBenefits?.view);
  const isWorkzone = useIsWorkzone();

  const countryCode = isWorkzone ? workzoneCountryCode : ehCountryCode;
  const countries = [
    ...supportedCountries,
    ...(isWhitelistedUK ? ukCountryCodes : []),
    ...(isWhitelistedNz ? nzCountryCodes : []),
  ];

  const isCountrySupported = countries.some(e => e === countryCode);

  return {
    isCountrySupported,
    isLoading: isLoadingEhCountry,
    isFetched,
  };
};
