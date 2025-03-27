import React from 'react';
import { mockReset } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { usePayAnyoneStore } from '../../stores/usePayAnyoneStore';
import { ScheduledPaymentSuccessScreen } from '../ScheduledPaymentSuccessScreen';

describe('Scheduled payment success screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should go to Wallet Dashboard screen by clicking Done button', () => {
    const { getByLabelText } = render(<ScheduledPaymentSuccessScreen />);
    const button = getByLabelText('Done');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });

  it('should render properly', () => {
    const { result } = renderHook(() => usePayAnyoneStore());
    result.current.paymentDetails = {
      amount: '1.5',
      description: 'Send money',
    };
    const { getByText } = render(<ScheduledPaymentSuccessScreen />);
    expect(getByText('Payment scheduled')).toBeTruthy();
    expect(getByText('$1.50')).toBeTruthy();
    expect(getByText('Manage scheduled payments')).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();
  });

  it('should go to Manage scheduled payments screen by clicking on the proper button', () => {
    const { getByLabelText } = render(<ScheduledPaymentSuccessScreen />);
    const button = getByLabelText('Manage scheduled payments');
    fireEvent.press(button);

    expect(mockReset).toBeCalledWith({
      index: 0,
      routes: [
        {
          name: 'ScheduledPaymentDashboard',
        },
      ],
    });
  });
});
