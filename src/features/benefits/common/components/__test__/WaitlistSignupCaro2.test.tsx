import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { useBillManagementStore } from '../../../bill-streaming/stores/useBillManagementStore';
import { WaitlistSignupCaro2 } from '../WaitlistSignupCaro2';

describe('WaitlistSignupCaro2', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<WaitlistSignupCaro2 testID="test" />);

    expect(getByTestId('test')).toBeTruthy();
    expect(getByText('YOU VOTED, WE DELIVERED')).toBeTruthy();
    expect(getByTestId('waitlist_background_image')).toBeTruthy();
  });

  it('should navigate correctly when pressed', () => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowENGIEDisclaimer = false;
    billManagementStore.result.current.hasHydrate = true;
    const { getByTestId } = render(<WaitlistSignupCaro2 testID="test" />);
    fireEvent.press(getByTestId('test'));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId: '1',
          onBackToBill: expect.any(Function),
        },
      },
    });
  });
});
