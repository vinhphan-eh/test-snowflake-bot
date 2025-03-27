import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import { mockInstoreOffer } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { InstoreOfferItem } from '../InstoreOfferItem';

describe('InstoreOfferItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <InstoreOfferItem item={mockInstoreOffer} onPress={() => {}} bottomLabel="0.17km away" />
    );
    expect(getByText('Novo Shoes')).toBeTruthy();
    expect(getByText('Up to 4% cashback')).toBeTruthy();
    expect(getByText('0.17km away')).toBeTruthy();
  });

  it('should render correctly when there is no address', () => {
    const { getByText } = render(<InstoreOfferItem item={mockInstoreOffer} onPress={() => {}} />);
    expect(getByText('Novo Shoes')).toBeTruthy();
    expect(getByText('Up to 4% cashback')).toBeTruthy();
    expect(getByText('In-store')).toBeTruthy();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();

    const { getByText } = render(
      <InstoreOfferItem item={mockInstoreOffer} onPress={mockOnPress} bottomLabel="0.17km away" />
    );
    fireEvent.press(getByText('Novo Shoes'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
