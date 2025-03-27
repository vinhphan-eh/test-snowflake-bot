import { useRoute } from '@react-navigation/native';
import React from 'react';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { InstaPayDrawdownErrorScreen } from '../InstaPayDrawdownErrorScreen';

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('InstaPayDrawdownErrorScreen', () => {
  test('should render general error', () => {
    mockUseRoute.mockReturnValue({
      params: {
        errorCode: 'GENERAL_ERROR',
      },
      key: '',
      name: '',
    });
    const { getByTestId, getByText } = render(<InstaPayDrawdownErrorScreen />);

    const generalError = getByTestId('Income general error');
    const closeBtn = getByText('Close');
    fireEvent.press(closeBtn);

    expect(generalError).toBeTruthy();
    expect(closeBtn).toBeTruthy();
    expect(mockedSwitchPillar).toHaveBeenCalledWith({
      to: {
        pillarId: 'WalletApp',
        tab: 'income-tab',
      },
    });
  });

  test('should render maintenance mode', () => {
    mockUseRoute.mockReturnValue({
      params: {
        errorCode: 'system_error:under_maintenance',
      },
      key: '',
      name: '',
    });
    const { getByTestId, getByText } = render(<InstaPayDrawdownErrorScreen />);

    const layoutId = getByTestId('instapay-now-maintenance-layout');
    const closeBtn = getByText('Close');

    fireEvent.press(closeBtn);

    expect(layoutId).toBeTruthy();
    expect(closeBtn).toBeTruthy();
    expect(mockedSwitchPillar).toHaveBeenCalledWith({
      to: {
        pillarId: 'WalletApp',
        tab: 'income-tab',
      },
    });
  });

  test('should navigate to income tab when try again is clicked', () => {
    mockUseRoute.mockReturnValue({
      params: {
        errorCode: 'unknown error',
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<InstaPayDrawdownErrorScreen />);

    const tryAgainBtn = getByText('Try again');

    fireEvent.press(tryAgainBtn);

    expect(mockNavigateToTopTabs).toHaveBeenCalledWith('income-tab');
  });
});
