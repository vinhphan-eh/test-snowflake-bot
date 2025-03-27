import React, { useEffect, useRef } from 'react';
import Braze from '@braze/react-native-sdk';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { mockReturnIncomeVisibility } from '../../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUseLoadBrazeContentCards } from '../../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { mockedSwitchPillar } from '../../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { mockUsePrefetchInstapayBalance } from '../hooks/__mocks__/usePrefetchInstapayBalance';
import type { InstapayExpPopupProps, InstapayExpPopupRef } from '../InstapayExpPopup';
import { InstapayExpPopup } from '../InstapayExpPopup';
import { useInstapayExpPopupStore } from '../stores/useInstapayExpPopupStore';

const TestComponent = (props: InstapayExpPopupProps) => {
  const ref = useRef<InstapayExpPopupRef>(null);

  useEffect(() => {
    ref.current?.open('payslips');
  }, []);

  return <InstapayExpPopup ref={ref} {...props} />;
};

const TestRoster = (props: InstapayExpPopupProps) => {
  const ref = useRef<InstapayExpPopupRef>(null);

  useEffect(() => {
    ref.current?.open('rosters');
  }, []);

  return <InstapayExpPopup ref={ref} {...props} />;
};

describe('InstapayExpPopup', () => {
  const mockOpenInstaPayFlow = jest.fn();

  beforeEach(() => {
    useInstapayExpPopupStore.setState({ lastOpenedDate: undefined, hasHydrate: true });

    mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true });

    mockUsePrefetchInstapayBalance.mockReturnValue({
      hasBalance: true,
      hasZeroBalance: false,
    });

    mockUseOpenInstaPayFlowFromDashboard.mockReturnValue({
      openInstaPayFlow: mockOpenInstaPayFlow,
    });
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          id: 'card_id',
          extras: {
            id: 'instapay_exp_popup',
            actionText: 'Braze action',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
  });

  it('should call onHavingBrazeCard correctly', () => {
    const mockHavingBrazeCard = jest.fn();
    render(<TestComponent onHavingBrazeCard={mockHavingBrazeCard} />);

    expect(mockHavingBrazeCard).toHaveBeenCalledTimes(1);
  });

  it('should log impression correctly', () => {
    render(<TestComponent />);

    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('card_id');
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'User sees InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'payslips',
        module: 'InstaPay',
      },
    });
  });

  it('onPress should work correctly when has balance', () => {
    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('Braze action'));

    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('card_id');
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'payslips',
        module: 'InstaPay',
      },
    });
    expect(mockOpenInstaPayFlow).toHaveBeenCalledTimes(1);
  });

  it('onPress should work correctly when balance is zero and can see new dashboard', () => {
    mockUsePrefetchInstapayBalance.mockReturnValue({
      hasBalance: false,
      hasZeroBalance: true,
    });

    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          id: 'card_id',
          extras: {
            id: 'instapay_exp_popup_zero_balance',
            actionText: 'Braze action',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    const { getByText } = render(<TestComponent />);

    fireEvent.press(getByText('Braze action'));

    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('card_id');
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'payslips (IP balance is 0)',
        module: 'InstaPay',
      },
    });
    expect(mockedSwitchPillar).toHaveBeenCalled();
  });

  it('should open just once a day', () => {
    render(<TestComponent />);

    render(<TestComponent />);

    expect(Braze.logContentCardImpression).toHaveBeenCalledTimes(1);
  });

  describe('dynamic content: Rosters', () => {
    beforeEach(() => {
      mockUseLoadBrazeContentCards.mockReturnValue({
        cards: [
          {
            id: 'card_id',
            extras: {
              id: 'instapay_exp_popup',
              actionText: 'Braze action',
            },
          },
          {
            id: 'roster_id',
            extras: {
              id: 'instapay_exp_popup_roster',
              actionText: 'Braze action',
            },
          },
        ] as never,

        requestContentCardsRefresh: jest.fn(),
        logCustomEvent: jest.fn(),
      });
    });

    it('should log impression correctly for rosters', () => {
      render(<TestRoster />);

      expect(Braze.logContentCardImpression).toHaveBeenCalledWith('roster_id');
      expect(mockedEventTracking).toHaveBeenCalledWith({
        categoryName: 'user action',
        event: 'User sees InstaPay experiment tile in Work pillar',
        metaData: {
          feature: 'rosters',
          module: 'InstaPay',
        },
      });
    });

    it('onPress should work correctly', () => {
      const { getByText } = render(<TestRoster />);

      fireEvent.press(getByText('Braze action'));

      expect(Braze.logContentCardClicked).toHaveBeenCalledWith('roster_id');
      expect(mockedEventTracking).toHaveBeenCalledWith({
        categoryName: 'user action',
        event: 'Click on InstaPay experiment tile in Work pillar',
        metaData: {
          feature: 'rosters',
          module: 'InstaPay',
        },
      });
      expect(mockOpenInstaPayFlow).toHaveBeenCalledTimes(1);
    });

    it('onPress should work correctly when balance is zero and can see new dashboard', () => {
      mockUsePrefetchInstapayBalance.mockReturnValue({
        hasBalance: false,
        hasZeroBalance: true,
      });

      mockUseLoadBrazeContentCards.mockReturnValue({
        cards: [
          {
            id: 'card_id',
            extras: {
              id: 'instapay_exp_popup_zero_balance',
              actionText: 'Braze action',
            },
          },
          {
            id: 'roster_id',
            extras: {
              id: 'instapay_exp_popup_roster_zero_balance',
              actionText: 'Braze action',
            },
          },
        ] as never,

        requestContentCardsRefresh: jest.fn(),
        logCustomEvent: jest.fn(),
      });

      const { getByText } = render(<TestRoster />);

      fireEvent.press(getByText('Braze action'));

      expect(Braze.logContentCardClicked).toHaveBeenCalledWith('roster_id');
      expect(mockedEventTracking).toHaveBeenCalledWith({
        categoryName: 'user action',
        event: 'Click on InstaPay experiment tile in Work pillar',
        metaData: {
          feature: 'rosters (IP balance is 0)',
          module: 'InstaPay',
        },
      });
      expect(mockedSwitchPillar).toHaveBeenCalled();
    });
  });

  describe('when not under maintenance', () => {
    it('should display popup', async () => {
      render(<TestComponent />);

      // FIXME: We don't have a way to mock bottom sheet show/hide yet
      // This fix will be huge, so we should have a separate PR for this
      expect(Braze.logContentCardImpression).toHaveBeenCalledTimes(1);
    });
  });

  describe('when under maintenance', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true, instapayNowUnderMaintenance: true });
    });

    it('should not display popup', async () => {
      render(<TestComponent />);

      // FIXME: We don't have a way to mock bottom sheet show/hide yet
      // This fix will be huge, so we should have a separate PR for this
      expect(Braze.logContentCardImpression).toHaveBeenCalledTimes(0);
    });
  });
});
