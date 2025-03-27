import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import { QuantitySelect } from '../QuantitySelect';

describe('Quantity select', () => {
  it('should render correctly', () => {
    const { getByDisplayValue, getByTestId, getByText } = render(
      <QuantitySelect value={1} quantity={5} onQuantitySelect={() => {}} />
    );
    expect(getByDisplayValue('1')).toBeTruthy();
    expect(getByText('Quantity')).toBeTruthy();

    fireEvent.press(getByTestId('text-input'));

    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });
});
