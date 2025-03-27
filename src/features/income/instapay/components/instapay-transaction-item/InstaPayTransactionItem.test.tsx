import React from 'react';
import { InstaPayTransactionItem } from './InstaPayTransactionItem';
import { render, renderHook, act } from '../../../../../common/utils/testing';
import { Sign } from '../../../../../new-graphql/generated';
import { aMoney, aMoneyV2, anInstapayTransaction } from '../../../../../new-graphql/mocks/generated-mocks';
import { Region } from '../../../../../providers/LocalisationProvider/constants';
import { useInstaPayDrawdownStore } from '../../stores/useInstaPayDrawdownStore';

const mockInstaPayTransaction = {
  ...anInstapayTransaction({
    createdAt: '07:00PM 11/02/2022',
    adminFee: aMoneyV2({
      units: 5,
      subUnits: 0,
      sign: Sign.Positive,
    }),
    amount: aMoney({
      units: 10,
      subUnits: 0,
    }),
  }),
  orgName: '123',
};

describe('InstaPayTransactionItem', () => {
  test.each([
    { workCountry: Region.au, currencySymbol: '$' },
    { workCountry: Region.gb, currencySymbol: '£' },
  ])('should render enough info for $workCountry user', ({ currencySymbol, workCountry }) => {
    const { result: instaPayStore } = renderHook(() => useInstaPayDrawdownStore());
    act(() => {
      instaPayStore.current.setWorkCountry(workCountry);
    });

    const { queryByText } = render(<InstaPayTransactionItem data={mockInstaPayTransaction} />);

    expect(queryByText(`${currencySymbol}5.00`)).toBeTruthy();
    expect(queryByText(`${currencySymbol}10.00`)).toBeTruthy();
    expect(queryByText(mockInstaPayTransaction.abaLodgementReference)).toBeTruthy();
    expect(queryByText(mockInstaPayTransaction.orgName)).toBeTruthy();
  });
});
