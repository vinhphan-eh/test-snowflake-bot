import React from 'react';
import type { MockMutation, MockQueryResult } from '../../../../../../common/types/react-query';
import { render, waitFor } from '../../../../../../common/utils/testing';
import {
  CashbackAutoEnrolStatus,
  CashbackBankLinkedStatus,
  useCashbackUpdateAutoEnrolMutation,
  useCashbackUserInfoQuery,
  type CashbackUserInfoQuery,
} from '../../../../../../new-graphql/generated';
import { mockUseCashbackPermission } from '../../../../common/hooks/__mocks__/useCashbackPermission';
import { mockUseCheckCompletelyOnboardCashback } from '../../../hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { useAutoEnrolHeroWallet } from '../useAutoEnrolHeroWallet';
import { useCheckAutoEnrollment } from '../useCheckAutoEnrollment';

const mockUseAutoEnrolHeroWallet = useAutoEnrolHeroWallet as jest.MockedFunction<typeof useAutoEnrolHeroWallet>;
const mockUseCashbackUpdateAutoEnrolMutation = useCashbackUpdateAutoEnrolMutation as unknown as jest.Mock<MockMutation>;
const mockUseCashbackUserInfoQuery = useCashbackUserInfoQuery as unknown as jest.Mock<
  MockQueryResult<CashbackUserInfoQuery>
>;
(mockUseCashbackUserInfoQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../useAutoEnrolHeroWallet');
jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useCashbackUpdateAutoEnrolMutation: jest.fn(),
  useCashbackUserInfoQuery: jest.fn(),
}));

const TestComponent = ({ shouldDeregisterOldCard }: { shouldDeregisterOldCard: boolean }) => {
  useCheckAutoEnrollment({
    shouldDeregisterOldCard,
    runInBackground: true,
  });
  return null;
};

describe('useCheckAutoEnrollment', () => {
  const mockAutoEnrol = jest.fn();
  const mockUpdateAutoEnrolStatus = jest.fn();

  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isFetched: true,
      isLoading: false,
    });

    mockUseAutoEnrolHeroWallet.mockReturnValue({
      autoEnrolCard: mockAutoEnrol,
      isPreparingData: false,
      isLoading: false,
    });

    mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
      mutateAsync: mockUpdateAutoEnrolStatus,
    });
    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              __typename: 'CashbackUserInfo',
              autoEnrolStatus: CashbackAutoEnrolStatus.Success,
              createdAt: '',
              updatedAt: '',
              autoEnrolMessage: '',
            },
          },
        },
      },
    });
  });

  it.each`
    isPreparingData | enrolStatus                        | bankStatus                          | completedOnboardAndAcceptedTnc | expected
    ${false}        | ${CashbackAutoEnrolStatus.Failed}  | ${CashbackBankLinkedStatus.Success} | ${true}                        | ${true}
    ${true}         | ${CashbackAutoEnrolStatus.Failed}  | ${CashbackBankLinkedStatus.Success} | ${true}                        | ${false}
    ${false}        | ${CashbackAutoEnrolStatus.Failed}  | ${CashbackBankLinkedStatus.Success} | ${false}                       | ${false}
    ${false}        | ${CashbackAutoEnrolStatus.Unknown} | ${CashbackBankLinkedStatus.Success} | ${true}                        | ${true}
    ${true}         | ${CashbackAutoEnrolStatus.Unknown} | ${CashbackBankLinkedStatus.Success} | ${true}                        | ${false}
    ${false}        | ${CashbackAutoEnrolStatus.Unknown} | ${CashbackBankLinkedStatus.Success} | ${false}                       | ${false}
    ${false}        | ${CashbackAutoEnrolStatus.Success} | ${CashbackBankLinkedStatus.Success} | ${true}                        | ${false}
    ${true}         | ${CashbackAutoEnrolStatus.Success} | ${CashbackBankLinkedStatus.Success} | ${true}                        | ${false}
    ${false}        | ${CashbackAutoEnrolStatus.Success} | ${CashbackBankLinkedStatus.Failed}  | ${true}                        | ${true}
  `(
    'should work correctly',
    ({ bankStatus, completedOnboardAndAcceptedTnc, enrolStatus, expected, isPreparingData }) => {
      mockUseAutoEnrolHeroWallet.mockReturnValue({
        autoEnrolCard: mockAutoEnrol,
        isPreparingData,
        isLoading: false,
      });

      mockUseCheckCompletelyOnboardCashback.mockReturnValue({
        isCompleted: completedOnboardAndAcceptedTnc,
        isLoading: false,
        isError: false,
        isFetched: true,
      });

      mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
        mutateAsync: mockUpdateAutoEnrolStatus,
      });
      mockUseCashbackUserInfoQuery.mockReturnValue({
        data: {
          me: {
            cashback: {
              cashbackUserInfo: {
                __typename: 'CashbackUserInfo',
                autoEnrolStatus: enrolStatus,
                createdAt: '',
                updatedAt: '',
                autoEnrolMessage: '',
                bankLinkedStatus: bankStatus,
              },
            },
          },
        },
      });

      render(<TestComponent shouldDeregisterOldCard={false} />);

      if (expected) {
        expect(mockAutoEnrol).toBeCalled();
      } else {
        expect(mockAutoEnrol).not.toBeCalled();
      }
    }
  );

  it('should trigger auto enrol when deregister old card, even status is true', () => {
    mockUseAutoEnrolHeroWallet.mockReturnValue({
      autoEnrolCard: mockAutoEnrol,
      isPreparingData: false,
      isLoading: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isError: false,
      isFetched: true,
    });

    mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
      mutateAsync: mockUpdateAutoEnrolStatus,
    });
    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              __typename: 'CashbackUserInfo',
              autoEnrolStatus: CashbackAutoEnrolStatus.Success,
              createdAt: '',
              updatedAt: '',
              autoEnrolMessage: '',
            },
          },
        },
      },
    });

    render(<TestComponent shouldDeregisterOldCard />);

    expect(mockAutoEnrol).toBeCalled();
  });

  it('should update auto enrol status correctly when auto enrol status is failed', () => {
    mockUseAutoEnrolHeroWallet.mockReturnValue({
      autoEnrolCard: jest.fn(() => {
        throw new Error('failed to enrol');
      }),
      isPreparingData: false,
      isLoading: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isError: false,
      isFetched: true,
    });

    mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
      mutateAsync: mockUpdateAutoEnrolStatus,
    });
    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              __typename: 'CashbackUserInfo',
              autoEnrolStatus: CashbackAutoEnrolStatus.Unknown,
              createdAt: '',
              updatedAt: '',
              autoEnrolMessage: '',
            },
          },
        },
      },
    });

    render(<TestComponent shouldDeregisterOldCard />);

    expect(mockUpdateAutoEnrolStatus).toBeCalledWith({
      updateAutoEnrolment: { message: 'failed to enrol', status: false },
    });
  });

  it('should not update auto enrol status correctly when failing with the same reason as previous', () => {
    mockUseAutoEnrolHeroWallet.mockReturnValue({
      autoEnrolCard: jest.fn(() => {
        throw new Error('ENROLL_FAILED');
      }),
      isPreparingData: false,
      isLoading: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isError: false,
      isFetched: true,
    });

    mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
      mutateAsync: mockUpdateAutoEnrolStatus,
    });
    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              __typename: 'CashbackUserInfo',
              autoEnrolStatus: CashbackAutoEnrolStatus.Failed,
              createdAt: '',
              updatedAt: '',
              autoEnrolMessage: 'ENROLL_FAILED',
            },
          },
        },
      },
    });

    render(<TestComponent shouldDeregisterOldCard />);

    expect(mockUpdateAutoEnrolStatus).not.toBeCalledWith({
      updateAutoEnrolment: { message: 'ENROLL_FAILED', status: false },
    });
  });

  it('should update auto enrol status correctly when auto enrol status is success and deregister the old one', async () => {
    mockUseAutoEnrolHeroWallet.mockReturnValue({
      autoEnrolCard: jest.fn(() => Promise.resolve()),
      isPreparingData: false,
      isLoading: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isError: false,
      isFetched: true,
    });

    mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
      mutateAsync: mockUpdateAutoEnrolStatus,
    });
    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              __typename: 'CashbackUserInfo',
              autoEnrolStatus: CashbackAutoEnrolStatus.Unknown,
              createdAt: '',
              updatedAt: '',
              autoEnrolMessage: '',
            },
          },
        },
      },
    });

    render(<TestComponent shouldDeregisterOldCard />);

    await waitFor(() => {
      expect(mockUpdateAutoEnrolStatus).toBeCalledWith({
        updateAutoEnrolment: { message: 'RE_ENROLLED_TO_NEW_SWAG_CARD', status: true },
      });
    });
  });

  it('should update auto enrol status correctly when auto enrol status is success', async () => {
    mockUseAutoEnrolHeroWallet.mockReturnValue({
      autoEnrolCard: jest.fn(() => Promise.resolve()),
      isPreparingData: false,
      isLoading: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: true,
      isLoading: false,
      isError: false,
      isFetched: true,
    });

    mockUseCashbackUpdateAutoEnrolMutation.mockReturnValue({
      mutateAsync: mockUpdateAutoEnrolStatus,
    });
    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              __typename: 'CashbackUserInfo',
              autoEnrolStatus: CashbackAutoEnrolStatus.Unknown,
              createdAt: '',
              updatedAt: '',
              autoEnrolMessage: '',
            },
          },
        },
      },
    });

    render(<TestComponent shouldDeregisterOldCard={false} />);

    await waitFor(() => {
      expect(mockUpdateAutoEnrolStatus).toBeCalledWith({
        updateAutoEnrolment: { message: 'ENROLLED', status: true },
      });
    });
  });
});
