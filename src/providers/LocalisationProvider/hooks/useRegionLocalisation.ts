import { createContext, useContext } from 'react';
import type { FormatXMLElementFn, Options as IntlMessageFormatOptions, PrimitiveType } from 'intl-messageformat';
// eslint-disable-next-line no-restricted-imports
import { createIntl, createIntlCache } from 'react-intl';
// eslint-disable-next-line no-restricted-imports
import type { MessageFormatElement } from 'react-intl';
import { getDefaultCurrency } from '../../../common/utils/currency';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import { FALLBACK_CURRENCY } from '../../../common/utils/numbers';
import type { SupportedRegionCode, RegionMessageID, RegionConfig } from '../constants';
import { FALLBACK_REGION, REGION_LANGUAGE_ENTITIES, mappedRegions } from '../constants';

interface MessageDescriptor {
  id?: RegionMessageID;
  description?: string | object;
  defaultMessage?: string | MessageFormatElement[];
}

export const getRegionByCountry = (regionCode: string) => {
  const filteredResult = Object.keys(mappedRegions).find(region => {
    const regionCodes = mappedRegions[region as SupportedRegionCode];
    return regionCodes.some(e => e === regionCode);
  });

  return filteredResult ?? FALLBACK_REGION;
};

export const getRegionMessages = (region: string | undefined): RegionConfig => {
  return (REGION_LANGUAGE_ENTITIES.find(item => item.region === region)?.config ?? {}) as RegionConfig;
};

export const RegionLocalisationContext = createContext({
  currentRegion: undefined,
  defaultCurrency: FALLBACK_CURRENCY,
  setRegion: () => {},
  setDefaultCurrency: () => {},
} as {
  currentRegion: SupportedRegionCode | undefined;
  defaultCurrency: SupportedCurrency;
  setRegion: React.Dispatch<React.SetStateAction<SupportedRegionCode | undefined>>;
  setDefaultCurrency: React.Dispatch<React.SetStateAction<SupportedCurrency>>;
});

/**
 * For later implementation, users may change their locale different from the default one
 * of their region, and this hook is initialized for localisation or logic that strictly
 * depends on the region of the users instead of the locale
 */
export const useRegionLocalisation = () => {
  const {
    currentRegion,
    defaultCurrency,
    setDefaultCurrency,
    setRegion: setAppRegion,
  } = useContext(RegionLocalisationContext);

  const regionIntlCache = createIntlCache();
  const regionIntl = createIntl(
    {
      locale: 'en',
      messages: getRegionMessages(currentRegion),
    },
    regionIntlCache
  );

  const setRegion = (regionCode: string) => {
    const region = getRegionByCountry(regionCode) as keyof typeof mappedRegions;

    if (region !== currentRegion) {
      setAppRegion(region);
      setDefaultCurrency(getDefaultCurrency(region));
    }
  };

  const formatMessage = (
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
    opts?: IntlMessageFormatOptions
  ): string => {
    return regionIntl.formatMessage(descriptor, values, opts);
  };

  /**
   * Self-defined logic based on region localisation
   */

  return {
    currentRegion,
    setRegion,
    formatMessage,
    defaultCurrency,
  };
};
