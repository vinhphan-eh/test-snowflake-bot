import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../common/types/react-query';
import { waitFor, render, fireEvent } from '../../../../common/utils/testing';
import type { GetSwagSuperfundAndSuperContributionQuery } from '../../../../new-graphql/generated';
import {
  useCreateSwagSuperfundMutation,
  useGetSwagSuperfundAndSuperContributionQuery,
} from '../../../../new-graphql/generated';
import { aSwagSuperfund } from '../../../../new-graphql/mocks/generated-mocks';
import { SuperDetailConfirmScreen } from '../SuperDetailConfirmScreen';

jest.mock('../../../../new-graphql/generated', () => ({
  useCreateSwagSuperfundMutation: jest.fn(),
  useGetSwagSuperfundAndSuperContributionQuery: jest.fn(),
}));
jest.mock('../../../../common/stores/useSessionStore');

const mockUseGetSwagSuperfundAndSuperContributionQuery =
  useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock<
    MockQueryResult<GetSwagSuperfundAndSuperContributionQuery>
  >;
(mockUseGetSwagSuperfundAndSuperContributionQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('SuperDetailConfirmScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseRoute.mockReturnValue({
      params: {
        title: 'Superannuation Details',
        membership: {
          memberNumber: '32784928',
          fundType: 'Regulated',
          fundName: 'Aware Super',
          abn: '6090511506',
          usi: '60905115063003',
        },
      },
      key: '',
      name: '',
    });
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should renders correctly', () => {
    (useCreateSwagSuperfundMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => aSwagSuperfund(),
    });

    const { getByText } = render(<SuperDetailConfirmScreen />);

    expect(getByText('Fund name')).toBeTruthy();
    expect(getByText('Member number')).toBeTruthy();
    expect(getByText('ABN')).toBeTruthy();
    expect(getByText('USI')).toBeTruthy();
    expect(getByText('Aware Super')).toBeTruthy();
    expect(getByText('32784928')).toBeTruthy();
    expect(getByText('6090511506')).toBeTruthy();
    expect(getByText('Regulated')).toBeTruthy();
    expect(getByText('60905115063003')).toBeTruthy();
  });

  it('should navigates to complete screen if mutation success', async () => {
    (useCreateSwagSuperfundMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => aSwagSuperfund(),
    });

    const { getByLabelText } = render(<SuperDetailConfirmScreen />);

    const confirmButton = getByLabelText('Confirm');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('SuperComplete', {
        trackingAttributes: {
          fundName: 'Aware Super',
          usi: '60905115063003',
        },
      });
    });
  });

  it('should navigates to failed screen if mutation failed', async () => {
    (useCreateSwagSuperfundMutation as jest.Mock).mockReturnValue({
      mutateAsync: undefined,
    });

    const { getByLabelText } = render(<SuperDetailConfirmScreen />);

    const confirmButton = getByLabelText('Confirm');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('SuperConfirmFailed', {
        errorMessage: 'createSwagSuperfund is not a function',
        trackingAttributes: {
          fundName: 'Aware Super',
          usi: '60905115063003',
          resync: false,
        },
      });
    });
  });

  it('should navigate and pass correct error params without rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });

    (useCreateSwagSuperfundMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => {
        throw new Error('');
      },
    });

    const { getByLabelText } = render(<SuperDetailConfirmScreen />);

    const confirmButton = getByLabelText('Confirm');
    fireEvent.press(confirmButton);

    expect(mockedNavigate).toHaveBeenCalledWith('SuperConfirmFailed', {
      errorMessage: 'failed to create Swag superfund',
      trackingAttributes: {
        fundName: 'Aware Super',
        usi: '60905115063003',
        resync: false,
      },
    });
  });

  it('should navigate and pass correct error params with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    (useCreateSwagSuperfundMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => {
        throw new Error('');
      },
    });

    const { getByLabelText } = render(<SuperDetailConfirmScreen />);

    const confirmButton = getByLabelText('Confirm');
    fireEvent.press(confirmButton);

    expect(mockedNavigate).toHaveBeenCalledWith('SuperConfirmFailed', {
      errorMessage: 'failed to create Employment Hero superfund',
      trackingAttributes: {
        fundName: 'Aware Super',
        usi: '60905115063003',
        resync: false,
      },
    });
  });
});
