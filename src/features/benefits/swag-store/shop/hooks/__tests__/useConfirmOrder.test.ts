import { getStripePaymentSheetCustomLabel } from '../useConfirmOrder';

describe('getStripePaymentSheetCustomLabel', () => {
  it.each`
    amount  | currency | expected
    ${14.5} | ${'USD'} | ${'Pay $14.5'}
    ${14.5} | ${'AUD'} | ${'Pay AU$14.5'}
    ${14.5} | ${'GBP'} | ${'Pay £14.5'}
    ${14.5} | ${'NZD'} | ${'Pay NZ$14.5'}
  `('should work correctly when amount is $amount and currency is $currency', ({ amount, currency, expected }) => {
    expect(getStripePaymentSheetCustomLabel(amount, currency)).toEqual(expected);
  });
});
