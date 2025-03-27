import React from 'react';
import { mockedGoBack, mockedReplace } from '../../../../../../__mocks__/react-navigation';
import { render, renderHook, fireEvent } from '../../../../../common/utils/testing';
import { useBillStreamingWaitlistStore } from '../../stores/useBillStreamingWaitlistStore';
import { BillStreamWaitlistIntroScreen } from '../BillStreamWaitlistIntroScreen';

describe('BillStreamWaitlistIntroScreen', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<BillStreamWaitlistIntroScreen />);

    expect(getByTestId('cover_img')).toBeTruthy();
    expect(getByText('Save more everyday', { exact: false })).toBeTruthy();
    expect(
      getByText('Join the waitlist to be one of the first to streamline and save on essential bills with ease!')
    ).toBeTruthy();
    expect(getByText('Learn more')).toBeTruthy();
  });

  it('should call visitWaitlistPopup', () => {
    const mockVisitPopup = jest.fn();
    const store = renderHook(() => useBillStreamingWaitlistStore());
    store.result.current.visitWaitlistPopup = mockVisitPopup;

    render(<BillStreamWaitlistIntroScreen />);
    expect(mockVisitPopup).toBeCalled();
  });

  it('click cancel go back correctly', () => {
    const { getByTestId } = render(<BillStreamWaitlistIntroScreen />);
    const cancelBtn = getByTestId('close_btn');
    expect(cancelBtn).toBeTruthy();

    fireEvent.press(cancelBtn);

    expect(mockedGoBack).toBeCalled();
  });

  it('should go to sign up screen correctly', () => {
    const { getByText } = render(<BillStreamWaitlistIntroScreen />);

    fireEvent.press(getByText('Learn more'));

    expect(mockedReplace).toBeCalledWith('BillStreamWaitlistSignup');
  });
});
