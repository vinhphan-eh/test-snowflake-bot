import type { MockQueryResult } from '../../../../../../common/types/react-query';
import { renderHook } from '../../../../../../common/utils/testing';
import {
  CashbackBankLinkedStatus,
  useCashbackUpdateBankDetailsMutation,
  useCashbackUpdateBankLinkedStatusMutation,
  useCashbackUserBankDetailsQuery,
  useCashbackUserInfoQuery,
  useGetEWalletAuAccountDetailsQuery,
  type CashbackUserInfoQuery,
} from '../../../../../../new-graphql/generated';
import { usePokitpalAccount } from '../usePokitpalAccount';

const mockUseCashbackUserInfoQuery = useCashbackUserInfoQuery as unknown as jest.Mock<
  MockQueryResult<CashbackUserInfoQuery>
>;
(mockUseCashbackUserInfoQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useCashbackUserInfoQuery: jest.fn(),
  useCashbackUserBankDetailsQuery: jest.fn(),
  useCashbackUpdateBankDetailsMutation: jest.fn(),
  useCashbackUpdateBankLinkedStatusMutation: jest.fn(),
  useGetEWalletAuAccountDetailsQuery: jest.fn(),
}));

describe('usePokitpalAccount hook', () => {
  const mockUpdateBank = jest.fn();

  const mockUpdateBankLinkedStatus = jest.fn();

  beforeEach(() => {
    (useCashbackUserBankDetailsQuery as unknown as jest.Mock).mockReturnValue({
      refetch: () =>
        Promise.resolve({
          data: {
            cashbackUserBank: {
              bsb: null,
              accountNumber: null,
              id: 0,
            },
          },
        }),
    });

    (useCashbackUpdateBankDetailsMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockUpdateBank,
    });

    (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          wallet: {
            details: {
              accountNumber: '123456',
              bsb: '567',
            },
          },
        },
      },
    });

    (useCashbackUpdateBankLinkedStatusMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockUpdateBankLinkedStatus,
    });

    mockUseCashbackUserInfoQuery.mockReturnValue({
      data: {
        me: {
          cashback: {
            cashbackUserInfo: {
              bankLinkedStatus: CashbackBankLinkedStatus.Failed,
            } as never,
          },
        },
      },
    });
  });

  describe('registerUserBankIfDoNotExist function', () => {
    it('should throw error when there is no wallet detail', async () => {
      (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: undefined,
      });
      const {
        result: {
          current: { registerUserBankIfDoNotExist },
        },
      } = renderHook(() => usePokitpalAccount());

      expect(await registerUserBankIfDoNotExist()).toBe(false);
      expect(mockUpdateBankLinkedStatus).toBeCalledWith({
        updateBankLinkedStatus: {
          status: false,
          message: 'MISSING_WALLET_DETAIL',
        },
      });
    });

    it('should throw error when wallet detail empty', async () => {
      (useGetEWalletAuAccountDetailsQuery as unknown as jest.Mock).mockReturnValue({
        data: {},
      });
      const {
        result: {
          current: { registerUserBankIfDoNotExist },
        },
      } = renderHook(() => usePokitpalAccount());

      expect(await registerUserBankIfDoNotExist()).toBe(false);
      expect(mockUpdateBankLinkedStatus).toBeCalledWith({
        updateBankLinkedStatus: {
          status: false,
          message: 'MISSING_WALLET_DETAIL',
        },
      });
    });

    it('should update bank details correctly', async () => {
      const {
        result: {
          current: { registerUserBankIfDoNotExist },
        },
      } = renderHook(() => usePokitpalAccount());

      const result = await registerUserBankIfDoNotExist();

      expect(mockUpdateBank).toBeCalledWith({
        updateBankDetails: {
          accountNumber: '123456',
          bsb: '567',
        },
      });
      expect(result).toBe(true);
      expect(mockUpdateBankLinkedStatus).toBeCalledWith({
        updateBankLinkedStatus: {
          status: true,
          message: 'BANK_UPDATED',
        },
      });
    });

    it('should throw error when updating failed', async () => {
      mockUpdateBank.mockRejectedValue({});
      const {
        result: {
          current: { registerUserBankIfDoNotExist },
        },
      } = renderHook(() => usePokitpalAccount());

      expect(await registerUserBankIfDoNotExist()).toBe(false);
      expect(mockUpdateBankLinkedStatus).toBeCalledWith({
        updateBankLinkedStatus: {
          status: false,
          message: 'INTERNAL_SERVER',
        },
      });
    });

    it('should update bank status when having bank detail but have not updated status', async () => {
      (useCashbackUserBankDetailsQuery as unknown as jest.Mock).mockReturnValue({
        refetch: () =>
          Promise.resolve({
            data: {
              cashbackUserBank: {
                bsb: '123',
                accountNumber: '123',
                id: 0,
              },
            },
          }),
      });

      const {
        result: {
          current: { registerUserBankIfDoNotExist },
        },
      } = renderHook(() => usePokitpalAccount());

      await registerUserBankIfDoNotExist();

      expect(mockUpdateBankLinkedStatus).toBeCalledWith({
        updateBankLinkedStatus: {
          status: true,
          message: 'BANK_UPDATED',
        },
      });
    });

    it('should not update bank status when having bank detail and having success status', async () => {
      (useCashbackUserBankDetailsQuery as unknown as jest.Mock).mockReturnValue({
        refetch: () =>
          Promise.resolve({
            data: {
              cashbackUserBank: {
                bsb: '123',
                accountNumber: '123',
                id: 0,
              },
            },
          }),
      });

      mockUseCashbackUserInfoQuery.mockReturnValue({
        data: {
          me: {
            cashback: {
              cashbackUserInfo: {
                bankLinkedStatus: CashbackBankLinkedStatus.Success,
              } as never,
            },
          },
        },
      });

      const {
        result: {
          current: { registerUserBankIfDoNotExist },
        },
      } = renderHook(() => usePokitpalAccount());

      await registerUserBankIfDoNotExist();

      expect(mockUpdateBankLinkedStatus).not.toBeCalled();
    });
  });
});
