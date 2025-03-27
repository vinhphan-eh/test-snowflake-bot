import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUsePrefetchInstapayBalance } from '../../components/instapay-exp-popup/hooks/__mocks__/usePrefetchInstapayBalance';
import { BRAZE_SUBMIT_TIMESHEET_ID } from '../../constants/braze';
import { mockUseOpenInstaPayFlowFromDashboard } from '../__mocks__/useOpenInstaPayFlowFromDashboard';
import { useInstapayExpCard } from '../useInstapayExpCard';

jest.mock('@braze/react-native-sdk', () => ({
  __esModule: true,
  default: {
    logContentCardImpression: jest.fn(),
    logContentCardClicked: jest.fn(),
    logContentCardDismissed: jest.fn(),
  },
}));
jest.mock('../../../../../common/stores/useMiniAppSwitcherStore', () => ({
  switchPillar: jest.fn(),
}));
jest.mock('../../components/instapay-exp-popup/hooks/usePrefetchInstapayBalance', () => ({
  usePrefetchInstapayBalance: jest.fn(),
}));

describe('useInstapayExpCard', () => {
  const mockOpenInstapayFlow = jest.fn();

  beforeEach(() => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          extras: {
            id: BRAZE_SUBMIT_TIMESHEET_ID,
            actionText: 'actionText',
            cancelText: 'cancelText',
          },
          image: 'image',
          imageAspectRatio: 0,
          title: 'title',
          id: 'hey',
        } as never,
      ],
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    mockUsePrefetchInstapayBalance.mockReturnValue({
      hasBalance: true,
      hasZeroBalance: false,
    });

    mockUseOpenInstaPayFlowFromDashboard.mockReturnValue({
      openInstaPayFlow: mockOpenInstapayFlow,
    });

    mockReturnIncomeVisibility({
      showIncomeTab: true,
      showInstapay: true,
      showInstapayNowUsageIncentiveV2: true,
    });
  });

  it('should track event', () => {
    renderHook(() =>
      useInstapayExpCard({
        onCancel: jest.fn(),
        onActionEffect: jest.fn(),
        feature: 'timesheets',
        brazeCardCustomId: BRAZE_SUBMIT_TIMESHEET_ID,
      })
    );

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'User sees InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'timesheets',
        module: 'InstaPay',
      },
    });
  });

  it('should log content card impression', () => {
    renderHook(() =>
      useInstapayExpCard({
        onCancel: jest.fn(),
        onActionEffect: jest.fn(),
        feature: 'timesheets',
        brazeCardCustomId: BRAZE_SUBMIT_TIMESHEET_ID,
      })
    );

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('hey');
  });

  it('should handle onClickLearnMore correctly', () => {
    const onActionEffect = jest.fn();

    const { result } = renderHook(() =>
      useInstapayExpCard({
        onCancel: jest.fn(),
        onActionEffect,
        feature: 'timesheets',
        brazeCardCustomId: BRAZE_SUBMIT_TIMESHEET_ID,
      })
    );

    result.current.onClickLearnMore();

    expect(mockOpenInstapayFlow).toHaveBeenCalled();
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'timesheets',
        module: 'InstaPay',
      },
    });
    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('hey');
    expect(onActionEffect).toHaveBeenCalled();
  });

  it('should handle onClickLearnMore correctly with balance = 0', () => {
    mockReturnIncomeVisibility({
      showIncomeTab: true,
      showInstapay: true,
      showInstapayNowUsageIncentiveV2: true,
    });
    mockUsePrefetchInstapayBalance.mockReturnValueOnce({
      hasBalance: false,
      hasZeroBalance: true,
    });

    const onActionEffect = jest.fn();

    const { result } = renderHook(() =>
      useInstapayExpCard({
        onCancel: jest.fn(),
        onActionEffect,
        feature: 'timesheets',
        brazeCardCustomId: BRAZE_SUBMIT_TIMESHEET_ID,
      })
    );

    result.current.onClickLearnMore();

    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('hey');
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'timesheets (IP balance is 0)',
        module: 'InstaPay',
      },
    });
    expect(mockOpenInstapayFlow).not.toHaveBeenCalled();
    expect(mockedSwitchPillar).toHaveBeenCalled();
  });
  it('should handle onClickMaybeLater correctly', () => {
    const onCancel = jest.fn();

    const { result } = renderHook(() =>
      useInstapayExpCard({
        onCancel,
        onActionEffect: jest.fn(),
        feature: 'timesheets',
        brazeCardCustomId: BRAZE_SUBMIT_TIMESHEET_ID,
      })
    );

    result.current.onClickMaybeLater();

    expect(Braze.logContentCardDismissed).toHaveBeenCalledWith('hey');
    expect(onCancel).toHaveBeenCalled();
  });
});
