import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext, useRoute } from '@react-navigation/native';
import { mockedNavigate, mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { act, fireEvent, render, waitFor } from '../../../../utils/testing';
import { ChoosePinScreen } from '../ChoosePinScreen';

const ERROR_MESSSAGE = 'Not a secure PIN. Please enter a new PIN.';
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('Choose Pin Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseRoute.mockReturnValue({
      params: {
        header: 'Header',
        title: 'Title',
        repeatedPinScreen: {
          title: '',
          header: '',

          onPinVerifiedSuccess: () => {},
        },
      },
      key: '',
      name: '',
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <ChoosePinScreen />
      </NavigationContext.Provider>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Title')).toBeTruthy();
  });

  it('should show error message', () => {
    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <ChoosePinScreen />
      </NavigationContext.Provider>
    );
    const button = getByTestId('pin-hidden-input');
    fireEvent.changeText(button, '1234');
    expect(getByText(ERROR_MESSSAGE)).toBeTruthy();
  });

  it('should show pin success', () => {
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <ChoosePinScreen />
      </NavigationContext.Provider>
    );
    const button = getByText('Show PIN');
    fireEvent.press(button);
    expect(getByText('Hide PIN')).toBeTruthy();
  });

  it('should navigate next screen', async () => {
    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <ChoosePinScreen />
      </NavigationContext.Provider>
    );
    const button = getByTestId('pin-hidden-input');

    act(() => {
      fireEvent.changeText(button, '1233');
    });

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('RepeatedPin', {
        title: '',
        header: '',
        onPinVerifiedSuccess: expect.anything(),
      });
    });
  });

  it('should able to go back', async () => {
    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <ChoosePinScreen />
      </NavigationContext.Provider>
    );

    fireEvent.press(getByTestId('topbar-back-icon'));

    expect(mockedGoBack).toBeCalled();
  });
});
