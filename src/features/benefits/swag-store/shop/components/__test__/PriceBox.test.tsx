import React from 'react';
import { createCurrencyFormatter } from '../../../../../../common/utils/numbers';
import { render } from '../../../../../../common/utils/testing';
import { mockProductDetailStock } from '../../../../../../graphql/handlers/custom-mock/productDetail';
import { PriceBox } from '../PriceBox/PriceBox';

describe('Price Box', () => {
  it('should render correctly', () => {
    const productDetail = mockProductDetailStock();
    const formatCurrency = createCurrencyFormatter();
    const { getByText } = render(
      <PriceBox
        firstBox={{ title: 'Pay', value: formatCurrency(productDetail.price) }}
        secondBox={{ title: 'Get', value: formatCurrency(productDetail.discountPrice) }}
        thirdBox={{ title: 'Swag Saving', value: formatCurrency(productDetail.price - productDetail.discountPrice) }}
      />
    );
    expect(getByText('Pay')).toBeTruthy();
    expect(getByText('Get')).toBeTruthy();
    expect(getByText('Swag Saving')).toBeTruthy();
    expect(getByText(formatCurrency(productDetail.price))).toBeTruthy();
    expect(getByText(formatCurrency(productDetail.discountPrice))).toBeTruthy();
    expect(getByText(formatCurrency(productDetail.price - productDetail.discountPrice))).toBeTruthy();
  });
});
