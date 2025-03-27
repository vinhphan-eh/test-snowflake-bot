import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { WaitlistCard } from '../WaitlistCard';

describe('WaitlistCard', () => {
  it('should render correctly', () => {
    const { getByLabelText } = render(<WaitlistCard onPress={() => {}} />);

    expect(getByLabelText('Background image')).toBeTruthy();
    expect(getByLabelText('Save more everyday with bill management')).toBeTruthy();
    expect(getByLabelText('Join the waitlist description')).toBeTruthy();
    expect(getByLabelText('Find out more')).toBeTruthy();
  });
});
