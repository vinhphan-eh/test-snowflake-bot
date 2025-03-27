import React from 'react';
import { mockReset, mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { useCreateStashMutation } from '../../../../new-graphql/generated';
import { EXAMPLE_STASH } from '../../constants';
import { StashConfirmationScreen } from '../StashConfirmationScreen';

const mockUseCreateStashMutation = useCreateStashMutation as jest.MockedFunction<typeof useCreateStashMutation>;

jest.mock('../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../new-graphql/generated'),
  useCreateStashMutation: jest.fn(),
}));

jest.mock('../../stores/useCreateStashStore', () => {
  return {
    useCreateStashStore: () => ({
      name: EXAMPLE_STASH.name,
      image: EXAMPLE_STASH.image,
      targetAmount: EXAMPLE_STASH.targetAmount,
    }),
  };
});

describe('StashConfirmationScreen', () => {
  beforeEach(() => {
    mockUseCreateStashMutation.mockReturnValue({
      mutateAsync: () => Promise.resolve({ createStash: true }),
      isError: false,
      isLoading: false,
    } as never);
  });

  it('should render properly', () => {
    const { getByTestId, getByText } = render(<StashConfirmationScreen />);
    expect(getByText('Confirm your Stash details')).toBeTruthy();
    expect(getByText('Create a Stash')).toBeTruthy();
    expect(getByTestId('topbar-back-icon')).toBeTruthy();

    // Expect render the Stash card properly
    expect(getByTestId(`stash-card-${EXAMPLE_STASH.name}`)).toBeTruthy();
  });

  it('should navigate back on clicked properly', async () => {
    const { getByTestId } = render(<StashConfirmationScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should navigate to success screen if create stash successfully', async () => {
    const { getByLabelText } = render(<StashConfirmationScreen />);
    const button = getByLabelText('Confirm');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'StashSuccess' }],
      });
    });
  });

  it('should navigate to error screen if failed to create stash', async () => {
    mockUseCreateStashMutation.mockReturnValue({
      mutateAsync: () => Promise.resolve({ createStash: false }),
      isError: true,
      isLoading: false,
    } as never);

    const { getByLabelText } = render(<StashConfirmationScreen />);
    const button = getByLabelText('Confirm');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'StashError' }],
      });
    });
  });
});
