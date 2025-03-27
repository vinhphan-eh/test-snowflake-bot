import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { WaitlistSignupSection } from '../WaitlistSignupSection';

describe('WaitlistSignupSection', () => {
  it('should render correctly', () => {
    const { getAllByText } = render(<WaitlistSignupSection />);

    expect(getAllByText('Get market leading health insurance deals!')).toBeTruthy();
    expect(getAllByText('Sign up to the waitlist')).toBeTruthy();
  });

  it('should navigate correctly when pressed', () => {
    const { getByText } = render(<WaitlistSignupSection testID="test" />);
    const signUpButton = getByText('Sign up to the waitlist');
    fireEvent.press(signUpButton);
    expect(mockedNavigate).toHaveBeenCalledWith('BillStreamWaitlist', { screen: 'HealthInsuranceJoinWaitlistScreen' });
  });
});
