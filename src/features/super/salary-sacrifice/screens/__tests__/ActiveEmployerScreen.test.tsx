import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../../common/utils/testing';
import {
  useGetActiveSuperfundMembershipsQuery,
  useGetSuperContributionsQuery,
} from '../../../../../new-graphql/generated';
import { ActiveEmployerScreen } from '../ActiveEmployerScreen';

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetActiveSuperfundMembershipsQuery: jest.fn(),
  useGetSuperContributionsQuery: jest.fn(),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('ActiveEmployerScreen', () => {
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
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            usi: '209 051 15063003',
          },
          orgs: [
            {
              id: 190508,
              memberUuid: '1234',
              name: 'HRV',
              activeSuperfundMembership: {
                usi: '209 051 15063003',
              },
            },
            {
              id: 290508,
              memberUuid: '5678',
              name: 'Employment Hero',
              activeSuperfundMembership: {
                usi: '209 051 15063003',
              },
            },
          ],
        },
      },
    });

    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: [
            {
              membershipId: '5678',
              contributionType: 'FIXED',
              contributionValue: 1000,
              preserveAmount: 10,
              status: 'STARTED',
            },
          ],
        },
      },
    });

    const { getByTestId, getByText } = render(<ActiveEmployerScreen />);
    expect(getByText('Which income would you like to contribute from?')).toBeTruthy();
    expect(
      getByText('The employer you choose will determine who we send your salary sacrifice request to.')
    ).toBeTruthy();

    expect(getByTestId('employer-item-0')).toBeTruthy();
    expect(getByTestId('employer-item-1')).toBeTruthy();
    expect(getByText('HRV')).toBeTruthy();

    // Can't click because disabled text
    fireEvent.press(getByText('Employment Hero'));
    expect(mockedNavigate).not.toBeCalledWith();

    fireEvent.press(getByText('HRV'));
    expect(mockedNavigate).toBeCalledWith('ContributedOption', {
      title: 'Salary sacrifice',
      trackingAttributes: {
        fundName: 'Spaceship Voyager',
      },
    });
  });

  it('should renders org that have activeSuperfundMembership usi equal swagSuperfund usi ', () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            usi: '209 051 15063003',
          },
          orgs: [
            {
              id: 190508,
              memberUuid: '1234',
              name: 'HRV',
              activeSuperfundMembership: {
                usi: '209 051 15063003',
              },
            },
            {
              id: 290508,
              memberUuid: '5678',
              name: 'Employment Hero',
              activeSuperfundMembership: {
                usi: '209 051 15063003',
              },
            },
            {
              id: 290508,
              memberUuid: '5678',
              name: 'Squad HRV',
              activeSuperfundMembership: {
                usi: '109 051 15063003',
              },
            },
          ],
        },
      },
    });

    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: [
            {
              membershipId: '5678',
              contributionType: 'FIXED',
              contributionValue: 1000,
              preserveAmount: 10,
              status: 'STARTED',
            },
          ],
        },
      },
    });

    const { getAllByTestId, getByTestId, getByText, queryByText } = render(<ActiveEmployerScreen />);

    expect(getAllByTestId('employer-item-name')).toHaveLength(2);
    expect(getByTestId('employer-item-0')).toBeTruthy();
    expect(getByTestId('employer-item-1')).toBeTruthy();

    expect(getByText('HRV')).toBeTruthy();
    expect(getByText('Employment Hero')).toBeTruthy();

    expect(queryByText('Squad HRV')).toBeNull();
  });

  it('should disable submitted employer', () => {
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            usi: '209 051 15063003',
          },
          orgs: [
            {
              id: 190508,
              memberUuid: '1234',
              name: 'HRV',
              activeSuperfundMembership: {
                usi: '209 051 15063003',
              },
            },
            {
              id: 290508,
              memberUuid: '5678',
              name: 'Employment Hero',
              activeSuperfundMembership: {
                usi: '209 051 15063003',
              },
            },
          ],
        },
      },
    });

    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: [
            {
              membershipId: '5678',
              contributionType: 'FIXED',
              contributionValue: 1000,
              preserveAmount: 10,
              status: 'STARTED',
            },
          ],
        },
      },
    });

    const { getAllByTestId, getByText } = render(<ActiveEmployerScreen />);
    expect(getAllByTestId('employer-item-name')).toHaveLength(2);
    expect(getByText('HRV')).toBeTruthy();
    expect(getByText('Employment Hero')).toBeTruthy();

    // Can't click because disabled text
    fireEvent.press(getByText('Employment Hero'));
    expect(mockedNavigate).not.toBeCalledWith();
  });
});
