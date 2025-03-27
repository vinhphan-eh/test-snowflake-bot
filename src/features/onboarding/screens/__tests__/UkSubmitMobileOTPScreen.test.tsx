import React from 'react';
import { mockedNavigate, mockReset } from '../../../../../__mocks__/react-navigation';
import { act, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockVerifyUkMobileEnrollmentMutation } from '../../../../new-graphql/generated';
import { UkSubmitMobileOTPScreen } from '../UkSubmitMobileOTPScreen';

describe('UkSubmitMobileOTPScreen', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the passcode input', () => {
    const { getByTestId } = render(<UkSubmitMobileOTPScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');
    expect(passcodeInput).toBeDefined();
  });

  it('should navigate to UkBiometrics if the code is verified successfully', async () => {
    mockServerNode.use(
      mockVerifyUkMobileEnrollmentMutation((_, res, ctx) => res(ctx.data({ verifyUkPhoneNumber: { success: true } })))
    );

    const { getByTestId } = render(<UkSubmitMobileOTPScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(passcodeInput, '123456');
    });

    await waitFor(() => {
      expect(mockReset).toBeCalledWith({
        index: 0,
        routes: [
          {
            name: 'UkBiometrics',
          },
        ],
      });
    });
  });

  it('should navigate to error screen if the code is not verified successfully', async () => {
    mockServerNode.use(
      mockVerifyUkMobileEnrollmentMutation((_, res, ctx) =>
        res(ctx.status(500), ctx.errors([{ message: 'Something went wrong' }]))
      )
    );

    const { getByTestId, getByText } = render(<UkSubmitMobileOTPScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(passcodeInput, '123456');
    });

    await waitFor(() => {
      expect(getByText('Incorrect code. Please try again.')).toBeTruthy();
    });

    act(() => {
      fireEvent.changeText(passcodeInput, '888888');
    });

    await waitFor(() => {
      expect(getByText('Incorrect code. You have 1 more attempt.')).toBeTruthy();
    });

    act(() => {
      fireEvent.changeText(passcodeInput, '777777');
    });

    await waitFor(() => {
      expect(getByText('Incorrect code.')).toBeTruthy();
      expect(mockedNavigate).toBeCalledWith('GeneralError');
    });
  });
});
