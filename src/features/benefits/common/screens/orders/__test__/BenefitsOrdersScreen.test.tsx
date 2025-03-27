import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { mockUsePurchaseTabVisibility } from '../../../hooks/__mocks__/usePurchaseTabVisibility';

import { BenefitsOrdersScreen } from '../BenefitsOrdersScreen';

jest.mock('../BillsTab', () => ({
  BillsTab: () => <Text>Bill tab</Text>,
}));

jest.mock('../CashbackTab', () => ({
  CashbackTab: () => <Text>Cashback tab</Text>,
}));

jest.mock('../GiftcardsTab', () => ({
  GiftcardsTab: () => <Text>Giftcards tab</Text>,
}));

describe('BenefitsOrdersScreen', () => {
  beforeEach(() => {
    mockUsePurchaseTabVisibility.mockReturnValue({
      billTabVisibility: true,
      cashbackTabVisibility: true,
      storeTabVisibility: true,
      isFetched: true,
      permission: true,
    });
  });
  it('Should work properly when all conditions met', () => {
    const { getAllByTestId, getByText } = render(<BenefitsOrdersScreen />);

    expect(getByText('Giftcards tab')).toBeTruthy();

    // Switch to Cashback tab and render correctly
    expect(getAllByTestId('cashback-tab')).toBeTruthy();
    fireEvent.press(getAllByTestId('cashback-tab')[0]);
    expect(getByText('Cashback tab')).toBeTruthy();

    // Switch to Bills tab tab and render correctly
    expect(getAllByTestId('bills-tab')).toBeTruthy();
    fireEvent.press(getAllByTestId('bills-tab')[0]);
    expect(getByText('Bill tab')).toBeTruthy();
  });
  it.each`
    billTabVisibility | cashbackTabVisibility | storeTabVisibility | expected
    ${false}          | ${true}               | ${true}            | ${['cashback-tab', 'gift-cards-tab']}
    ${true}           | ${false}              | ${true}            | ${['bills-tab', 'gift-cards-tab']}
    ${true}           | ${true}               | ${false}           | ${['bills-tab', 'cashback-tab']}
    ${false}          | ${false}              | ${true}            | ${['Giftcards tab']}
    ${false}          | ${true}               | ${false}           | ${['Cashback tab']}
    ${true}           | ${false}              | ${false}           | ${['Bill tab']}
  `('should show tabs correctly', ({ billTabVisibility, cashbackTabVisibility, expected, storeTabVisibility }) => {
    mockUsePurchaseTabVisibility.mockReturnValue({
      billTabVisibility,
      cashbackTabVisibility,
      storeTabVisibility,
      isFetched: true,
      permission: true,
    });

    const { getAllByTestId, getByText } = render(<BenefitsOrdersScreen />);

    if (expected.length === 1) {
      expect(getByText(expected[0])).toBeTruthy();
    } else {
      expected.forEach((tab: string) => {
        expect(getAllByTestId(tab).length).toBeGreaterThan(0);
      });
    }
  });
});
