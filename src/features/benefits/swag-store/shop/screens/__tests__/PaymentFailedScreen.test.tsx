import React from 'react';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { mockNavigateToBenefitsTopTabs } from '../../../../../../navigation/__mocks__/rootNavigation';
import { cleanUpProductDetail } from '../../store/useDiscountShopStore';
import { PaymentFailedScreen } from '../PaymentFailedScreen';

jest.mock('../../store/useDiscountShopStore', () => ({
  cleanUpProductDetail: jest.fn(),
}));

describe('Payment failed screen', () => {
  it('should render properly', () => {
    const { getByText } = render(<PaymentFailedScreen />);
    expect(getByText(`We're sorry, something went wrong`)).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('should go to back to top tabs ', () => {
    const { getByText } = render(<PaymentFailedScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(getByText(`We're sorry, something went wrong`)).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
    expect(mockNavigateToBenefitsTopTabs).toHaveBeenCalled();
  });

  it('should reset product detail', () => {
    render(<PaymentFailedScreen />);

    expect(cleanUpProductDetail).toHaveBeenCalled();
  });
});
