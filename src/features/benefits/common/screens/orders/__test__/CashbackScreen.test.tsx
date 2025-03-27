import React from 'react';
import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { render } from '../../../../../../common/utils/testing';
import {
  useGetWalletStatusQuery,
  type GetWalletStatusQuery,
  WalletSetupStatus,
} from '../../../../../../new-graphql/generated';
import { CashbackTab } from '../CashbackTab';

const mockUseGetWalletStatusQuery = useGetWalletStatusQuery as unknown as jest.Mock<
  MockQueryResult<GetWalletStatusQuery>
>;

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useGetWalletStatusQuery: jest.fn(),
}));

describe('CashbackScreen', () => {
  it('Should render properly for not onboarded user', () => {
    mockUseGetWalletStatusQuery.mockReturnValue({
      data: {
        me: {
          wallet: {
            details: {
              setupStatus: {
                status: WalletSetupStatus.None,
              },
            },
          },
        } as never,
      },
      isError: false,
      isLoading: false,
    });

    const { getByText } = render(<CashbackTab />);

    expect(getByText('Lifetime cashback')).toBeTruthy();
    expect(getByText('Cashback history')).toBeTruthy();
    expect(getByText('Coming your way')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
  });

  it('Should render correctly for onboarded user', () => {
    mockUseGetWalletStatusQuery.mockReturnValue({
      data: {
        me: {
          wallet: {
            details: {
              setupStatus: {
                status: WalletSetupStatus.Completed,
              },
            },
          },
        } as never,
      },
      isError: false,
      isLoading: false,
    });

    const { getByText } = render(<CashbackTab />);

    expect(getByText('Lifetime cashback')).toBeTruthy();
    expect(getByText('Cashback history')).toBeTruthy();
    expect(getByText('Coming your way')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
    expect(getByText('Settled')).toBeTruthy();
    expect(getByText('Paid to your Account')).toBeTruthy();
  });
});
