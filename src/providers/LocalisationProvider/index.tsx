import type { PropsWithChildren } from 'react';
import React, { useMemo, useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { IntlProvider } from 'react-intl';
import type { LocaleConfig, SupportedLocaleCode, SupportedRegionCode } from './constants';
import { FALLBACK_LOCALE, LANGUAGE_ENTITIES } from './constants';
import { useIntl } from './hooks/useIntl';
import { LocalisationContext } from './hooks/useLocalisation';
import { RegionLocalisationContext, useRegionLocalisation } from './hooks/useRegionLocalisation';
import { FALLBACK_CURRENCY, type SupportedCurrency } from '../../common/utils/numbers';

export const getLocaleMessages = (locale: SupportedLocaleCode): LocaleConfig => {
  return (LANGUAGE_ENTITIES.find(item => item.locale === locale)?.config ?? {}) as LocaleConfig;
};

const LocalisationProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocaleCode>(FALLBACK_LOCALE);
  const [currentRegion, setCurrentRegion] = useState<SupportedRegionCode | undefined>(undefined);
  const [defaultCurrency, setDefaultCurrency] = useState<SupportedCurrency>(FALLBACK_CURRENCY);

  const localeContextValue = useMemo(
    () => ({
      currentLanguage: currentLocale,
      setLocale: setCurrentLocale,
    }),
    [currentLocale]
  );

  const regionLocalisationContextValue = useMemo(
    () => ({
      currentRegion,
      setRegion: setCurrentRegion,
      defaultCurrency,
      setDefaultCurrency,
    }),
    [currentRegion, defaultCurrency]
  );

  return (
    <LocalisationContext.Provider value={localeContextValue}>
      <IntlProvider locale={currentLocale} messages={getLocaleMessages(currentLocale)}>
        <RegionLocalisationContext.Provider value={regionLocalisationContextValue}>
          {children}
        </RegionLocalisationContext.Provider>
      </IntlProvider>
    </LocalisationContext.Provider>
  );
};

export { useIntl, useRegionLocalisation };
export default LocalisationProvider;
