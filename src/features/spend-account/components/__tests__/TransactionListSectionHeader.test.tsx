import React from 'react';
import { render } from '../../../../common/utils/testing';
import { TransactionListSectionHeader } from '../TransactionListSectionHeader';

describe('Transaction List Section Header', () => {
  it('should render correctly', () => {
    const { getByText } = render(<TransactionListSectionHeader title="Title" total={30} currency="AUD" />);

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('$30.00')).toBeTruthy();
  });

  it('should show negative side for negative amount', () => {
    const { getByText } = render(<TransactionListSectionHeader title="Title" total={-30} currency="GBP" />);

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('-£30.00')).toBeTruthy();
  });
});
