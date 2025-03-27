import { createContext, useContext } from 'react';
import type { SupportedLocaleCode } from '../constants';
import { FALLBACK_LOCALE, mappedLanguages } from '../constants';

const getLanguageByCountry = (country: string): SupportedLocaleCode => {
  const filteredResult = Object.keys(mappedLanguages).filter(language => {
    const languageCodes = mappedLanguages[language as SupportedLocaleCode];
    return languageCodes.some(e => e === country);
  });

  return (filteredResult?.[0] ?? FALLBACK_LOCALE) as SupportedLocaleCode;
};

export const LocalisationContext = createContext({
  currentLanguage: FALLBACK_LOCALE,
  setLocale: () => {},
} as {
  currentLanguage: SupportedLocaleCode;
  setLocale: React.Dispatch<React.SetStateAction<SupportedLocaleCode>>;
});

export const useLocalisation = () => {
  const { currentLanguage, setLocale: setAppLocale } = useContext(LocalisationContext);

  const setLocale = (country: string) => {
    const language = getLanguageByCountry(country);

    if (language !== currentLanguage) {
      setAppLocale(language);
    }
  };

  return {
    currentLanguage,
    setLocale,
  };
};
