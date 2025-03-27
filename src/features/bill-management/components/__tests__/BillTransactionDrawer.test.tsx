import React from 'react';
import { render } from '../../../../common/utils/testing';
import { BillTransactionDrawer } from '../BillTransactionDrawer';

describe('BillTransactionDrawer', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BillTransactionDrawer sections={[]} />);

    expect(getByText('Bill activity')).toBeTruthy();
    expect(getByText('You don’t have any bill activities yet.', { exact: false })).toBeTruthy();
  });
  it('should render correctly when is error', () => {
    const { getByText } = render(<BillTransactionDrawer isError sections={[]} />);
    expect(getByText('Bill activity')).toBeTruthy();
    expect(getByText('Unable to retrieve your transactions.', { exact: false })).toBeTruthy();
  });
  it('should render correctly when is fetching', () => {
    const { getByTestId, getByText } = render(<BillTransactionDrawer isFetching sections={[]} />);

    expect(getByText('Bill activity')).toBeTruthy();
    expect(getByTestId('bill_transaction_drawer_spinner')).toBeTruthy();
  });
  it('should render correctly when is fetching next page', () => {
    const { getByTestId, getByText } = render(<BillTransactionDrawer isFetchingNextPage sections={[]} />);

    expect(getByText('Bill activity')).toBeTruthy();
    expect(getByTestId('bill_transaction_drawer_spinner')).toBeTruthy();
  });
});
