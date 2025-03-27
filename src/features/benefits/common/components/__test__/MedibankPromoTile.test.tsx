import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { useBillManagementStore } from '../../../bill-streaming/stores/useBillManagementStore';
import { MedibankPromoTile } from '../MedibankPromoTile';

describe('WaitlistSignupCaro2', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<MedibankPromoTile />);

    expect(getByText('10% off Corporate Health Cover')).toBeTruthy();
    expect(getByText('Medibank')).toBeTruthy();
    expect(getByTestId('medibank_background_image')).toBeTruthy();
    expect(getByTestId('medibank-promote-logo')).toBeTruthy();
  });

  it('should navigate correctly when pressed', () => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowMedibankDislaimer = false;
    billManagementStore.result.current.hasHydrate = true;
    const { getByTestId } = render(<MedibankPromoTile testID="medibank-promote" />);
    fireEvent.press(getByTestId('medibank-promote'));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId: '3',
          onBackToBill: expect.any(Function),
        },
      },
    });
  });
});
