import React from 'react';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { BillStreamWaitlistSuccessScreen } from '../BillStreamWaitlistSuccessScreen';

describe('BillStreamWaitlistSuccessScreen', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BillStreamWaitlistSuccessScreen />);
    expect(getByText('You’re in!')).toBeTruthy();
    expect(
      getByText(`You've joined the waitlist to be one of the first to streamline and save on essential bills!`)
    ).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();
  });

  it('should dismiss correctly', () => {
    const { getByText } = render(<BillStreamWaitlistSuccessScreen />);
    fireEvent.press(getByText('Done'));

    expect(mockedGoBack).toBeCalled();
  });
});
