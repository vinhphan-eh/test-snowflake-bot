import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { renderHook } from '../../../../../common/utils/testing';
import { useInstapayExpBrazeCard } from '../useInstapayExpBrazeCard';

describe('useInstapayExpBrazeCard', () => {
  it('should return content card correctly if id matches', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          extras: {
            id: 'instapay_exp_tile_timesheets',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    const hook = renderHook(() => useInstapayExpBrazeCard('instapay_exp_tile_timesheets'));
    expect(hook.result.current.contentCard).not.toBeNull();
  });

  it('should return undefined if id does not match', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          id: 'any-id',
          expiresAt: 123123,
          extras: {
            randomField: 'random',
          },
        },
      ] as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    const hook = renderHook(() => useInstapayExpBrazeCard('instapay_exp_tile_timesheets'));
    expect(hook.result.current.contentCard).toBeUndefined();
  });
});
