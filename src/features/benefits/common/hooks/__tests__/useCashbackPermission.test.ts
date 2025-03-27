import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { useBenefitsPillarAccess } from '../useBenefitsPillarAccess';
import { useCashbackPermissionForOmop, useCashbackPermissionLegacy } from '../useCashbackPermission';

const mockUseBenefitsPillarAccess = useBenefitsPillarAccess as jest.MockedFn<typeof useBenefitsPillarAccess>;

jest.mock('../useBenefitsPillarAccess');

describe('useCashbackPermisisonLegacy', () => {
  it.each`
    flagPermission | isAU     | isPillarAccessible | expected
    ${true}        | ${true}  | ${true}            | ${true}
    ${true}        | ${true}  | ${false}           | ${false}
    ${true}        | ${false} | ${true}            | ${false}
    ${false}       | ${true}  | ${true}            | ${false}
    ${false}       | ${false} | ${true}            | ${false}
  `('should work correctly', ({ expected, flagPermission, isAU, isPillarAccessible }) => {
    mockUseBenefitsPillarAccess.mockReturnValue({
      isAccessible: isPillarAccessible,
      isFetching: false,
      isFetched: false,
    });

    mockUseIsAccountAU.mockReturnValue(isAU);

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      superAppCashback: {
        view: flagPermission,
      },
    } as never;

    const hook = renderHook(() => useCashbackPermissionLegacy());

    expect(hook.result.current.permission).toBe(expected);
  });
});

describe('useCashbackPermissionForOmop', () => {
  it.each`
    flagPermission | isAU     | isPillarAccessible | expected
    ${true}        | ${true}  | ${true}            | ${true}
    ${true}        | ${true}  | ${false}           | ${false}
    ${true}        | ${false} | ${true}            | ${false}
    ${false}       | ${true}  | ${true}            | ${false}
    ${false}       | ${false} | ${true}            | ${false}
  `('should work correctly', ({ expected, flagPermission, isAU, isPillarAccessible }) => {
    mockUseBenefitsPillarAccess.mockReturnValue({
      isAccessible: isPillarAccessible,
      isFetching: false,
      isFetched: false,
    });

    mockUseIsAccountAU.mockReturnValue(isAU);

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      superAppCashback: {
        view: flagPermission,
      },
    } as never;

    const hook = renderHook(() => useCashbackPermissionForOmop());

    expect(hook.result.current.permission).toBe(expected);
  });
});
