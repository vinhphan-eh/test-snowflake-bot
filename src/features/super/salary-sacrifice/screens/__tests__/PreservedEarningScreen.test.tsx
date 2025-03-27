import React from 'react';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { waitFor } from '@testing-library/react-native';
import { changeTextAndWaitForRender } from './InputDollarAmountScreen.test';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import * as useInAppBrowser from '../../../../../common/shared-hooks/useInAppBrowser';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { PreservedEarningScreen } from '../PreservedEarningScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('PreservedEarningScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        trackingAttributes: {
          fundName: 'Spaceship Voyager',
        },
      },
      key: '',
      name: '',
    });
  });
  it('should renders correctly', async () => {
    const mockOpenUrl = jest.fn();
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
    jest.spyOn(Linking, 'openURL');
    const { getByText } = render(<PreservedEarningScreen />);
    expect(getByText('Skip')).toBeTruthy();
    expect(getByText('Want a safety net? Reserve part of your pay.')).toBeTruthy();

    expect(getByText(/Salary sacrificing super will reduce your take-home pay/i)).toBeTruthy();
    const link = getByText('very limited circumstances');

    fireEvent.press(link);
    expect(mockOpenUrl).toHaveBeenCalledWith('https://bit.ly/3QPPLQ0');
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockRestore();
    jest.spyOn(Linking, 'openURL').mockRestore();
  });

  it('should work properly when perserve amount is valid', async () => {
    const screen = render(<PreservedEarningScreen />);
    const nextButton = screen.getByLabelText('Next');
    const input = screen.getByTestId('salary-sacrifice-preserve-amount-input');

    fireEvent.press(nextButton);
    expect(nextButton).toBeDisabled();
    expect(mockedNavigate).not.toBeCalled();

    await changeTextAndWaitForRender(screen, input, '30');

    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('StartAndStopContribution', {
        title: 'Salary sacrifice',
        trackingAttributes: { fundName: 'Spaceship Voyager' },
      });
    });
  });

  it('should work properly when preserve amount is decimal number', async () => {
    const screen = render(<PreservedEarningScreen />);
    const nextButton = screen.getByLabelText('Next');
    const input = screen.getByTestId('salary-sacrifice-preserve-amount-input');

    await changeTextAndWaitForRender(screen, input, '120.5');
    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('StartAndStopContribution', {
        title: 'Salary sacrifice',
        trackingAttributes: { fundName: 'Spaceship Voyager' },
      });
    });
  });
});
