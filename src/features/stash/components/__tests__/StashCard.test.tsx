import React from 'react';
import { waitFor } from '@testing-library/react-native';
import { aMoneyV2 } from '../../../../../e2e/new-graphql/mocks/generated-mocks';
import { fireEvent, render } from '../../../../common/utils/testing';
import { EXAMPLE_STASH } from '../../constants';
import { StashCard } from '../StashCard';

describe('StashCard', () => {
  it('should render properly', async () => {
    const { getByTestId } = render(
      <StashCard
        onPress={jest.fn()}
        stash={{
          name: 'Holiday Stash',
          imageUrl: 'stashImage05',
          targetAmount: aMoneyV2({ units: 500 }),
          balance: aMoneyV2({ units: 17000 }),
        }}
      />
    );

    await waitFor(() => {
      expect(getByTestId(`stash-card-${EXAMPLE_STASH.name}`)).toBeTruthy();
    });
  });

  it('should trigger onPress event if user clicked on the card', async () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <StashCard
        onPress={mockOnPress}
        stash={{
          name: 'Holiday Stash',
          imageUrl: 'stashImage05',
          targetAmount: undefined,
          balance: aMoneyV2({ units: 17000 }),
        }}
        showBalance={false}
      />
    );

    const stashCard = getByTestId(`stash-card-${EXAMPLE_STASH.name}`);
    fireEvent.press(stashCard);

    await waitFor(() => {
      expect(mockOnPress).toHaveBeenCalled();
    });
  });
});
