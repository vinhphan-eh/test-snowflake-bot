import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { ReviewScreen } from '../ReviewScreen';

describe('ReviewScreen', () => {
  it('should renders correctly', async () => {
    const { getByText } = render(<ReviewScreen />);
    expect(getByText('Please confirm these details are correct')).toBeTruthy();
    expect(getByText(`Once you confirm, we'll send this request to your employer.`)).toBeTruthy();
  });
});
