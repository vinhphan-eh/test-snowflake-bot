import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { RecentPayHistoryBottomSheet } from '../RecentPayHistoryBottomSheet';

describe('RecentPayHistoryBottomSheet', () => {
  const mockData = [
    { timestamp: '25 Mar 2023', amount: '$500.00' },
    { timestamp: '26 Mar 2023', amount: '$500.00' },
    { timestamp: '27 Mar 2023', amount: '$500.00' },
    { timestamp: '28 Mar 2023', amount: '$500.00' },
  ];
  it('should render correctly', () => {
    const { getByText, queryAllByTestId } = render(<RecentPayHistoryBottomSheet data={mockData} />);
    expect(
      getByText('Refer to your recent payslips to decide on how much of your pay you want to preserve.')
    ).toBeTruthy();
    expect(queryAllByTestId('history-item-id')).toHaveLength(4);
    expect(getByText('25 Mar 2023')).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();
  });
});
