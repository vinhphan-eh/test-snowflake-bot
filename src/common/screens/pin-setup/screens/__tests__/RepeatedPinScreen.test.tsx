import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext, useRoute } from '@react-navigation/native';
import { renderHook } from '@testing-library/react-hooks';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { act, fireEvent, render, waitFor } from '../../../../utils/testing';
import { usePinSetup } from '../../stores/usePinSetup';
import { RepeatedPinScreen } from '../RepeatedPinScreen';

const ERROR_MESSSAGE = 'PIN does not match. Please re-enter your new PIN.';
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

const mockOnPinVerifiedSuccess = jest.fn();

describe('Repeated Pin Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const { result } = renderHook(() => usePinSetup());
    result.current.setPin('1233');
    mockedUseRoute.mockReturnValue({
      params: { header: 'Header', title: 'Title', onPinVerifiedSuccess: mockOnPinVerifiedSuccess },
      key: '',
      name: '',
    });
  });

  it('should render properly', () => {
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RepeatedPinScreen />
      </NavigationContext.Provider>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Title')).toBeTruthy();
  });

  it('should show error message', () => {
    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RepeatedPinScreen />
      </NavigationContext.Provider>
    );
    const button = getByTestId('pin-hidden-input');
    fireEvent.changeText(button, '1234');
    expect(getByText(ERROR_MESSSAGE)).toBeTruthy();
  });

  it('should show pin in clear text', async () => {
    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RepeatedPinScreen />
      </NavigationContext.Provider>
    );
    act(() => {
      fireEvent.changeText(getByTestId('pin-hidden-input'), '123');
      fireEvent.press(getByText('Show PIN'));
    });

    await waitFor(() => {
      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('3')).toBeTruthy();
      expect(getByText('Hide PIN')).toBeTruthy();
    });
  });

  it('should call onVerifiedPinSuccess when having correct pin', async () => {
    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RepeatedPinScreen />
      </NavigationContext.Provider>
    );
    const button = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(button, '1233');
    });

    await waitFor(() => {
      expect(mockOnPinVerifiedSuccess).toBeCalledWith('1233', expect.anything());
    });
  });

  it('should go back correctly', async () => {
    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RepeatedPinScreen />
      </NavigationContext.Provider>
    );

    fireEvent.press(getByTestId('topbar-back-icon'));

    expect(mockedGoBack).toBeCalled();
  });
});
