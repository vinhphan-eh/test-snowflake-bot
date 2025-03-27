import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { renderHook } from '../../../../../common/utils/testing';
import type { GetAvailableIncentivesQuery } from '../../../../../new-graphql/generated';
import { useGetAvailableIncentivesQuery } from '../../../../../new-graphql/generated';
import { aMoneyV2 } from '../../../../../new-graphql/mocks/generated-mocks';
import { FREE_FIFTH_TRANSACTION_INCENTIVE_ID, FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID } from '../../constants/values';
import { useGetFreeTransactionProgress } from '../useGetFreeTransactionProgress';

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetAvailableIncentivesQuery: jest.fn(),
}));

const mockUseGetAvailableIncentivesQuery = useGetAvailableIncentivesQuery as unknown as jest.Mock<
  MockQueryResult<GetAvailableIncentivesQuery>
>;

describe('useGetFreeTransactionProgress', () => {
  // FIXME: this block will be removed after 17th Jun 2024
  describe('support for incentive v1', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({});
    });

    describe('should return false for showFreeProgress', () => {
      test.each([
        { isLoading: false, data: {} },
        { isLoading: true, data: {} },
      ])('should return false when api is loading $isLoading, data is empty', data => {
        mockUseGetAvailableIncentivesQuery.mockReturnValue(data);
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current).toEqual({
          showFreeProgress: false,
          progress: 0,
          applyFreeFee: false,
          remainingProgress: 0,
          maxTransactionThreshold: undefined,
        });
      });

      test('should return false when an user already redeemed', () => {
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_ID,
                          process: {
                            earningProcess: 100,
                            isRedeemed: true,
                          },
                          maxTransactionThreshold: aMoneyV2(),
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current.showFreeProgress).toBe(false);
      });
    });

    describe('should return true for showFreeProgress', () => {
      beforeEach(() => {
        mockReturnIncomeVisibility({});
      });

      test('should return true when an user has not redeemed', () => {
        const maxTransactionThreshold = aMoneyV2();
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_ID,
                          process: {
                            earningProcess: 100,
                            isRedeemed: false,
                          },
                          maxTransactionThreshold,
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        useSessionStore.setState({ currentOrgId: '46113' });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current.showFreeProgress).toBe(true);
        expect(result.current.applyFreeFee).toBe(true);
        expect(result.current.maxTransactionThreshold).toEqual(maxTransactionThreshold);
      });

      test('should return correctly with expected api', () => {
        const maxTransactionThreshold = aMoneyV2();
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_ID,
                          process: {
                            earningProcess: 75,
                            isRedeemed: false,
                          },
                          maxTransactionThreshold,
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        useSessionStore.setState({ currentOrgId: '46113' });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current).toEqual({
          showFreeProgress: true,
          progress: 3,
          applyFreeFee: false,
          maxTransactionThreshold,
          remainingProgress: 1,
        });
      });
    });
  });

  describe('support for incentive v2', () => {
    beforeEach(() => {
      mockReturnIncomeVisibility({ showInstapayNowUsageIncentiveV2: true });
    });

    describe('should return false for showFreeProgress', () => {
      test.each([
        { isLoading: false, data: {} },
        { isLoading: true, data: {} },
      ])('should return false when api is loading $isLoading, data is empty', data => {
        mockUseGetAvailableIncentivesQuery.mockReturnValue(data);
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current).toEqual({
          showFreeProgress: false,
          progress: 0,
          applyFreeFee: false,
          maxTransactionThreshold: undefined,
          remainingProgress: 0,
        });
      });

      test('should return false when an user already redeemed', () => {
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID,
                          process: {
                            earningProcess: 100,
                            isRedeemed: true,
                          },
                          maxTransactionThreshold: aMoneyV2(),
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current.showFreeProgress).toBe(false);
      });

      test('should return false when FF off', () => {
        mockReturnIncomeVisibility({ showInstapayNowUsageIncentiveV2: false });
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID,
                          process: {
                            earningProcess: 100,
                            isRedeemed: false,
                          },
                          maxTransactionThreshold: aMoneyV2(),
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        useSessionStore.setState({ currentOrgId: '46113' });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current.showFreeProgress).toBe(false);
      });
    });

    describe('should return true for showFreeProgress', () => {
      beforeEach(() => {
        mockReturnIncomeVisibility({ showInstapayNowUsageIncentiveV2: true });
      });

      test('should return true when an user has not redeemed', () => {
        const maxTransactionThreshold = aMoneyV2();
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID,
                          process: {
                            earningProcess: 100,
                            isRedeemed: false,
                          },
                          maxTransactionThreshold,
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        useSessionStore.setState({ currentOrgId: '46113' });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current.showFreeProgress).toBe(true);
        expect(result.current.applyFreeFee).toBe(true);
        expect(result.current.maxTransactionThreshold).toEqual(maxTransactionThreshold);
      });

      test('should return correctly with expected api', () => {
        const maxTransactionThreshold = aMoneyV2();
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID,
                          process: {
                            earningProcess: 75,
                            isRedeemed: false,
                          },
                          maxTransactionThreshold,
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        useSessionStore.setState({ currentOrgId: '46113' });
        const { result } = renderHook(() => useGetFreeTransactionProgress());

        expect(result.current).toEqual({
          showFreeProgress: true,
          progress: 3,
          applyFreeFee: false,
          maxTransactionThreshold,
          remainingProgress: 1,
        });
      });

      test.each([
        {
          earningProcess: 0,
        },
        {
          earningProcess: 100,
        },
      ])(`should apply free fee with earningProcess is $earningProcess`, ({ earningProcess }) => {
        const maxTransactionThreshold = aMoneyV2();
        mockUseGetAvailableIncentivesQuery.mockReturnValue({
          isLoading: false,
          data: {
            me: {
              orgs: [
                {
                  id: 46113,
                  instapay: {
                    availableIncentives: {
                      incentives: [
                        {
                          id: FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID,
                          process: {
                            earningProcess,
                            isRedeemed: false,
                          },
                          maxTransactionThreshold,
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        });
        useSessionStore.setState({ currentOrgId: '46113' });
        const { result } = renderHook(() => useGetFreeTransactionProgress());
        expect(result.current.applyFreeFee).toBeTruthy();
      });
    });
  });
});
