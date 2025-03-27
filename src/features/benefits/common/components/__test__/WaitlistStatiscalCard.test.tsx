import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { WaitlistStatiscalCard } from '../WaitlistStatiscalCard';

describe('WaitlistStatiscalCard', () => {
  it('renders the title and description correctly', () => {
    const { getByText } = render(
      <WaitlistStatiscalCard title="Sample Title" description="Sample Description" testID="statiscalCard" />
    );

    expect(getByText('Sample Title')).toBeTruthy();
    expect(getByText('Sample Description')).toBeTruthy();
  });
});
