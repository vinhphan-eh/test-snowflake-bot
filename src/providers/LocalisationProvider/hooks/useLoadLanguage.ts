import { useEffect } from 'react';
import { useLocalisation } from './useLocalisation';
import { useRegionLocalisation } from './useRegionLocalisation';
import { useEbfCountry } from '../../../common/hooks/useEbfCountry';

export const useLoadLanguage = () => {
  const { ehCountryCode, isLoadingEhCountry, workzoneCountryCode } = useEbfCountry();
  const country = ehCountryCode || workzoneCountryCode;
  const { setLocale } = useLocalisation();
  const { setRegion } = useRegionLocalisation();

  useEffect(() => {
    if (country && !isLoadingEhCountry) {
      setLocale(country);
      setRegion(country);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, isLoadingEhCountry]);
};
