import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { InstaPayConsentScreen } from '../InstaPayConsentScreen';

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('InstaPayConsentScreen', () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      params: { feature: 'Now' },
      key: '',
      name: '',
    });
  });

  it('should disable Next btn by default', async () => {
    const { getByText } = render(<InstaPayConsentScreen />);
    const nextBtn = getByText('Next');
    expect(nextBtn).toBeDisabled();
  });

  describe('When check consent box', () => {
    it('should enable Next btn', async () => {
      const { getByTestId, getByText } = render(<InstaPayConsentScreen />);
      const checkbox = getByTestId('instapay-consent-checkbox');
      fireEvent.press(checkbox);
      const nextBtn = getByText('Next');
      expect(nextBtn).toBeEnabled();
    });
  });
});
