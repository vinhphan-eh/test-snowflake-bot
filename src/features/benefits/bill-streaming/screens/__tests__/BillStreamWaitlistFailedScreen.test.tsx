import React from 'react';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { BillStreamWaitlistFailedScreen } from '../BillStreamWaitlistFailedScreen';

describe('BillStreamWaitlistFailedScreen', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BillStreamWaitlistFailedScreen />);
    expect(getByText('We’re sorry, something went wrong')).toBeTruthy();
    expect(getByText(`Please try again later`)).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();
  });

  it('should dismiss correctly', () => {
    const { getByText } = render(<BillStreamWaitlistFailedScreen />);
    fireEvent.press(getByText('Done'));

    expect(mockedGoBack).toBeCalled();
  });
});
