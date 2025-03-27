import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext, useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { aMoneyV2 } from '../../../../../e2e/new-graphql/mocks/generated-mocks';
import { useToast } from '../../../../common/shared-hooks/useToast';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { mockCloseStashMutation } from '../../../../new-graphql/generated';
import { aStashItem } from '../../../../new-graphql/mocks/generated-mocks';
import type { StashDetails } from '../../hooks/useGetStashDetails';
import { useGetStashDetails } from '../../hooks/useGetStashDetails';
import { StashIndividualScreen } from '../StashIndividualScreen';

jest.mock('../../hooks/useGetStashDetails');
jest.mock('../../../../common/shared-hooks/useToast', () => ({
  useToast: jest.fn(),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseGetStashDetails = useGetStashDetails as jest.MockedFunction<typeof useGetStashDetails>;
const mockStash = aStashItem({ imageUrl: 'https://example.com/image.png', name: 'Stash Name' }) as StashDetails;
const mockStashWithoutTargetAmount = aStashItem({
  imageUrl: 'https://example.com/image.png',
  name: 'Stash Name',
  targetAmount: aMoneyV2({ units: 0 }),
}) as StashDetails;
const mockEmptyStash = aStashItem({
  name: 'Stash Name',
  imageUrl: 'https://example.com/image.png',
  balance: aMoneyV2({ units: 0 }),
}) as StashDetails;
const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;
const mockShowToast = jest.fn();

describe('StashIndividualScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        id: 'STASH_ID',
      },
      key: '',
      name: '',
    });
    mockUseGetStashDetails.mockReturnValue(mockStash);
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  it('should render properly', () => {
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    expect(getByText('Stash Name')).toBeTruthy();
  });

  it('should render properly without target amount', () => {
    mockUseGetStashDetails.mockReturnValue(mockStashWithoutTargetAmount);

    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    expect(getByText('Stash Name')).toBeTruthy();
  });

  it('should go to Stash dashboard', () => {
    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    expect(getByText('Stash Name')).toBeTruthy();
    fireEvent.press(getByTestId('topbar-back-icon'));
    expect(mockNavigateToTopTabs).toBeCalledWith('stash-tab');
  });

  it('should start adding fund flow', () => {
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    fireEvent.press(getByText('Add funds'));
    expect(mockedNavigate).toBeCalledWith('StashDepositCash', expect.anything());
  });

  it('should disabled withdraw button if balance is less than or equal to 0', () => {
    mockUseGetStashDetails.mockReturnValue(mockEmptyStash);

    const { getByTestId } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    expect(getByTestId('withdraw-stash-button')).toBeDisabled();
  });

  it('should open delete modal when delete button is presssed', async () => {
    mockUseGetStashDetails.mockReturnValue(mockEmptyStash);

    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    const closeBtn = getByTestId('close-stash-btn');
    fireEvent.press(closeBtn);

    await waitFor(() => expect(getByText('Are you sure you want to delete the Stash Name Stash?')).toBeTruthy());
  });

  it('should close stash succesfully', async () => {
    mockUseGetStashDetails.mockReturnValue(mockEmptyStash);
    mockServerNode.use(
      mockCloseStashMutation((_, res, ctx) => {
        return res(ctx.status(200), ctx.delay(100), ctx.data({}));
      })
    );

    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    const closeBtn = getByTestId('close-stash-btn');
    fireEvent.press(closeBtn);

    await waitFor(() => expect(getByText('Are you sure you want to delete the Stash Name Stash?')).toBeTruthy());
    fireEvent.press(getByText('Delete this Stash'));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalled();
      expect(mockNavigateToTopTabs).toBeCalledWith('stash-tab');
    });
  });

  it('should display error when delete stash fails', async () => {
    mockUseGetStashDetails.mockReturnValue(mockEmptyStash);
    mockServerNode.use(mockCloseStashMutation((_, res, ctx) => res(ctx.errors([{ message: 'Something went wrong' }]))));

    const { getByTestId, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <StashIndividualScreen />
      </NavigationContext.Provider>
    );

    const closeBtn = getByTestId('close-stash-btn');
    fireEvent.press(closeBtn);

    await waitFor(() => expect(getByText('Are you sure you want to delete the Stash Name Stash?')).toBeTruthy());
    fireEvent.press(getByText('Delete this Stash'));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalled();
    });
  });
});
