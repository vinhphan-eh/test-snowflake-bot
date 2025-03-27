import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { mockProductDetailStock } from '../../../../../../graphql/handlers/custom-mock/productDetail';
import { CardAmount2Pay } from '../CardAmount2Pay';

describe('Card', function () {
  const productDetail = mockProductDetailStock();

  describe('correct currency is rendered', () => {
    describe('when currency is AUD', () => {
      it('should render dollars', async () => {
        const { getByText } = render(
          <CardAmount2Pay feeRate={productDetail.transactionFee} fee={0.2} amount={100} currency="AUD" />
        );
        expect(getByText('$100.00')).toBeTruthy();
        expect(getByText('$0.20')).toBeTruthy();
      });
    });

    describe('when currency is GBP', () => {
      it('should render pounds', async () => {
        const { getByText } = render(
          <CardAmount2Pay feeRate={productDetail.transactionFee} fee={0.2} amount={100} currency="GBP" />
        );
        expect(getByText('£100.00')).toBeTruthy();
        expect(getByText('£0.20')).toBeTruthy();
      });
    });
  });

  it('should render properly', async () => {
    const { getByText } = render(
      <CardAmount2Pay feeRate={productDetail.transactionFee} fee={0.2} amount={100} currency="AUD" />
    );
    expect(getByText('Card')).toBeTruthy();
    expect(getByText('Amount')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('$0.20')).toBeTruthy();
    expect(getByText(`Credit/debit card fee (${productDetail.transactionFee}%)`)).toBeTruthy();
  });
});
