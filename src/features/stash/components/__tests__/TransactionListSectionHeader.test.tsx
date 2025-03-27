import React from 'react';
import { render } from '../../../../common/utils/testing';
import { TransactionListSectionHeader } from '../TransactionListSectionHeader';

describe('Transaction List Section Header', () => {
  it('should render correctly', () => {
    const { getByText } = render(<TransactionListSectionHeader title="Title" total={30} />);

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('$30.00')).toBeTruthy();
  });

  it('should render with minus prefix if the total amount is negative', () => {
    const { getByText } = render(<TransactionListSectionHeader title="Title" total={-20} />);

    expect(getByText('Title')).toBeTruthy();
    expect(getByText('-$20.00')).toBeTruthy();
  });
});
