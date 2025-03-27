import { usePermissionStore } from '../../stores/usePermissionStore';
import { renderHook } from '../../utils/testing';
import { mockUseIsAccountUKWithLoadingState } from '../__mocks__/useIsAccountUK';
import { useCheckBenefitsUK } from '../useCheckBenefitsUK';

describe('useCheckBenefitsUK', () => {
  it.each`
    isWhitelistedUK | isUKaccount | expected
    ${true}         | ${true}     | ${true}
    ${true}         | ${false}    | ${false}
    ${false}        | ${true}     | ${false}
    ${false}        | ${false}    | ${false}
  `('should work correctly', ({ expected, isUKaccount, isWhitelistedUK }) => {
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      eBenWhitelistedUkBenefits: {
        view: isWhitelistedUK,
      },
    } as never;

    mockUseIsAccountUKWithLoadingState.mockReturnValue({
      isUKaccount,
      isFetched: true,
      isLoading: true,
    });

    const { result } = renderHook(() => useCheckBenefitsUK());
    expect(result.current.hasPermission).toBe(expected);
  });
});
