import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { StashDepositSuccessScreen } from '../StashDepositSuccessScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('StashDepositSuccess', () => {
  const mockHandleInternalRatingPrompt = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();

    const store = renderHook(() => useSessionStore());
    store.result.current.handleInternalRatingPrompt = mockHandleInternalRatingPrompt;

    mockedUseRoute.mockReturnValue({
      params: {
        id: 'STASH_ID',
        amount: 100,
        name: 'name',
      },
      key: '',
      name: '',
    });
  });

  it('should render properly', () => {
    const { getByText } = render(<StashDepositSuccessScreen />);

    expect(getByText('Your cash is stashed!')).toBeTruthy();
    expect(getByText(/100/)).toBeTruthy();
  });

  it('should go to Stash details', async () => {
    const { getByText } = render(<StashDepositSuccessScreen />);
    fireEvent.press(getByText('View in Stash'));
    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('StashIndividual', expect.anything());
      expect(mockHandleInternalRatingPrompt).toBeCalledWith('stashCash');
    });
  });

  it('should go to Stash dashboard', async () => {
    const { getByText } = render(<StashDepositSuccessScreen />);
    fireEvent.press(getByText('Done'));
    await waitFor(() => {
      expect(mockNavigateToTopTabs).toBeCalledWith('stash-tab');
      expect(mockHandleInternalRatingPrompt).toBeCalledWith('stashCash');
    });
  });
});
