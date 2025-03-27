import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook, waitFor, fireEvent } from '../../../../../common/utils/testing';
import { mockUseInstapayExpBrazeCard } from '../../hooks/__mocks__/useInstapayExpBrazeCard';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { InstapayTimesheetsExperimentTile } from '../InstapayTimesheetsExperimentTile';

describe('InstapayTimesheetsExperimentTile', () => {
  const mockOpenInstaPayFlow = jest.fn();

  beforeEach(() => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: undefined,
    });

    mockUseOpenInstaPayFlowFromDashboard.mockReturnValue({
      openInstaPayFlow: mockOpenInstaPayFlow,
    });

    mockUsePureMoneyPillarPermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });
    mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      timesheetsInstapayExperiment: {
        view: true,
      },
    } as never;
  });

  it('render default content correctly when no braze card', () => {
    const { getByText } = render(<InstapayTimesheetsExperimentTile />);
    expect(getByText('Enjoy up to $1000 of your salary each week!')).toBeTruthy();
    expect(getByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeTruthy();
  });

  it('render braze content and log impression correctly when there is braze card', () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'timeSheetCard',
        extras: {
          title: 'braze title',
          description: 'braze description',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayTimesheetsExperimentTile />);
    expect(queryByText('Enjoy up to $1000 of your salary each week!')).toBeNull();
    expect(queryByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeNull();
    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();
    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('timeSheetCard');
  });

  it('on click should log correctly when there is braze card', () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'timeSheetCard',
        extras: {
          title: 'braze title',
          description: 'braze description',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayTimesheetsExperimentTile />);
    expect(queryByText('Enjoy up to $1000 of your salary each week!')).toBeNull();
    expect(queryByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeNull();
    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('timeSheetCard');
    fireEvent.press(getByText('braze title'));
    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('timeSheetCard');
  });

  it('onPress should call openInstaPayFlow', async () => {
    const { getByText } = render(<InstapayTimesheetsExperimentTile />);

    await waitFor(() => getByText('Enjoy up to $1000 of your salary each week!'));

    expect(mockedEventTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: 'user action',
        event: 'User sees Instapay education tile',
        metaData: {
          location: 'timesheets',
          module: 'InstaPay',
        },
      })
    );

    fireEvent.press(getByText('Enjoy up to $1000 of your salary each week!'));

    expect(mockOpenInstaPayFlow).toHaveBeenCalled();
    expect(mockedEventTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: 'user action',
        event: 'Click on Instapay education tile',
        metaData: {
          location: 'timesheets',
          module: 'InstaPay',
        },
      })
    );
  });

  it.each`
    timesheetsFlag | moneyPillarAccess | showInstapay | expected
    ${true}        | ${true}           | ${true}      | ${true}
    ${true}        | ${true}           | ${false}     | ${false}
    ${true}        | ${false}          | ${true}      | ${false}
    ${true}        | ${false}          | ${false}     | ${false}
    ${false}       | ${true}           | ${true}      | ${false}
    ${false}       | ${true}           | ${false}     | ${false}
    ${false}       | ${false}          | ${true}      | ${false}
    ${false}       | ${false}          | ${false}     | ${false}
  `('should work correctly', async ({ expected, moneyPillarAccess, rostersFlag, showInstapay, timesheetsFlag }) => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      rostersInstapayExperiment: {
        view: rostersFlag,
      },
      timesheetsInstapayExperiment: {
        view: timesheetsFlag,
      },
    } as never;

    mockReturnIncomeVisibility({ showInstapay, showIncomeTab: true });

    mockUsePureMoneyPillarPermission.mockReturnValue({
      permission: moneyPillarAccess,
      isFetched: true,
    });

    const { getByText, queryByText } = render(<InstapayTimesheetsExperimentTile />);

    if (expected) {
      await waitFor(() => {
        expect(getByText('Enjoy up to $1000 of your salary each week!')).toBeTruthy();
        expect(getByText('As your employer uses Swag, you have exclusive access to this perk. ')).toBeTruthy();
      });
    } else {
      expect(queryByText('Waiting for pay day?')).toBeNull();
    }
  });
});
