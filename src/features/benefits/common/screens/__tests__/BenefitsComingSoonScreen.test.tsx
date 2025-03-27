import React from 'react';
import * as useInAppBrowser from '../../../../../common/shared-hooks/useInAppBrowser';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { BENEFITS_CASHBACK_FAQ_LINK } from '../../../../support/constants/supportLinks';
import { BenefitsComingSoonScreen } from '../BenefitsComingSoonScreen';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';

jest.mock('../../../../../common/stores/useSessionStore');

describe('Benefits Coming Soon Screen', () => {
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

  describe('when rebranding is enabled', () => {
    it('should render properly', () => {
      (useSessionStore as unknown as jest.Mock).mockReturnValue({
        swagTextAndImageRebrandEnabled: true,
      });

      const { getByText } = render(<BenefitsComingSoonScreen openCountrySelector={() => {}} />);

      expect(getByText('Employment Hero Perks are coming soon!')).toBeTruthy();
    });
  });

  describe('when rebranding is disabled', () => {
    it('should render properly', () => {
      (useSessionStore as unknown as jest.Mock).mockReturnValue({
        swagTextAndImageRebrandEnabled: false,
      });

      const { getByText } = render(<BenefitsComingSoonScreen openCountrySelector={() => {}} />);

      expect(getByText('Swag Perks are coming soon!')).toBeTruthy();
    });
  });

  it('should open FAQs with InAppBrowser', async () => {
    const { getByLabelText } = render(<BenefitsComingSoonScreen openCountrySelector={() => {}} />);

    const openFaqsButton = getByLabelText('visit our FAQs');

    fireEvent.press(openFaqsButton);

    await waitFor(() => {
      expect(mockOpenUrl).toBeCalledWith(BENEFITS_CASHBACK_FAQ_LINK);
    });
  });

  it('calls openCountrySelector on user clicks "Update your region"', () => {
    const openCountrySelector = jest.fn();
    const { getByLabelText } = render(<BenefitsComingSoonScreen openCountrySelector={openCountrySelector} />);
    expect(openCountrySelector).toBeCalledTimes(0);
    fireEvent.press(getByLabelText('Update your region.'));
    expect(openCountrySelector).toBeCalledTimes(1);
  });
});
