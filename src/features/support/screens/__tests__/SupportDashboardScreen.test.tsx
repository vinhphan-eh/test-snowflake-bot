import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { appVersion } from '../../../../common/libs/appVersion';
import * as useInAppBrowser from '../../../../common/shared-hooks/useInAppBrowser';
import { customRenderWithLocalisation as render, fireEvent, waitFor } from '../../../../common/utils/testing';
import type { SupportedLocaleCode, SupportedRegionCode } from '../../../../providers/LocalisationProvider/constants';
import * as useRegionLocalisationHooks from '../../../../providers/LocalisationProvider/hooks/useRegionLocalisation';
import { SupportDashboardScreen } from '../SupportDashboardScreen';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

jest.mock('../../../../common/stores/useSessionStore');

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;
const renderSubject: typeof render = (element, extra) => {
  return render(<NavigationContext.Provider value={navigationContext}>{element}</NavigationContext.Provider>, extra);
};

describe('Support Dashboard Screen', () => {
  const mockOpenUrl = jest.fn();

  beforeEach(() => {
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });

    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('should render correctly', () => {
    it.each<{ country: string; locale: SupportedLocaleCode; expectedMessages: { support: string } }>([
      {
        country: 'AU',
        locale: 'en-AU',
        expectedMessages: {
          support: 'We are here to answer your Money-related questions.',
        },
      },
      {
        country: 'GB',
        locale: 'en-GB',
        expectedMessages: {
          support: 'We are here to answer your Money-related queries.',
        },
      },
    ])('for $country users', ({ expectedMessages, locale }) => {
      const { getByText } = renderSubject(<SupportDashboardScreen />, { locale });

      expect(getByText('Need a hand?'));
      expect(getByText(expectedMessages.support));
    });
  });

  describe('should open Help Centre URL with InAppBrowser', () => {
    it.each<{ country: SupportedRegionCode; expectedMessages: { url: string }; isRebrand: boolean }>([
      {
        isRebrand: false,
        country: 'AU',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-au/categories/6044879701135',
        },
      },
      {
        isRebrand: false,
        country: 'GB',
        expectedMessages: {
          url: 'https://help.swagapp.com/hc/en-gb/articles/6052605941647-What-is-a-Swag-Spend-Account-Money',
        },
      },
      {
        isRebrand: true,
        country: 'AU',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-au/categories/6044879701135',
        },
      },
      {
        isRebrand: true,
        country: 'GB',
        expectedMessages: {
          url: 'https://workhelp.employmenthero.com/hc/en-gb/articles/6052605941647-What-is-a-Swag-Spend-Account-Money',
        },
      },
    ])('for $country users', async ({ country, expectedMessages, isRebrand }) => {
      (useSessionStore as unknown as jest.Mock).mockReturnValue({
        swagTextAndImageRebrandEnabled: isRebrand,
      });

      regionLocalisationMockUtil(country);

      const { getByLabelText } = renderSubject(<SupportDashboardScreen />);

      const openHelpBtn = getByLabelText('Visit our Help Centre');

      fireEvent.press(openHelpBtn);

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          event: 'Click FAQs button on Money pillar - Support tab',
          categoryName: 'user action',
          metaData: {
            module: 'Settings',
            residentialCountryCode: country,
          },
        });
        expect(mockOpenUrl).toHaveBeenCalledWith(expectedMessages.url);
      });
    });
  });

  it('should navigate to Complaints screen after pressing SSA Complaints button', () => {
    jest.spyOn(useRegionLocalisationHooks, 'useRegionLocalisation').mockRestore();

    const { getByTestId } = renderSubject(<SupportDashboardScreen />);

    const openComplaintsBtn = getByTestId('spend-account-complaints-cta');
    fireEvent.press(openComplaintsBtn);

    expect(mockedNavigate).toBeCalledWith('SupportStack', {
      screen: 'Request',
      params: { pillar: 'Money', subject: 'Complaints', type: 'Complaint', feature: 'Money_SwagSpendAccount' },
    });
  });

  describe('after pressing Financial Wellness button', () => {
    it('should navigate to Financial Wellness screen', () => {
      jest.spyOn(useRegionLocalisationHooks, 'useRegionLocalisation').mockRestore();

      const { getByTestId } = renderSubject(<SupportDashboardScreen />);

      const openFinancialWellnessAndSupportBtn = getByTestId('financial-wellness-and-support-cta');
      fireEvent.press(openFinancialWellnessAndSupportBtn);

      expect(mockedNavigate).toBeCalledWith('SupportStack', {
        screen: 'FinancialWellness',
      });
    });
  });

  it('should navigate to Complaints screen after pressing Bill Management Complaints button', () => {
    jest.spyOn(useRegionLocalisationHooks, 'useRegionLocalisation').mockRestore();

    const { getByTestId } = renderSubject(<SupportDashboardScreen />);

    const openComplaintsBtn = getByTestId('bill-management-complaints-cta');
    fireEvent.press(openComplaintsBtn);

    expect(mockedNavigate).toHaveBeenCalledWith('SupportStack', {
      screen: 'Request',
      params: { pillar: 'Money', subject: 'Complaints', type: 'Complaint', feature: 'Money_BillManagement' },
    });
  });

  it('should display personal app version', () => {
    jest.spyOn(useRegionLocalisationHooks, 'useRegionLocalisation').mockRestore();
    const { queryByText } = renderSubject(<SupportDashboardScreen />);

    expect(queryByText(appVersion.CURRENT_PERSONAL_VERSION, { exact: false })).toBeTruthy();
  });
});
