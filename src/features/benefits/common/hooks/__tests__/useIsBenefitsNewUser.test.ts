import { mockUseHasPurchaseHistory } from '../../../../../common/hooks/__mocks__/useHasPurchaseHistory';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseHasActiveBillSubscription } from '../../../../bill-management/hooks/__mocks__/useHasActiveBillSubscription';
import { mockUseCheckCompletelyOnboardCashback } from '../../../cash-back/hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { useIsBenefitsNewUser } from '../useIsBenefitsNewUser';

describe('useIsBenefitsNewUser', () => {
  it.each`
    hasPurchaseHistory | hasCompletedCashbackOnboard | hasBillSubscription | expected
    ${true}            | ${true}                     | ${true}             | ${false}
    ${false}           | ${true}                     | ${true}             | ${false}
    ${true}            | ${true}                     | ${false}            | ${false}
    ${true}            | ${false}                    | ${true}             | ${false}
    ${true}            | ${false}                    | ${false}            | ${false}
    ${false}           | ${false}                    | ${false}            | ${true}
  `('should work correctly', ({ expected, hasBillSubscription, hasCompletedCashbackOnboard, hasPurchaseHistory }) => {
    mockUseHasPurchaseHistory.mockReturnValue({
      hasPurchaseHistory,
      isFetched: true,
      isError: false,
      isLoading: false,
    });
    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: hasCompletedCashbackOnboard,
      isError: false,
      isFetched: true,
      isLoading: false,
    });
    mockUseHasActiveBillSubscription.mockReturnValue({
      hasBillSubscription,
      isFetched: true,
      isError: false,
    });

    const hook = renderHook(() => useIsBenefitsNewUser());
    expect(hook.result.current.isNewUser).toBe(expected);
  });
});
