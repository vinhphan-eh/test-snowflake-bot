import React from 'react';
import { useRoute } from '@react-navigation/native';
import type { RenderAPI } from '@testing-library/react-native';
import { waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent, renderHook } from '../../../../../common/utils/testing';
import { useSubmitSuperContributionStore } from '../../../store/useSubmitSuperContributionStore';
import { InputDollarAmountScreen } from '../InputDollarAmountScreen';

export const changeTextAndWaitForRender = async (screen: RenderAPI, input: ReactTestInstance, value: string) => {
  fireEvent.changeText(input, value);
  await waitFor(() => expect(screen.getByDisplayValue(value)).toBeTruthy());
  fireEvent(input, 'blur');
};

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('InputDollarAmountScreen', () => {
  beforeEach(() => {
    const mockStore = renderHook(() => useSubmitSuperContributionStore());
    mockStore.result.current.orgNames = 'HRV';
    mockStore.result.current.contributionType = 'FIXED';

    mockedUseRoute.mockReturnValue({
      params: {
        trackingAttributes: {
          fundName: 'Spaceship Voyager',
          usi: 'mockusi',
        },
      },
      key: '',
      name: '',
    });
  });

  it('should renders and behaves correctly', async () => {
    const screen = render(<InputDollarAmountScreen />);
    expect(screen.getByText('How much of your pay would you like to contribute?')).toBeTruthy();
    expect(
      screen.getByText(
        'Enter a dollar amount to contribute to your super each time you get paid by HRV. It will show up as a line item on your payslip called ‘Pre-tax salary sacrifice’.'
      )
    ).toBeTruthy();

    const nextBtn = screen.getByLabelText('Next');
    expect(nextBtn).toBeDisabled();
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should works properly when amount > 0', async () => {
    const screen = render(<InputDollarAmountScreen />);
    const inputDollar = screen.getByTestId('salary-sacrifice-dollar-amount-input');

    const nextButton = screen.getByLabelText('Next');
    fireEvent.press(nextButton);
    expect(nextButton).toBeDisabled();

    await changeTextAndWaitForRender(screen, inputDollar, '30');

    const checkbox = screen.getByTestId('acknowledge-check-box');
    fireEvent.press(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeTruthy();
    });

    fireEvent.press(nextButton);
    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Click Input Contribution Amount',
        categoryName: 'user action',
        metaData: {
          contributionType: 'FIXED',
          contributionAmount: 30,
          module: 'Salary Sacrifice',
          trackingAttributes: {
            fundName: 'Spaceship Voyager',
            usi: 'mockusi',
          },
        },
      });
      expect(mockedNavigate).toBeCalledWith('PreservedEarning', {
        title: 'Salary sacrifice',
        trackingAttributes: {
          fundName: 'Spaceship Voyager',
          usi: 'mockusi',
        },
      });
    });
  });

  it('should works properly when amount is decimal number', async () => {
    const screen = render(<InputDollarAmountScreen />);
    const nextButton = screen.getByLabelText('Next');
    const input = screen.getByTestId('salary-sacrifice-dollar-amount-input');

    await changeTextAndWaitForRender(screen, input, '120.5');

    const checkbox = screen.getByTestId('acknowledge-check-box');
    fireEvent.press(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeTruthy();
    });

    fireEvent.press(nextButton);
    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('PreservedEarning', {
        title: 'Salary sacrifice',
        trackingAttributes: {
          fundName: 'Spaceship Voyager',
          usi: 'mockusi',
        },
      });
    });
  });

  it('should displays error when amount <= 0 ', async () => {
    const screen = render(<InputDollarAmountScreen />);
    const inputDollar = screen.getByTestId('salary-sacrifice-dollar-amount-input');

    await changeTextAndWaitForRender(screen, inputDollar, '0');
    expect(screen.queryByText('Must be greater than 0')).toBeTruthy();
    const nextBtn = screen.getByLabelText('Next');
    expect(nextBtn).toBeDisabled();
    expect(mockedNavigate).not.toBeCalled();
  });
});
