import {
  AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE,
  UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE,
} from '../../../../common/constants/countries';

export type InstaPayDefaultLimit = { max: number; min: number; schedulingMin: number };

type CountryLimit = {
  [key: string]: InstaPayDefaultLimit;
};

const COUNTRY_LIMITS: CountryLimit = {
  [AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE]: {
    max: 1000,
    min: 0,
    schedulingMin: 50,
  },
  [UNITED_KINGDOM_ISO_ALPHA2_COUNTRY_CODE]: {
    max: 125,
    min: 0,
    schedulingMin: 0,
  },
};

export const getWithdrawalLimit = (workCountry: string) => {
  const country = workCountry.toUpperCase();

  return COUNTRY_LIMITS[country] || COUNTRY_LIMITS.AUSTRALIA_ISO_ALPHA2_COUNTRY_CODE;
};
