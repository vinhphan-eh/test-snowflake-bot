import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { regionLocalisationMockUtil } from '../../../../../../test-setup/utils/regionLocalisationMockUtil';
import { appVersion } from '../../../../../common/libs/appVersion';
import * as useInAppBrowser from '../../../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, customRenderWithLocalisation as render, waitFor } from '../../../../../common/utils/testing';
import type {
  CashbackOnboardStatusQuery,
  GetCashbackTermsAndConditionsAcceptanceQuery,
} from '../../../../../new-graphql/generated';
import {
  useCashbackOnboardStatusQuery,
  useGetCashbackTermsAndConditionsAcceptanceQuery,
} from '../../../../../new-graphql/generated';
import type { SupportedLocaleCode, SupportedRegionCode } from '../../../../../providers/LocalisationProvider/constants';
import * as useRegionLocalisationHooks from '../../../../../providers/LocalisationProvider/hooks/useRegionLocalisation';
import { mockUseCashbackPermission } from '../../../common/hooks/__mocks__/useCashbackPermission';
import { BenefitsSettingsDashboardScreen } from '../BenefitsSettingsDashboardScreen';

const mockUseCashbackTermsAndConditionsAcceptanceQuery =
  useGetCashbackTermsAndConditionsAcceptanceQuery as unknown as jest.Mock<
    MockQueryResult<GetCashbackTermsAndConditionsAcceptanceQuery>
  >;

const mockUseCashbackOnboardStatusQuery = useCashbackOnboardStatusQuery as unknown as jest.Mock<
  MockQueryResult<CashbackOnboardStatusQuery>
>;
(mockUseCashbackTermsAndConditionsAcceptanceQuery as unknown as { getKey: () => string }).getKey = jest.fn();
(mockUseCashbackOnboardStatusQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  useCashbackOnboardStatusQuery: jest.fn(),
  useGetCashbackTermsAndConditionsAcceptanceQuery: jest.fn(),
}));

jest.mock('../../../../../common/stores/useSessionStore');

describe('Benefits Support Dashboard Screen', () => {
  const mockOpenUrl = jest.fn();

  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: true,
            },
          },
        },
      },
    });

    mockUseCashbackTermsAndConditionsAcceptanceQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            termsAndConditionsAcceptance: {
              isAccepted: true,
            },
          },
        },
      },
    });

    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });

    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should not render cashback section when not having cashback permission', () => {
    mockUseCashbackPermission.mockReturnValue({
      permission: false,
      isLoading: false,
      isFetched: true,
    });

    const { queryByText } = render(<BenefitsSettingsDashboardScreen />);

    expect(queryByText('Cashback')).toBeNull();
    expect(queryByText('Manage enrolled cards')).toBeNull();
  });

  it('should not render cashback section when not onboard CLO', () => {
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: false,
            },
          },
        },
      },
    });

    const { queryByText } = render(<BenefitsSettingsDashboardScreen />);

    expect(queryByText('Cashback')).toBeNull();
    expect(queryByText('Manage enrolled cards')).toBeNull();
  });

  it('should render cashback section correctly', () => {
    const { getByText } = render(<BenefitsSettingsDashboardScreen />);

    expect(getByText('Cashback'));
    expect(getByText('Manage enrolled cards'));

    fireEvent.press(getByText('Manage enrolled cards'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click manage enrolled cards',
      metaData: {
        module: 'Cashback',
      },
    });
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'CardLinkOffersStack',
      params: {
        screen: 'AddCardCashbackDashboard',
      },
    });
  });

  it('should not render cashback section when onboarded CLO, but not accept T&C', () => {
    mockUseCashbackTermsAndConditionsAcceptanceQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            termsAndConditionsAcceptance: {
              isAccepted: false,
            },
          },
        },
      },
    });

    const { queryByText } = render(<BenefitsSettingsDashboardScreen />);

    expect(queryByText('Cashback')).toBeNull();
    expect(queryByText('Manage enrolled cards')).toBeNull();
  });

  describe('should render correctly', () => {
    it.each<{ country: string; locale: SupportedLocaleCode; expectedMessages: { support: string } }>([
      {
        country: 'AU',
        locale: 'en-AU',
        expectedMessages: {
          support: 'We are here to answer your Perks-related questions.',
        },
      },
      {
        country: 'GB',
        locale: 'en-GB',
        expectedMessages: {
          support: 'We are here to answer your Perks-related queries.',
        },
      },
      {
        country: 'NZ',
        locale: 'en-NZ',
        expectedMessages: {
          support: 'We are here to answer your Benefits-related questions.',
        },
      },
    ])('for $country users', ({ expectedMessages, locale }) => {
      const { getByText } = render(<BenefitsSettingsDashboardScreen />, { locale });

      expect(getByText('Need a hand?'));
      expect(getByText('Visit our Help Centre'));
      expect(getByText('FAQs and more'));
      expect(getByText('Cashback'));
      expect(getByText('Manage enrolled cards'));
      expect(getByText(expectedMessages.support));
    });
  });

  describe('should open Help Centre URL with InAppBrowser', () => {
    it.each<{ country: SupportedRegionCode; expectedMessages: { url: string }; isRebrand: boolean }>([
      {
        isRebrand: false,
        country: 'AU',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-au/categories/6186480541839',
        },
      },
      {
        isRebrand: false,
        country: 'GB',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-gb/articles/6052600351631',
        },
      },
      {
        isRebrand: false,
        country: 'NZ',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-nz/categories/6186480541839',
        },
      },
      {
        isRebrand: true,
        country: 'AU',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-au/categories/6186480541839',
        },
      },
      {
        isRebrand: true,
        country: 'GB',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-gb/articles/6052600351631',
        },
      },
      {
        isRebrand: true,
        country: 'NZ',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-nz/categories/6186480541839',
        },
      },
    ])('for $country users', async ({ country, expectedMessages, isRebrand }) => {
      (useSessionStore as unknown as jest.Mock).mockReturnValue({
        swagTextAndImageRebrandEnabled: isRebrand,
      });

      regionLocalisationMockUtil(country);

      const { getByLabelText } = render(<BenefitsSettingsDashboardScreen />);

      const openHelpBtn = getByLabelText('Visit our Help Centre');

      fireEvent.press(openHelpBtn);

      await waitFor(() => {
        expect(mockedEventTracking).toBeCalledWith({
          event: 'Click FAQs button on Benefits pillar - Settings tab',
          categoryName: 'user action',
          metaData: {
            module: 'Settings',
            residentialCountryCode: country,
          },
        });
        expect(mockOpenUrl).toBeCalledWith(expectedMessages.url);
      });
    });
  });

  describe('should open Help Centre URL with InAppBrowser footer', () => {
    it.each<{ country: SupportedRegionCode; expectedMessages: { url: string }; isRebrand: boolean }>([
      {
        isRebrand: false,
        country: 'AU',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-au/categories/6186480541839',
        },
      },
      {
        isRebrand: false,
        country: 'GB',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-gb/articles/6052600351631',
        },
      },
      {
        isRebrand: false,
        country: 'NZ',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-nz/categories/6186480541839',
        },
      },
      {
        isRebrand: true,
        country: 'AU',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-au/categories/6186480541839',
        },
      },
      {
        isRebrand: true,
        country: 'GB',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-gb/articles/6052600351631',
        },
      },
      {
        isRebrand: true,
        country: 'NZ',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-nz/categories/6186480541839',
        },
      },
    ])('for $country users', async ({ country, expectedMessages, isRebrand }) => {
      (useSessionStore as unknown as jest.Mock).mockReturnValue({
        swagTextAndImageRebrandEnabled: isRebrand,
      });

      regionLocalisationMockUtil(country);

      const { getByText } = render(<BenefitsSettingsDashboardScreen />);

      expect(getByText('How Cashback works')).toBeTruthy();
      fireEvent.press(getByText('How Cashback works'));

      await waitFor(() => {
        expect(mockedEventTracking).toBeCalledWith({
          event: 'Click FAQs button on Benefits pillar - Settings tab',
          categoryName: 'user action',
          metaData: {
            module: 'Settings',
            residentialCountryCode: country,
          },
        });
        expect(mockOpenUrl).toBeCalledWith(expectedMessages.url);
      });
    });
  });

  it('should display benefits pillar version', () => {
    jest.spyOn(useRegionLocalisationHooks, 'useRegionLocalisation').mockRestore();

    const { queryByText } = render(<BenefitsSettingsDashboardScreen />);

    expect(queryByText(appVersion.CURRENT_PERSONAL_VERSION, { exact: false })).toBeTruthy();
  });
});
