import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { InstapayBannerPopup } from '../InstapayBannerPopup';

describe('InstapayBannerPopup', () => {
  const mockOpenInstapayFlow = jest.fn();
  beforeEach(() => {
    mockUseOpenInstaPayFlowFromDashboard.mockReturnValue({
      openInstaPayFlow: mockOpenInstapayFlow,
    });
  });

  it('should render correctly when having braze', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          cardDescription: 'cardDescription',
          id: 'campaign-id',
          extras: {
            id: 'instapay_abtest_banner_dashboard',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
    const { getByTestId, getByText } = render(<InstapayBannerPopup brazeCardId="instapay_abtest_banner_dashboard" />);

    expect(getByText('cardDescription')).toBeTruthy();
    expect(getByTestId('arrow-icon')).toBeTruthy();
    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('campaign-id');
  });

  it('should render nothing when not having braze', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
    const { queryByTestId } = render(<InstapayBannerPopup brazeCardId="instapay_abtest_banner_dashboard" />);

    expect(queryByTestId('instapay-banner-popup')).toBeNull();
    expect(Braze.logContentCardImpression).not.toHaveBeenCalled();
  });

  it('onPress should work correctly and log custom event', () => {
    const mockLogEvent = jest.fn();
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          cardDescription: 'cardDescription',
          id: 'campaign-id',
          extras: {
            id: 'instapay_abtest_banner_dashboard',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: mockLogEvent,
    });

    const { getByText } = render(
      <InstapayBannerPopup
        customClickEvent="click_instapay_popup_banner_at_swagdb"
        brazeCardId="instapay_abtest_banner_dashboard"
      />
    );
    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('campaign-id');

    fireEvent.press(getByText('cardDescription'));

    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('campaign-id');
    expect(mockLogEvent).toHaveBeenCalledWith('click_instapay_popup_banner_at_swagdb');
    expect(mockOpenInstapayFlow).toHaveBeenCalledTimes(1);
  });
});
