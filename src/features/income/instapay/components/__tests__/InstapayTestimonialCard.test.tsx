import React from 'react';
import Braze from '@braze/react-native-sdk';
import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { InstapayTestimonialCard } from '../InstapayTestimonialCard';

describe('InstapayTestimonialCard', () => {
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
          id: 'campaign-id',
          image: 'https://image.com/image.png',
          extras: {
            id: 'instapay_testimonial_card',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
    const { getByTestId } = render(<InstapayTestimonialCard />);

    expect(getByTestId('braze-img')).toBeTruthy();
    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('campaign-id');
  });

  it('should render nothing when not having braze', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
    const { queryByTestId } = render(<InstapayTestimonialCard />);

    expect(queryByTestId('instapay-testimonial-card')).toBeNull();
    expect(Braze.logContentCardImpression).not.toHaveBeenCalled();
  });

  it('onPress should work correctly', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          id: 'campaign-id',
          image: 'https://image.com/image.png',
          extras: {
            id: 'instapay_testimonial_card',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    const { getByTestId } = render(<InstapayTestimonialCard />);
    expect(Braze.logContentCardImpression).toHaveBeenCalledWith('campaign-id');

    fireEvent.press(getByTestId('braze-img'));

    expect(Braze.logContentCardClicked).toHaveBeenCalledWith('campaign-id');
    expect(mockOpenInstapayFlow).toHaveBeenCalledTimes(1);
  });
});
