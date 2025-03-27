import React from 'react';
import { mockReset } from '../../../../../__mocks__/react-navigation';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockGetStashesQuery } from '../../../../new-graphql/generated';
import { EXAMPLE_STASH, EXAMPLE_STASH_CREATED } from '../../constants';
import { convertStashToStashDetails } from '../../hooks/useGetStashDetails';
import { StashSuccessScreen } from '../StashSuccessScreen';

jest.mock('../../stores/useCreateStashStore', () => {
  return {
    useCreateStashStore: () => ({
      ...EXAMPLE_STASH,
      resetData: jest.fn(),
    }),
  };
});

const mockHandleInternalRatingPrompt = jest.fn();

describe('StashSuccessScreen', () => {
  describe('retrieved Stash ID successfully', () => {
    beforeEach(() => {
      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.handleInternalRatingPrompt = mockHandleInternalRatingPrompt;

      mockServerNode.use(
        mockGetStashesQuery((_, res, ctx) =>
          res(ctx.data({ me: { wallet: { stash: { items: [EXAMPLE_STASH_CREATED] } } } }))
        )
      );
    });

    it('should render properly', async () => {
      const { getByTestId, getByText } = render(<StashSuccessScreen />);

      await waitFor(() => {
        expect(getByText('Stash created')).toBeTruthy();
        expect(getByTestId(`stashSuccess-message`)).toBeTruthy();
        expect(getByText('Stash some cash')).toBeTruthy();
        expect(getByText('Not now')).toBeTruthy();
      });
    });

    it('should navigate to Stash individual page if clicking on Not now', async () => {
      const { getByText } = render(<StashSuccessScreen />);

      await waitFor(() => {
        const buttonNotNow = getByText('Not now');

        fireEvent.press(buttonNotNow);

        expect(mockHandleInternalRatingPrompt).toBeCalledWith('stashCash');
        expect(mockReset).toHaveBeenCalledWith({
          index: 0,
          routes: [{ name: 'StashIndividual', params: { id: 'stashId' } }],
        });
      });
    });

    it('should navigate to Stash some cash flow if clicking on Stash some cash', async () => {
      const { getByText } = render(<StashSuccessScreen />);

      await waitFor(() => {
        const buttonStashSomeCash = getByText('Stash some cash');

        fireEvent.press(buttonStashSomeCash);

        expect(mockReset).toHaveBeenCalledWith({
          index: 0,
          routes: [{ name: 'StashDepositCash', params: { stash: convertStashToStashDetails(EXAMPLE_STASH_CREATED) } }],
        });
      });
    });
  });
});
