import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useSessionStore } from '../../../../stores/useSessionStore';
import { fireEvent, render, waitFor } from '../../../../utils/testing';
import { usePasscodeStore } from '../../stores/usePasscodeStore';
import { PasscodeScreen } from '../PasscodeScreen';

describe('Passcode Screen', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<PasscodeScreen />);

    expect(getByTestId('pin_input')).toBeTruthy();
    expect(getByText('Enter Passcode')).toBeTruthy();
    expect(getByTestId('topbar-right-icon')).toBeTruthy();
  });

  it('should close correctly', () => {
    const mockSetRequirePasscode = jest.fn();
    const mockDismissCallback = jest.fn();

    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;
    passcodeStore.current.dismissCallback = mockDismissCallback;

    const { getByTestId } = render(<PasscodeScreen />);
    fireEvent.press(getByTestId('topbar-right-icon'));

    expect(mockSetRequirePasscode).toBeCalledWith(false);
    expect(mockDismissCallback).toBeCalled();
  });

  it('should work correctly with 3 fail attempts', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });

    const mockSetRequirePasscode = jest.fn();
    const mockSuperAppLogout = jest.fn();

    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    const { result: sessionStore } = renderHook(() => useSessionStore());

    sessionStore.current.superAppLogout = mockSuperAppLogout;
    passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;
    passcodeStore.current.passcodeValidate = param => {
      param.onFailedPasscode();
    };

    const { getByTestId, getByText } = render(<PasscodeScreen />);
    const pinInput = getByTestId('pin-hidden-input');

    fireEvent.changeText(pinInput, '123456');

    await waitFor(() => {
      expect(getByText('Incorrect passcode. Please try again.')).toBeTruthy();
    });

    fireEvent.changeText(pinInput, '888888');

    await waitFor(() => {
      expect(
        getByText('Incorrect passcode. You have 1 more attempt before you are automatically logged out of the app.')
      ).toBeTruthy();
    });

    fireEvent.changeText(pinInput, '777777');

    await waitFor(() => {
      expect(getByText('Incorrect passcode. You will be logged out.')).toBeTruthy();
      jest.advanceTimersByTime(2000);
      expect(mockSetRequirePasscode).toBeCalledWith(false);
      expect(mockSuperAppLogout).toBeCalled();
    });
  });

  it('should work correctly when enter valid passcode', async () => {
    const mockSetRequirePasscode = jest.fn();
    const mockSuccessCallback = jest.fn();

    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;
    passcodeStore.current.successCallback = mockSuccessCallback;
    passcodeStore.current.passcodeValidate = param => {
      param.onSucceededPasscode();
    };

    const { getByTestId } = render(<PasscodeScreen />);

    fireEvent.changeText(getByTestId('pin-hidden-input'), '123456');

    await waitFor(() => {
      expect(mockSetRequirePasscode).toBeCalledWith(false);
      expect(mockSuccessCallback).toBeCalled();
    });
  });
});
