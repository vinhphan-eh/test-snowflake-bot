import React from 'react';
import * as useInAppBrowser from '../../../../common/shared-hooks/useInAppBrowser';
import { customRender, fireEvent, waitFor } from '../../../../common/utils/testing';
import { MONEY_FAQ_LINK } from '../../../support/constants/supportLinks';
import { SpendAccountComingSoonScreen } from '../SpendAccountComingSoonScreen';

describe('Spend Account Coming Soon Screen', () => {
  const mockOpenUrl = jest.fn();
  beforeEach(() => {
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
  });

  it('should render properly', () => {
    const { getByText } = customRender(<SpendAccountComingSoonScreen openCountrySelector={() => {}} />);

    expect(getByText('Swag Spend account is coming soon!')).toBeTruthy();
  });

  it('should open FAQs with InAppBrowser', async () => {
    const { getByLabelText } = customRender(<SpendAccountComingSoonScreen openCountrySelector={() => {}} />);

    const openFaqsButton = getByLabelText('visit our FAQs');

    fireEvent.press(openFaqsButton);

    await waitFor(() => {
      expect(mockOpenUrl).toBeCalledWith(MONEY_FAQ_LINK);
    });
  });

  it('calls openCountrySelector on user clicks "Update your region"', () => {
    const openCountrySelector = jest.fn();
    const { getByLabelText } = customRender(<SpendAccountComingSoonScreen openCountrySelector={openCountrySelector} />);
    expect(openCountrySelector).toBeCalledTimes(0);
    fireEvent.press(getByLabelText('Update your region'));
    expect(openCountrySelector).toBeCalledTimes(1);
  });
});
