import React from 'react';
import { render } from '../../../../../../../common/utils/testing';
import { OrderStatus } from '../../../../../../../new-graphql/generated';
import { removeSpecialCharacters } from '../../../../utils/orders';
import { GiftCardStatus } from '../GiftCardStatus';

describe('GiftCardStatus', () => {
  it.each`
    status                             | isUsed
    ${OrderStatus.CancelAccepted}      | ${false}
    ${OrderStatus.CancellationPending} | ${false}
    ${OrderStatus.Cancelled}           | ${false}
    ${OrderStatus.Dispatched}          | ${false}
    ${OrderStatus.Fulfilled}           | ${false}
    ${OrderStatus.PaymentFailed}       | ${false}
    ${OrderStatus.PaymentPending}      | ${false}
    ${OrderStatus.Processing}          | ${false}
    ${OrderStatus.ProcessingFailed}    | ${false}
    ${OrderStatus.RefundRejected}      | ${false}
    ${OrderStatus.RefundRequested}     | ${false}
    ${OrderStatus.Refunded}            | ${false}
  `('should work correctly', ({ isUsed, status }) => {
    const { getByText } = render(<GiftCardStatus status={status as OrderStatus} isUsed={isUsed} />);
    expect(getByText(removeSpecialCharacters(status).toUpperCase())).toBeTruthy();
  });

  it.each`
    status                             | isUsed
    ${OrderStatus.CancelAccepted}      | ${true}
    ${OrderStatus.CancellationPending} | ${true}
    ${OrderStatus.Cancelled}           | ${true}
    ${OrderStatus.Dispatched}          | ${true}
    ${OrderStatus.Fulfilled}           | ${true}
    ${OrderStatus.PaymentFailed}       | ${true}
    ${OrderStatus.PaymentPending}      | ${true}
    ${OrderStatus.Processing}          | ${true}
    ${OrderStatus.ProcessingFailed}    | ${true}
    ${OrderStatus.RefundRejected}      | ${true}
    ${OrderStatus.RefundRequested}     | ${true}
    ${OrderStatus.Refunded}            | ${true}
  `('should work correctly USED', ({ isUsed, status }) => {
    const { getByText } = render(<GiftCardStatus status={status as OrderStatus} isUsed={isUsed} />);
    expect(getByText('USED')).toBeTruthy();
  });
});
