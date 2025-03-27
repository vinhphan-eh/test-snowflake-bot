import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { mockedNavigate, mockReset } from '../../../../../__mocks__/react-navigation';
import { usePasscodeStore } from '../../../../common/screens/passcode';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { act, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockCreateUkPasscodeMutation } from '../../../../new-graphql/generated';
import { UkPasscodeScreen } from '../UkPasscodeScreen';

describe('UkPasscodeScreen', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the passcode input', () => {
    const { getByTestId } = render(<UkPasscodeScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');
    expect(passcodeInput).toBeDefined();
  });

  it('should go to UkVerifyIdentityDocumentInfo if passcode is validated successfully', async () => {
    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    useSessionStore.setState({ currentUser: { loginProvider: 'eh', userID: 'fake' } });
    const mockToken = 'fake-token';
    passcodeStore.current.passcodeValidate = param => {
      param.onSucceededPasscode();
    };

    mockServerNode.use(
      mockCreateUkPasscodeMutation((_, res, ctx) => res(ctx.data({ setUKPasscode: { userToken: mockToken } })))
    );
    const { getByTestId } = render(<UkPasscodeScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(passcodeInput, '123456');
    });

    await waitFor(() => {
      expect(mockReset).toBeCalledWith({
        index: 0,
        routes: [
          {
            name: 'UkVerifyMobileNumber',
          },
        ],
      });
    });
  });

  it('should go to General error if cannot save passcode', async () => {
    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    passcodeStore.current.passcodeValidate = param => {
      param.onSucceededPasscode();
    };

    mockServerNode.use(
      mockCreateUkPasscodeMutation((_, res, ctx) =>
        res(ctx.status(500), ctx.errors([{ message: 'Something went wrong' }]))
      )
    );
    const { getByTestId } = render(<UkPasscodeScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(passcodeInput, '123456');
    });

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('GeneralError');
    });
  });

  it('should show errors when the passcode is not validated successfully', async () => {
    const mockSuperAppLogout = jest.fn();

    const { result: sessionStore } = renderHook(() => useSessionStore());
    sessionStore.current.superAppLogout = mockSuperAppLogout;

    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    passcodeStore.current.passcodeValidate = param => {
      param.onFailedPasscode();
    };

    const { getByTestId, getByText } = render(<UkPasscodeScreen />);
    const passcodeInput = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(passcodeInput, '123456');
    });

    await waitFor(() => {
      expect(getByText('Incorrect passcode. Please try again.')).toBeTruthy();
    });

    act(() => {
      fireEvent.changeText(passcodeInput, '888888');
    });

    await waitFor(() => {
      expect(
        getByText('Incorrect passcode. You have 1 more attempt before you are automatically logged out of the app.')
      ).toBeTruthy();
    });

    act(() => {
      fireEvent.changeText(passcodeInput, '777777');
    });

    await waitFor(() => {
      expect(getByText('Incorrect passcode. You will be logged out.')).toBeTruthy();
    });
  });
});
