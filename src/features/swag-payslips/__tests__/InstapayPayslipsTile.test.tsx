import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockedSwitchPillar } from '../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { fireEvent, render, waitFor } from '../../../common/utils/testing';
import { mockUseInstapayExpBrazeCard } from '../../income/instapay/hooks/__mocks__/useInstapayExpBrazeCard';
import { InstapayPayslipsTile } from '../InstapayPayslipsTile';

describe('InstapayPayslipsTile', () => {
  beforeEach(() => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: undefined,
    });
    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should track seeing tile correctly', async () => {
    const screen = render(<InstapayPayslipsTile instapayNowUnderMaintenance={false} />);

    expect(screen.getByText('Sick of waiting to get paid?')).toBeDefined();
    expect(screen.getByText('Access up to $1000 of your salary per week!')).toBeDefined();
    expect(screen.getByText('Learn more')).toBeDefined();

    expect(mockedEventTracking).toHaveBeenCalledWith({
      event: 'User sees Instapay education tile',
      categoryName: 'user action',
      metaData: {
        location: 'payslips',
        module: 'InstaPay',
      },
    });
  });

  it('should render correctly', async () => {
    const screen = render(<InstapayPayslipsTile instapayNowUnderMaintenance={false} />);

    expect(screen.getByText('Sick of waiting to get paid?')).toBeDefined();
    expect(screen.getByText('Access up to $1000 of your salary per week!')).toBeDefined();
    expect(screen.getByText('Learn more')).toBeDefined();

    fireEvent.press(screen.getByTestId('instapay-tile'));

    await waitFor(() => {
      expect(mockedSwitchPillar).toHaveBeenCalledWith({ to: { pillarId: 'WalletApp', tab: 'income-tab' } });
    });

    expect(mockedEventTracking).toHaveBeenCalledWith({
      event: 'Click on InstaPay tile in Payslips tab',
      categoryName: 'user action',
      metaData: {
        module: 'Payslips Experiment',
      },
    });
  });

  it('should show skeleton while loading', async () => {
    mockReturnIncomeVisibility({ isLoading: true });

    const screen = render(<InstapayPayslipsTile instapayNowUnderMaintenance={false} />);
    expect(screen.getByTestId('skeleton-loading')).toBeDefined();
  });

  it('should show braze content and log impression when there is content card', async () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'payslipsId',
        extras: {
          title: 'braze title',
          description: 'braze description',
          actionText: 'braze action text',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayPayslipsTile instapayNowUnderMaintenance={false} />);

    expect(queryByText('Sick of waiting to get paid?')).toBeNull();
    expect(queryByText('Access up to $1000 of your salary per week!')).toBeNull();
    expect(queryByText('Learn more')).toBeNull();

    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();
    expect(getByText('braze action text')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('payslipsId');
  });

  it('should log card click when there is braze content card ', async () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'payslipsId',
        extras: {
          title: 'braze title',
          description: 'braze description',
          actionText: 'braze action text',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayPayslipsTile instapayNowUnderMaintenance={false} />);

    expect(queryByText('Sick of waiting to get paid?')).toBeNull();
    expect(queryByText('Access up to $1000 of your salary per week!')).toBeNull();
    expect(queryByText('Learn more')).toBeNull();

    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();
    expect(getByText('braze action text')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('payslipsId');

    fireEvent.press(getByText('braze title'));
    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('payslipsId');
  });
});
