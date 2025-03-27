import React from 'react';
import { render, fireEvent } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { TransactWithIncentiveModal } from '../TransactWithIncentiveModal';

describe('Transact With Incentive modal', () => {
  it('should render with iOS device properly', () => {
    const { getByTestId, getByText } = render(<TransactWithIncentiveModal />);
    expect(getByText('Tap with Apple Pay to get $10 on us')).toBeTruthy();
    expect(
      getByText(
        "Use Apple Pay to make a contactless payment in-store or online within the next 14 days and we'll credit $10 to your Swag Visa Debit card for you to spend."
      )
    ).toBeTruthy();
    expect(getByTestId('Get started')).toBeTruthy();
    expect(getByTestId('Close')).toBeTruthy();
  });

  it('should render with Android device properly', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => {
      return {
        OS: 'android',
      };
    });

    const { getByTestId, getByText } = render(<TransactWithIncentiveModal />);
    expect(getByText('Tap with Google Pay to get $10 on us')).toBeTruthy();
    expect(
      getByText(
        "Use Google Pay to make a contactless payment in-store or online within the next 14 days and we'll credit $10 to your Swag Visa Debit card for you to spend."
      )
    ).toBeTruthy();
    expect(getByTestId('Get started')).toBeTruthy();
    expect(getByTestId('Close')).toBeTruthy();
  });

  it('should navigate to Home tab when presses CTA', () => {
    const { getByTestId } = render(<TransactWithIncentiveModal />);
    const gotoWalletButton = getByTestId('Get started');
    fireEvent.press(gotoWalletButton);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });

  it('should navigate to Home tab when closes', () => {
    const { getByTestId } = render(<TransactWithIncentiveModal />);
    const closeButton = getByTestId('Close');
    fireEvent.press(closeButton);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });
});
