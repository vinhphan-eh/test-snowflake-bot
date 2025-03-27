import React from 'react';
import { render } from '../../../../common/utils/testing';
import { TransactionListSectionHeader } from '../TransactionListSectionHeader';

describe('Transaction Section Header', () => {
  it('should render correctly', () => {
    const { getByText } = render(<TransactionListSectionHeader total={100} title="test" />);

    expect(getByText('test')).toBeTruthy();
    expect(getByText('100 PTS')).toBeTruthy();
  });
});
