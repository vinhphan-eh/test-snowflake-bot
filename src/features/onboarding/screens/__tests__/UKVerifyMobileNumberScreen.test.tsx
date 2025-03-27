import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockStartValidateUkPhoneNumberMutation } from '../../../../new-graphql/generated';
import { UkVerifyMobileNumberScreen } from '../UKVerifyMobileNumberScreen';

describe('UkVerifyMobileNumberScreen', () => {
  it('should render properly', () => {
    const { getByText } = render(<UkVerifyMobileNumberScreen />);
    expect(
      getByText(
        'For your security, we need to confirm your mobile phone number and verify it with a One Time Password (OTP) before verifying your identity. This will ensure that only you can access any ID documents you upload.'
      )
    ).toBeTruthy();
  });

  it('should send SMS OTP on Continue', async () => {
    mockServerNode.use(
      mockStartValidateUkPhoneNumberMutation((_, res, ctx) =>
        res(ctx.data({ startValidateUkPhoneNumber: { success: true } }))
      )
    );

    const { getByTestId } = render(<UkVerifyMobileNumberScreen />);
    const button = getByTestId('uk-mobile-next-btn');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('UkSubmitMobileOTP');
    });
  });

  it('should navigate to general error if OTP trigger fails', async () => {
    mockServerNode.use(
      mockStartValidateUkPhoneNumberMutation((_, res, ctx) =>
        res(ctx.status(500), ctx.errors([{ message: 'Something went wrong' }]))
      )
    );

    const { getByTestId } = render(<UkVerifyMobileNumberScreen />);
    const button = getByTestId('uk-mobile-next-btn');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('GeneralError');
    });
  });

  it('should navigate back on clicked', async () => {
    const { getByTestId } = render(<UkVerifyMobileNumberScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });
});
