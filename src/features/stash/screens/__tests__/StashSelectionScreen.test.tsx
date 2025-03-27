import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockGetStashesQuery } from '../../../../new-graphql/generated';
import { aStashItem } from '../../../../new-graphql/mocks/generated-mocks';
import { StashSelectionScreen } from '../StashSelectionScreen';

describe('StashSelectionScreen', () => {
  it('should render properly', async () => {
    mockServerNode.use(
      mockGetStashesQuery((_, res, ctx) => {
        return res(
          ctx.data({ me: { wallet: { stash: { items: [aStashItem({ name: 'name', imageUrl: 'https://a.com' })] } } } })
        );
      })
    );
    const { findByText, getByText } = render(<StashSelectionScreen />);
    expect(getByText('Where are we stashing your cash?')).toBeTruthy();
    expect(await findByText('name')).toBeTruthy();
  });

  it('should navigate Stash Deposit after clicking on card', async () => {
    mockServerNode.use(
      mockGetStashesQuery((_, res, ctx) => {
        return res(
          ctx.data({ me: { wallet: { stash: { items: [aStashItem({ name: 'name', imageUrl: 'https://a.com' })] } } } })
        );
      })
    );
    const { findByText } = render(<StashSelectionScreen />);

    fireEvent.press(await findByText('name'));
    expect(mockedNavigate).toBeCalled();
  });

  it('should navigate back to Stash dashboard if clicked on back icon', async () => {
    const { getByTestId } = render(<StashSelectionScreen />);
    const backIcon = getByTestId('topbar-back-icon');

    fireEvent.press(backIcon);

    expect(mockedGoBack).toBeCalled();
  });
});
