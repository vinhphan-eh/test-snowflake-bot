import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../../common/utils/testing';
import {
  useGetSuperContributionsQuery,
  useStopContributionByContributionIdMutation,
} from '../../../../../new-graphql/generated';
import { MockGetSuperContributions } from '../../../../../new-graphql/handlers/custom-mock/superContributions';
import { aSuperContribution } from '../../../../../new-graphql/mocks/generated-mocks';
import { ManageContributionsScreen } from '../ManageContributionsScreen';

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetSuperContributionsQuery: jest.fn(),
  useStopContributionByContributionIdMutation: jest.fn(),
  SuperContributionType: {
    Fixed: 'FIXED',
    Percentage: 'PERCENTAGE',
  },
  SuperContributionStatus: {
    Initial: 'INITIAL',
    Started: 'STARTED',
    Stopped: 'STOPPED',
    Stopping: 'STOPPING',
  },
}));
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('ManageContributionsScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        trackingAttributes: {
          fundName: 'Spaceship Voyager',
        },
      },
      key: '',
      name: '',
    });
  });
  it('should renders and behaves correctly', () => {
    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: [...MockGetSuperContributions],
        },
      },
    });

    (useStopContributionByContributionIdMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => aSuperContribution(),
    });

    const { getByTestId, getByText } = render(<ManageContributionsScreen />);

    expect(getByText('Manage contributions')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
    expect(getByText('Archived')).toBeTruthy();

    fireEvent.press(getByTestId('request-contribution-fab'));

    expect(mockedNavigate).toBeCalledWith('SuperStack', {
      screen: 'SalarySacrificeStack',
      params: {
        screen: 'SalarySacrificeIntro',
        params: {
          trackingAttributes: {
            fundName: 'Spaceship Voyager',
          },
        },
      },
    });
  });
});
