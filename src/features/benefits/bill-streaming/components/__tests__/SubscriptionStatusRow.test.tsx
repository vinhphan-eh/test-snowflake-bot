import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { SubscriptionStatusRow } from '../SubscriptionStatusRow';

describe('SubscriptionStatusRow', () => {
  it('should render SUBMITTED correctly', () => {
    const { getByText } = render(<SubscriptionStatusRow type="ELECTRICITY" status="SUBMITTED" />);

    expect(getByText('PENDING APPROVAL')).toBeTruthy();
    expect(getByText('Electricity')).toBeTruthy();
  });

  it('should render PENDING correctly', () => {
    const { getByText } = render(<SubscriptionStatusRow type="ELECTRICITY" status="PENDING" />);

    expect(getByText('PENDING APPROVAL')).toBeTruthy();
    expect(getByText('Electricity')).toBeTruthy();
  });
});
