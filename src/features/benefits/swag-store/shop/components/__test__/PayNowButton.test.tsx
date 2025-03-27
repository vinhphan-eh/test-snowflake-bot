import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { PayNowButton } from '../PayNowButton';

describe(PayNowButton, () => {
  describe('when orderAmount is 0', () => {
    it('should return payNow message', () => {
      const { getByText } = render(
        <PayNowButton
          pointsToPay={0}
          amountToPayViaCardAfterFee={0}
          productCurrency="AUD"
          orderAmount={0}
          isLoading={false}
          onPressed={() => {}}
          disabled={false}
        />
      );

      expect(getByText('Pay now')).toBeTruthy();
    });
  });

  describe('when orderAmount > 0', () => {
    const orderAmount = 100;
    describe('when amountToPayViaCardAfterFee is 0', () => {
      it('should render Pay with Points', () => {
        const pointsToPay = 2000;
        const { getByText } = render(
          <PayNowButton
            pointsToPay={pointsToPay}
            amountToPayViaCardAfterFee={0}
            productCurrency="AUD"
            orderAmount={orderAmount}
            isLoading={false}
            onPressed={() => {}}
            disabled={false}
          />
        );

        expect(getByText('Pay 2,000 PTS')).toBeTruthy();
      });
    });

    describe('when pointsToPay is 0', () => {
      it('should render Pay with credit card', () => {
        const pointsToPay = 0;
        const { getByText } = render(
          <PayNowButton
            pointsToPay={pointsToPay}
            amountToPayViaCardAfterFee={100}
            productCurrency="AUD"
            orderAmount={orderAmount}
            isLoading={false}
            onPressed={() => {}}
            disabled={false}
          />
        );

        expect(getByText('Pay $100.00')).toBeTruthy();
      });
    });

    describe('when pointsToPay > 0 and amountToPayViaCardAfterFee > 0', () => {
      it('should render Pay with credit card and Points', () => {
        const pointsToPay = 100;
        const amountToPayViaCardAfterFee = 100;
        const { getByText } = render(
          <PayNowButton
            pointsToPay={pointsToPay}
            amountToPayViaCardAfterFee={amountToPayViaCardAfterFee}
            productCurrency="AUD"
            orderAmount={orderAmount}
            isLoading={false}
            onPressed={() => {}}
            disabled={false}
          />
        );

        expect(getByText('Pay 100 PTS and $100.00')).toBeTruthy();
      });
    });
  });
});
