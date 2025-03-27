import React from 'react';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook } from '../../../../../../common/utils/testing';
import { mockNavigateToBenefitsTopTabs } from '../../../../../../navigation/__mocks__/rootNavigation';
import { cleanUpProductDetail } from '../../store/useDiscountShopStore';
import { PaymentSuccessScreen } from '../PaymentSuccessScreen';

jest.mock('../../store/useDiscountShopStore', () => ({
  cleanUpProductDetail: jest.fn(),
}));

describe('Payment success screen', () => {
  const mockHandleInternalRatingPrompt = jest.fn();

  beforeEach(() => {
    const store = renderHook(() => useSessionStore());
    store.result.current.handleInternalRatingPrompt = mockHandleInternalRatingPrompt;
  });

  it('should render properly', () => {
    const { getByText } = render(<PaymentSuccessScreen />);
    expect(getByText('Your order has been processed')).toBeTruthy();
    expect(getByText('Your gift card has been sent to your email address')).toBeTruthy();
  });

  it('should go to back to top tabs', () => {
    const { getByText } = render(<PaymentSuccessScreen />);
    const button = getByText('Done');
    fireEvent.press(button);
    expect(getByText('Your order has been processed')).toBeTruthy();
    expect(getByText('Your gift card has been sent to your email address')).toBeTruthy();
    expect(mockNavigateToBenefitsTopTabs).toHaveBeenCalled();
    expect(mockHandleInternalRatingPrompt).toHaveBeenCalledWith('makePurchase');
  });

  it('should reset product detail', () => {
    render(<PaymentSuccessScreen />);

    expect(cleanUpProductDetail).toHaveBeenCalled();
  });
});
