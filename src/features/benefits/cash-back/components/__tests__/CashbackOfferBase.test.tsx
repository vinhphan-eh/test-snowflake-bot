import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { CashbackOfferBase } from '../CashbackOfferBase';

const mockTracking = jest.fn();

jest.mock('../../hooks/useCashbackTracking', () => ({
  useCashbackTracking: () => ({
    trackClickOnCashbackOffer: mockTracking,
  }),
}));

describe('CashbackOfferBase', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <CashbackOfferBase
        isCardLinkedOffer
        category="a"
        supplierName="supplier name"
        title="title"
        offerType="instore"
        onPress={() => {}}
        bottomLabel="bottom label"
      />
    );

    expect(getByText('supplier name')).toBeTruthy();
    expect(getByText('title')).toBeTruthy();
    expect(getByText('bottom label')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();

    const { getByText } = render(
      <CashbackOfferBase
        isCardLinkedOffer
        category="a"
        supplierName="supplier name"
        title="title"
        offerType="instore"
        onPress={mockOnPress}
        bottomLabel="bottom label"
      />
    );

    fireEvent.press(getByText('supplier name'));

    expect(mockOnPress).toBeCalled();
    expect(mockTracking).toBeCalled();
  });
});
