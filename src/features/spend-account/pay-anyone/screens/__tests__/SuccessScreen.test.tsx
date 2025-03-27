import React from 'react';
import { regionLocalisationMockUtil } from '../../../../../../test-setup/utils/regionLocalisationMockUtil';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { usePayAnyoneStore } from '../../stores/usePayAnyoneStore';
import { useUkPayAnyoneStore } from '../../stores/useUkPayAnyoneStore';
import { SuccessScreen } from '../SuccessScreen';

describe('Success Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should go to Wallet Dashboard screen by clicking Done button', () => {
    regionLocalisationMockUtil('AU');

    const { getByLabelText } = render(<SuccessScreen />);
    const button = getByLabelText('Done');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });

  describe('when account is UK', () => {
    it('should render properly', () => {
      regionLocalisationMockUtil('GB');
      const { result } = renderHook(() => useUkPayAnyoneStore());
      result.current.paymentDetails = {
        amount: '1.5',
        description: 'Send money',
      };

      const { getByText } = render(<SuccessScreen />);
      expect(getByText('Payment sent')).toBeTruthy();
      expect(getByText('£1.50')).toBeTruthy();
    });
  });

  describe('when account is AU', () => {
    it('should render properly', () => {
      regionLocalisationMockUtil('AU');
      const { result } = renderHook(() => usePayAnyoneStore());
      result.current.paymentDetails = {
        amount: '1.5',
        description: 'Send money',
      };
      const { getByText } = render(<SuccessScreen />);
      expect(getByText('Payment sent')).toBeTruthy();
      expect(getByText('$1.50')).toBeTruthy();
    });
  });
});
