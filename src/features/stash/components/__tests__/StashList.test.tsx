import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { act, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockGetStashesQuery } from '../../../../new-graphql/generated';
import { aStashItem } from '../../../../new-graphql/mocks/generated-mocks';
import { StashList } from '../StashList';

const mockStash = aStashItem({ name: 'stash', imageUrl: 'stashImage05' });
const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('StashList', () => {
  it('should render properly', async () => {
    mockServerNode.use(
      mockGetStashesQuery((_, res, ctx) => {
        return res(ctx.data({ me: { wallet: { stash: { items: [mockStash] } } } }));
      })
    );
    const { findByTestId, findByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashList />
      </NavigationContext.Provider>
    );

    expect(await findByTestId('stash-card-stash')).toBeTruthy();
    expect(await findByText('Total stashed')).toBeTruthy();
  });

  it('should render properly with empty data', async () => {
    mockServerNode.use(
      mockGetStashesQuery((_, res, ctx) => {
        return res(ctx.data({ me: { wallet: { stash: { items: [] } } } }));
      })
    );
    const { findByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashList />
      </NavigationContext.Provider>
    );

    expect(await findByText("You don't have any Stash accounts")).toBeTruthy();
  });

  it('should pull to refresh data', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({});
    jest.mock('../../../../new-graphql/generated', () => ({
      useGetStashesQuery: jest
        .fn()
        .mockReturnValue({ data: { me: { wallet: { stash: { items: [] } } } }, refetch: mockRefetch }),
    }));

    const { findByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashList />
      </NavigationContext.Provider>
    );

    const scrollView = await findByTestId('stash-list');
    expect(scrollView).toBeDefined();

    const { refreshControl } = scrollView.props;
    act(() => {
      refreshControl.props.onRefresh();
    });

    // await waitFor(() => {
    //   expect(mockRefetch).toHaveBeenCalled();
    // });
  });

  it('should navigate Stash details after clicking item', async () => {
    mockServerNode.use(
      mockGetStashesQuery((_, res, ctx) => {
        return res(ctx.data({ me: { wallet: { stash: { items: [mockStash] } } } }));
      })
    );
    const { findByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashList />
      </NavigationContext.Provider>
    );

    const stashCard = await findByTestId('stash-card-stash');
    fireEvent.press(stashCard);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('StashStack', {
        screen: 'StashIndividual',
        params: { id: mockStash.id ?? '' },
      });
    });
  });
});
