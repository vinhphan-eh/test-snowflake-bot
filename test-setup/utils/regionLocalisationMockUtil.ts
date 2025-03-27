import { getDefaultCurrency } from '../../src/common/utils/currency';
import type { SupportedRegionCode } from '../../src/providers/LocalisationProvider/constants';
import * as hooks from '../../src/providers/LocalisationProvider/hooks/useRegionLocalisation';
import { getRegionMessages } from '../../src/providers/LocalisationProvider/hooks/useRegionLocalisation';

export const regionLocalisationMockUtil = (regionCode: SupportedRegionCode = 'AU') => {
  jest.spyOn(hooks, 'useRegionLocalisation').mockImplementation(() => {
    const reactIntl = jest.requireActual('react-intl');
    const regionIntlCache = reactIntl.createIntlCache();
    const intl = reactIntl.createIntl(
      {
        locale: 'en',
        messages: getRegionMessages(regionCode),
      },
      regionIntlCache
    );

    return {
      currentRegion: regionCode,
      defaultCurrency: getDefaultCurrency(regionCode),
      setRegion: jest.fn(),
      formatMessage: intl.formatMessage,
    };
  });
};
