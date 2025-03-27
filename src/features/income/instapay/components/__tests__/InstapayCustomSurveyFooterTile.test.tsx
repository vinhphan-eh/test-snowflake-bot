import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render, renderHook, waitFor, fireEvent } from '../../../../../common/utils/testing';
import { mockUseInstapayExpBrazeCard } from '../../hooks/__mocks__/useInstapayExpBrazeCard';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { InstapayCustomSurveyFooterTile } from '../InstapayCustomSurveyFooterTile';

describe('InstapayExperimentTile', () => {
  const mockOpenInstaPayFlow = jest.fn();

  beforeEach(() => {
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
      customSurveyInstapayExperiment: {
        view: true,
      },
    } as never;

    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: undefined,
    });
  });

  it('render default content correctly when no braze card', () => {
    const { getByText } = render(<InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => {}} />);
    expect(getByText('Enjoy up to $1000 of your salary each week!')).toBeTruthy();
    expect(getByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeTruthy();
    expect(getByText('Learn more')).toBeTruthy();
    expect(getByText('Maybe later')).toBeTruthy();
  });

  it('render braze content and log impression correctly when there is braze card and before seen', () => {
    mockUseInstapayExpBrazeCard.mockReturnValue({
      contentCard: {
        id: 'customSurveyId',
        extras: {
          title: 'braze title',
          description: 'braze description',
          actionTextBeforeSeen: 'braze before action text',
          actionTextAfterSeen: 'braze after action text',
          dismissText: 'braze dismiss text',
        },
      } as never,
    });

    const { getByText, queryByText } = render(<InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => {}} />);
    expect(queryByText('Enjoy up to $1000 of your salary each week!')).toBeNull();
    expect(queryByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeNull();
    expect(queryByText('Learn more')).toBeNull();
    expect(queryByText('Maybe later')).toBeNull();

    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();
    expect(getByText('braze before action text')).toBeTruthy();
    expect(getByText('braze dismiss text')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('customSurveyId');
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

    const { getByText, queryByText } = render(<InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => {}} />);
    expect(queryByText('Enjoy up to $1000 of your salary each week!')).toBeNull();
    expect(queryByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeNull();
    expect(getByText('braze title')).toBeTruthy();
    expect(getByText('braze description')).toBeTruthy();

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('rostersCard');
    fireEvent.press(getByText('Learn more'));
    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('rostersCard');
  });

  it('should call openInstaPayFlow when press learn more', async () => {
    const { getByText } = render(<InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => {}} />);

    await waitFor(() => {
      expect(getByText('Learn more')).toBeTruthy();
      fireEvent.press(getByText('Learn more'));
    });

    expect(mockedEventTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: 'user action',
        event: 'User sees Instapay education tile',
        metaData: {
          location: 'customSurvey',
          module: 'InstaPay',
        },
      })
    );

    expect(mockOpenInstaPayFlow).toHaveBeenCalled();
    expect(mockedEventTracking).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: 'user action',
        event: 'Click on Instapay education tile',
        metaData: {
          location: 'customSurvey',
          module: 'InstaPay',
        },
      })
    );
  });

  it.each`
    customSurveyFlag | moneyPillarAccess | showInstapay | expected
    ${true}          | ${true}           | ${true}      | ${true}
    ${true}          | ${true}           | ${false}     | ${false}
    ${true}          | ${false}          | ${true}      | ${false}
    ${true}          | ${false}          | ${false}     | ${false}
    ${false}         | ${true}           | ${true}      | ${false}
    ${false}         | ${true}           | ${false}     | ${false}
    ${false}         | ${false}          | ${true}      | ${false}
  `(
    'should work correctly $customSurveyFlag $moneyPillarAccess $showInstapay ',
    async ({ customSurveyFlag, expected, moneyPillarAccess, showInstapay }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        customSurveyInstapayExperiment: {
          view: customSurveyFlag,
        },
      } as never;

      mockReturnIncomeVisibility({ showInstapay, showIncomeTab: true });

      mockUsePureMoneyPillarPermission.mockReturnValue({
        permission: moneyPillarAccess,
        isFetched: true,
      });

      const { getByTestId, getByText, queryByText } = render(
        <InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => {}} />
      );

      if (expected) {
        await waitFor(() => {
          expect(getByTestId('instapay-experiment-tile')).toBeTruthy();
          expect(getByText('Learn more')).toBeTruthy();
          expect(getByText('Enjoy up to $1000 of your salary each week!')).toBeTruthy();
          expect(getByText('As your employer uses Swag, you have exclusive access to this perk.')).toBeTruthy();
          expect(getByText('Learn more')).toBeTruthy();
          expect(getByText('Maybe later')).toBeTruthy();
        });
      } else {
        expect(queryByText('Got it')).toBeTruthy();
      }
    }
  );

  it('should call to closeSuccessSurveyModal when press to Maybe later', async () => {
    const closeSuccessSurveyModal = jest.fn();

    const { getByText } = render(
      <InstapayCustomSurveyFooterTile closeSuccessSurveyModal={() => closeSuccessSurveyModal()} />
    );

    await waitFor(() => {
      expect(getByText('Maybe later')).toBeTruthy();
      fireEvent.press(getByText('Maybe later'));
    });

    expect(closeSuccessSurveyModal).toHaveBeenCalled();
  });
});
