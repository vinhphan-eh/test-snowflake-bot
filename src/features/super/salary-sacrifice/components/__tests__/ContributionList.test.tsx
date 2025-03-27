import React from 'react';
import { render } from '../../../../../common/utils/testing';
import {
  useGetSuperContributionsQuery,
  useStopContributionByContributionIdMutation,
} from '../../../../../new-graphql/generated';
import { MockGetSuperContributions } from '../../../../../new-graphql/handlers/custom-mock/superContributions';
import { aSuperContribution } from '../../../../../new-graphql/mocks/generated-mocks';
import { STARTED } from '../../constants';
import ContributionList, { getEmployerName, getFilteredStatuses } from '../ContributionList';

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

describe('ContributionList', () => {
  it('should renders correctly', () => {
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

    const { getAllByText } = render(<ContributionList tabKey="active" status={STARTED} />);
    expect(getAllByText('Contribution amount')).toHaveLength(6);
    expect(getAllByText('Stop my contribution')).toHaveLength(6);
  });

  it('should renders no contribution found logo', () => {
    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: null,
        },
      },
    });

    (useStopContributionByContributionIdMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => aSuperContribution(),
    });

    const { getByText } = render(<ContributionList tabKey="active" status={STARTED} />);
    expect(getByText("You don't have any active contributions")).toBeTruthy();
    expect(getByText('Add a contribution to get started')).toBeTruthy();
  });
});

describe('getFilteredStatuses', () => {
  it.each`
    tab           | expectedResult
    ${'pending'}  | ${['INITIAL', 'STOPPING']}
    ${'archived'} | ${['STOPPED']}
    ${'active'}   | ${['STARTED']}
    ${'abcd'}     | ${['STARTED']}
    ${''}         | ${['STARTED']}
  `('should returns correctly when tab is $tab', ({ expectedResult, tab }) => {
    expect(getFilteredStatuses(tab)).toEqual(expectedResult);
  });
});

describe('getEmployerName', () => {
  it.each`
    orgs                                     | memberUuid | expectedResult
    ${[{ memberUuid: '', name: 'HRV' }]}     | ${'1234'}  | ${''}
    ${[{ memberUuid: '1234', name: 'HRV' }]} | ${''}      | ${''}
    ${[]}                                    | ${'1234'}  | ${''}
    ${[{ memberUuid: '1234', name: 'HRV' }]} | ${'5678'}  | ${''}
    ${[{ memberUuid: '1234', name: 'HRV' }]} | ${'1234'}  | ${'HRV'}
  `('should returns correctly when memberUuid is $memberUuid', ({ expectedResult, memberUuid, orgs }) => {
    expect(getEmployerName(orgs, memberUuid)).toEqual(expectedResult);
  });
});
