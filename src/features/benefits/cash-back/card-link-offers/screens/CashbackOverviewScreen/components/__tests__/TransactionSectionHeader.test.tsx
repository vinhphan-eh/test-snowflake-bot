import React from 'react';
import { customRender } from '../../../../../../../../common/utils/testing';
import { TransactionListSectionHeader } from '../TransactionListSectionHeader';

describe('Transaction Section Header', () => {
  it('should render correctly', () => {
    const { getByText } = customRender(<TransactionListSectionHeader title="test" />);

    expect(getByText('test')).toBeTruthy();
  });
});
