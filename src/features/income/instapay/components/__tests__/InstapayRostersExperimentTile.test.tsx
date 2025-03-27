import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook, waitFor, fireEvent } from '../../../../../common/utils/testing';
import { mockUseInstapayExpBrazeCard } from '../../hooks/__mocks__/useInstapayExpBrazeCard';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { InstapayRostersExperimentTile } from '../InstapayRostersExperimentTile';

describe('InstapayRostersExperimentTile', () => {
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
    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay: true });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      rostersInstapayExperiment: {
        view: true,
      },
    } as never;
  });

  it('render default content correctly when no braze card', () => {
    const { getByText } = render(<InstapayRostersExperimentTile />);
    expect(getByText('Just submitted your roster?')).toBeTruthy();
    expect(getByText('Access up to $1000 of your salary ahead of pay day!')).toBeTruthy();
    expect(getByText('Learn more')).toBeTruthy();
  });

  it('render braze content and log impression correctly when there is braze card and before seen', () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'rostersCard',
        extras: {
          title: 'braze title',
          description: 'braze description',
          actionTextBeforeSeen: 'braze before action text',
          actionTextAfterSeen: 'braze after action text',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayRostersExperimentTile />);
    expect(queryByText('Just submitted your roster?')).toBeNull();
    expect(queryByText('Access up to $1000 of your salary ahead of pay day!')).toBeNull();
    expect(queryByText('Learn more')).toBeNull();

    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();
    expect(getByText('braze before action text')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('rostersCard');
  });

  it('on click should log correctly when there is braze card', () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'rostersCard',
        extras: {
          title: 'braze title',
          description: 'braze description',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayRostersExperimentTile />);
    expect(queryByText('Just submitted your roster?')).toBeNull();
    expect(queryByText('Access up to $1000 of your salary ahead of pay day!')).toBeNull();
    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('rostersCard');
    fireEvent.press(getByText('braze title'));
    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('rostersCard');
  });

  it('onPress should call openInstaPayFlow', async () => {
    const { getByText } = render(<InstapayRostersExperimentTile />);

    await waitFor(() => getByText('Just submitted your roster?'));

    expect(mockedEventTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: 'user action',
        event: 'User sees Instapay education tile',
        metaData: {
          location: 'rosters',
          module: 'InstaPay',
        },
      })
    );

    fireEvent.press(getByText('Just submitted your roster?'));

    expect(mockOpenInstaPayFlow).toHaveBeenCalled();
    expect(mockedEventTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: 'user action',
        event: 'Click on Instapay education tile',
        metaData: {
          location: 'rosters',
          module: 'InstaPay',
        },
      })
    );
  });

  it.each`
    rostersFlag | moneyPillarAccess | showInstapay | expected
    ${true}     | ${true}           | ${true}      | ${true}
    ${true}     | ${true}           | ${false}     | ${false}
    ${true}     | ${false}          | ${true}      | ${false}
    ${true}     | ${false}          | ${false}     | ${false}
    ${false}    | ${true}           | ${false}     | ${false}
    ${false}    | ${true}           | ${true}      | ${false}
    ${false}    | ${false}          | ${false}     | ${false}
    ${false}    | ${false}          | ${true}      | ${false}
  `('should work correctly', async ({ expected, moneyPillarAccess, rostersFlag, showInstapay }) => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      rostersInstapayExperiment: {
        view: rostersFlag,
      },
    } as never;

    mockReturnIncomeVisibility({ showIncomeTab: true, showInstapay });

    mockUsePureMoneyPillarPermission.mockReturnValue({
      permission: moneyPillarAccess,
      isFetched: true,
    });

    const { getByTestId, getByText, queryByText } = render(<InstapayRostersExperimentTile />);

    if (expected) {
      await waitFor(() => {
        expect(getByTestId('instapay-roster-tile-img')).toBeTruthy();
        expect(getByText('Just submitted your roster?')).toBeTruthy();
        expect(getByText('Access up to $1000 of your salary ahead of pay day!')).toBeTruthy();
        expect(getByText('Learn more')).toBeTruthy();
      });
    } else {
      expect(queryByText('Waiting for pay day?')).toBeNull();
    }
  });
});
