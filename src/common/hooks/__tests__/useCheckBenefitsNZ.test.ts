import { usePermissionStore } from '../../stores/usePermissionStore';
import { renderHook } from '../../utils/testing';
import { mockUseIsAccountNZWithLoadingState } from '../__mocks__/useIsAccountNZ';
import { useCheckBenefitsNZ } from '../useCheckBenefitsNZ';

describe('useCheckBenefitsNZ', () => {
  it.each`
    isWhitelistedNZ | isNZaccount | expected
    ${true}         | ${true}     | ${true}
    ${true}         | ${false}    | ${false}
    ${false}        | ${true}     | ${false}
    ${false}        | ${false}    | ${false}
  `(
    'should work correctly with $isWhitelistedNZ, $isNZaccount, $expected',
    ({ expected, isNZaccount, isWhitelistedNZ }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        eBenWhitelistedNzBenefits: {
          view: isWhitelistedNZ,
        },
      } as never;

      mockUseIsAccountNZWithLoadingState.mockReturnValue({
        isNZaccount,
        isFetched: true,
        isLoading: false,
      });

      const { result } = renderHook(() => useCheckBenefitsNZ());
      expect(result.current.hasPermission).toBe(expected);
    }
  );
});
