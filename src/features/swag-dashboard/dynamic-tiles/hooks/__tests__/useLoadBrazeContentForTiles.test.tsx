import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { renderHook, waitFor } from '../../../../../common/utils/testing';
import {
  IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID,
  IP_NOW_SWAG_TILE_ID,
  RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
  RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
} from '../../../../income/instapay/constants/braze';
import { getBrazeCustomId, useLoadBrazeContentForTiles } from '../useLoadBrazeContentForTiles';

jest.mock('../../../../../common/hooks/useLoadBrazeContentCards', () => ({
  useLoadBrazeContentCards: jest.fn(),
}));

describe('useLoadBrazeContentForTiles', () => {
  beforeEach(() => {
    const cards = [
      {
        id: 'braze-card-id-1',
        extras: {
          id: RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
          prefixText: 'You have',
          amountType: 'scheduled',
          postfixText: 'available',
          textColor: 'inverted',
        },
      },
      {
        id: 'braze-card-id-2',
        image: 'image.url',
        extras: {
          id: RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
          textColor: 'inverted',
        },
      },
    ];
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: cards as never,
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return registered campaign for recurring setup', async () => {
    const { result } = renderHook(() => useLoadBrazeContentForTiles({ isRecurringSetUp: true }));

    await waitFor(() => {
      expect(result.current).toEqual({
        cardId: 'braze-card-id-1',
        image: undefined,
        extras: {
          prefixText: 'You have',
          amountType: 'scheduled',
          postfixText: 'available',
          textColor: 'inverted',
        },
      });
    });
  });

  it('should return not registered campaign for non-recurring setup', async () => {
    const { result } = renderHook(() => useLoadBrazeContentForTiles({ isRecurringSetUp: false }));

    await waitFor(() => {
      expect(result.current).toEqual({
        cardId: 'braze-card-id-2',
        image: 'image.url',
        extras: {
          textColor: 'inverted',
        },
      });
    });
  });

  it('should return null when no matching card is found', async () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [],
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
    const { result } = renderHook(() => useLoadBrazeContentForTiles());

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });
});

describe('getBrazeCustomId', () => {
  test.each`
    isIpNowTile | validIpNow | isRecurringSetUp | expected                                     | description
    ${true}     | ${true}    | ${false}         | ${IP_NOW_SWAG_TILE_ID}                       | ${'User eligible to IP Now'}
    ${true}     | ${false}   | ${false}         | ${IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID}         | ${'User ineligible to IP Now'}
    ${false}    | ${false}   | ${true}          | ${RECURRING_SWAG_TILE_FOR_REGISTERED_ID}     | ${'Recurring is set up'}
    ${false}    | ${false}   | ${false}         | ${RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID} | ${'Recurring is not set up'}
  `('should return $expected when $description', ({ expected, isIpNowTile, isRecurringSetUp, validIpNow }) => {
    expect(getBrazeCustomId({ isIpNowTile, validIpNow, isRecurringSetUp })).toBe(expected);
  });
});
