import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { ProductInfoCard } from '../ProductInfoCard';

describe('Product Info Card', () => {
  it('should render correctly', () => {
    const { getByLabelText, getByText } = render(
      <ProductInfoCard
        currency="AUD"
        imageSource={{
          uri: '',
        }}
        name="Product name"
        quantity={1}
        price={50}
        onQuantitySelect={() => {}}
        disableSelect={false}
        numberInStock={10}
      />
    );
    expect(getByText('Product name')).toBeTruthy();
    expect(getByText('$50.00 each')).toBeTruthy();
    expect(getByLabelText('Quantity selection')).toBeTruthy();
  });

  it('should render points value correctly', () => {
    const { getByText } = render(
      <ProductInfoCard
        currency="AUD"
        imageSource={{
          uri: '',
        }}
        name="Product name"
        quantity={1}
        price={50}
        onQuantitySelect={() => {}}
        disableSelect={false}
        numberInStock={10}
        priceInPoints={110}
      />
    );
    expect(getByText('$50.00 or 110 PTS each')).toBeTruthy();
  });
});
