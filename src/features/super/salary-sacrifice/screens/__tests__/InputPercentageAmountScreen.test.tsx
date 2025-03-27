import React from 'react';
import { useRoute } from '@react-navigation/native';
import { waitFor } from '@testing-library/react-native';
import { changeTextAndWaitForRender } from './InputDollarAmountScreen.test';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { render, fireEvent, renderHook } from '../../../../../common/utils/testing';
import { useSubmitSuperContributionStore } from '../../../store/useSubmitSuperContributionStore';
import { InputPercentageAmountScreen } from '../InputPercentageAmountScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('InputPercentageAmountScreen', () => {
  beforeEach(() => {
    const mockStore = renderHook(() => useSubmitSuperContributionStore());
    mockStore.result.current.orgNames = 'HRV';
    mockStore.result.current.contributionType = 'PERCENTAGE';

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

  it('should works properly when percentage < 100', async () => {
    const screen = render(<InputPercentageAmountScreen />);
    const input = screen.getByTestId('salary-sacrifice-percentage-amount-input');

    expect(screen.getByText('What percentage of your pay would you like to contribute?')).toBeTruthy();
    expect(
      screen.getByText(
        'Enter a percentage to contribute to your super each time you get paid by HRV. It will show up as a line item on your payslip called ‘Pre-tax salary sacrifice’.'
      )
    ).toBeTruthy();

    const nextButton = screen.getByLabelText('Next');
    fireEvent.press(nextButton);
    expect(nextButton).toBeDisabled();
    expect(mockedNavigate).not.toBeCalled();

    await changeTextAndWaitForRender(screen, input, '30');

    const checkbox = screen.getByTestId('acknowledge-check-box');
    fireEvent.press(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeTruthy();
    });

    expect(nextButton).toBeEnabled();

    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Click Input Contribution Amount',
        categoryName: 'user action',
        metaData: {
          contributionType: 'PERCENTAGE',
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

  it('should displays error when percentage > 100', async () => {
    const screen = render(<InputPercentageAmountScreen />);
    const input = screen.getByTestId('salary-sacrifice-percentage-amount-input');

    await changeTextAndWaitForRender(screen, input, '101');
    expect(screen.queryByText('Must be lower than 100')).toBeTruthy();
    const nextBtn = screen.getByLabelText('Next');
    expect(nextBtn).toBeDisabled();
  });
});
