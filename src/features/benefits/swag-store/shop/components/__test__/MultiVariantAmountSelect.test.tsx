import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import { useServiceFeeFeature } from '../../hooks/useServiceFeeFeature';
import { MultiVariantAmountSelect } from '../MultiVariantAmountSelect';

jest.mock('../../hooks/useServiceFeeFeature', () => ({
  useServiceFeeFeature: jest.fn(),
}));

describe('MultiVariantAmountSelect', () => {
  const mockVariants = [
    {
      id: 'variant1',
      variantCode: 'Variant 1',
      discountPrice: 100,
      discountPriceInPoints: 1000,
      stockAvailable: true,
      amount: 1,
      freightPrice: 5,
      label: 'Variant 1 Label',
      numberInStock: 10,
      position: 1,
      price: 120,
      status: 'available',
    },
    {
      id: 'variant2',
      variantCode: 'Variant 2',
      discountPrice: 200,
      discountPriceInPoints: 2000,
      stockAvailable: false,
      amount: 1,
      freightPrice: 5,
      label: 'Variant 2 Label',
      numberInStock: 0,
      position: 2,
      price: 220,
      status: 'unavailable',
    },
  ];

  const mockProduct = {
    productVariants: mockVariants,
    serviceFee: 10,
  };

  const onSelected = jest.fn();

  beforeEach(() => {
    (useServiceFeeFeature as jest.Mock).mockReturnValue({
      getPriceWithFee: jest.fn((price: number, serviceFee: number) => {
        return price + serviceFee;
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with variants', () => {
    const { getByTestId, getByText } = render(
      <MultiVariantAmountSelect onSelected={onSelected} currency="USD" product={mockProduct} />
    );

    fireEvent.press(getByTestId('multi-variant-select'));

    expect(getByText('$120.00')).toBeTruthy();
    expect(getByText('$220.00')).toBeTruthy();
  });

  it('does not allow selecting a disabled variant', () => {
    const { getByTestId, getByText } = render(
      <MultiVariantAmountSelect onSelected={onSelected} currency="USD" product={mockProduct} />
    );

    fireEvent.press(getByTestId('multi-variant-select'));
    fireEvent.press(getByText('$220.00'));

    expect(onSelected).not.toHaveBeenCalledTimes(2);
  });
});
