import React from 'react';
import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { render } from '../../../../../../common/utils/testing';
import {
  useCashbackOnboardStatusQuery,
  type CashbackOnboardStatusQuery,
} from '../../../../../../new-graphql/generated';
import { useLaunchCashbackIntroduction } from '../useLaunchCashbackIntroduction';

const mockUseCashbackOnboardStatusQuery = useCashbackOnboardStatusQuery as unknown as jest.Mock<
  MockQueryResult<CashbackOnboardStatusQuery>
>;
(mockUseCashbackOnboardStatusQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useCashbackOnboardStatusQuery: jest.fn(),
}));
const mockNavigate = jest.fn();

const TestComponent = () => {
  useLaunchCashbackIntroduction(mockNavigate);
  return null;
};

describe('useLaunchCashbackIntroduction', () => {
  it('should navigate to cashback introduction screen when user is not onboarded', () => {
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: false,
            },
          },
        },
      },
      isError: false,
      isFetched: true,
    });

    render(<TestComponent />);

    expect(mockNavigate).toBeCalledTimes(1);
  });

  it('should not navigate to cashback introduction screen when user is onboarded', () => {
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: true,
            },
          },
        },
      },
      isError: false,
      isFetched: true,
    });

    render(<TestComponent />);

    expect(mockNavigate).not.toBeCalled();
  });

  it('should not navigate to cashback introduction screen when loading status', () => {
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: false,
            },
          },
        },
      },
      isError: false,
      isFetched: false,
    });

    render(<TestComponent />);

    expect(mockNavigate).not.toBeCalled();
  });

  it('should not navigate to cashback introduction screen when is error', () => {
    mockUseCashbackOnboardStatusQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            onboardStatus: {
              hasCLOOnboarded: false,
            },
          },
        },
      },
      isError: true,
      isFetched: true,
    });

    render(<TestComponent />);

    expect(mockNavigate).not.toBeCalled();
  });
});
