import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseSwagStorePermission } from '../../../swag-store/hooks/__mocks__/useSwagStorePermission';
import { mockUseCashbackPermission } from '../__mocks__/useCashbackPermission';
import { useBenefitsHomePagePermission } from '../useBenefitsHomePagePermission';

describe('useBenefitsHomePagePermission', () => {
  it.each`
    homePermission | cashbackPermission | storePermission | isAU     | expected
    ${true}        | ${true}            | ${true}         | ${true}  | ${true}
    ${false}       | ${true}            | ${true}         | ${true}  | ${false}
    ${true}        | ${false}           | ${true}         | ${true}  | ${false}
    ${true}        | ${true}            | ${false}        | ${true}  | ${false}
    ${true}        | ${true}            | ${true}         | ${false} | ${false}
  `('should work correctly', ({ cashbackPermission, expected, homePermission, isAU, storePermission }) => {
    mockUseSwagStorePermission.mockReturnValue({
      permission: storePermission,
      isLoading: false,
      isFetched: true,
    });

    mockUseCashbackPermission.mockReturnValue({
      permission: cashbackPermission,
      isLoading: false,
      isFetched: true,
    });

    mockUseIsAccountAU.mockReturnValue(isAU);

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsPillarHomepage: {
        view: homePermission,
      },
    } as never;

    const hook = renderHook(() => useBenefitsHomePagePermission());

    expect(hook.result.current.permission).toBe(expected);
  });
});
