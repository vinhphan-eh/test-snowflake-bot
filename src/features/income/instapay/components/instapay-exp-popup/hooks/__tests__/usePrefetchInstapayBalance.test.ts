import { renderHook } from '../../../../../../../common/utils/testing';
import { mockUseEstInstaPayNowBalances } from '../../../../hooks/__mocks__/useEstInstaPayNowBalances';
import { mockUseInstaPayAvailableBalances } from '../../../../hooks/__mocks__/useInstaPayAvailableBalances';
import { usePrefetchInstapayBalance } from '../usePrefetchInstapayBalance';

describe('usePrefetchInstapayBalance', () => {
  it.each`
    hasEstBalance | sumAvailableBalance | expected
    ${true}       | ${0}                | ${true}
    ${false}      | ${0}                | ${false}
    ${true}       | ${1}                | ${true}
    ${false}      | ${1}                | ${true}
  `(
    'should return $expected when hasEstBalance is $hasEstBalance and sumAvailableBalance is $sumAvailableBalance',
    ({ expected, hasEstBalance, sumAvailableBalance }) => {
      mockUseEstInstaPayNowBalances.mockReturnValue({
        isError: false,
        isLoading: false,
        estBalance: 0,
        hasEstBalance,
      });

      mockUseInstaPayAvailableBalances.mockReturnValue({
        isError: false,
        isLoading: false,
        sumAvailableBalance,
      } as never);

      const hook = renderHook(() => usePrefetchInstapayBalance('in test'));
      if (expected) {
        expect(hook.result.current.hasBalance).toBe(true);
      } else {
        expect(hook.result.current.hasBalance).toBe(false);
      }
    }
  );
});
