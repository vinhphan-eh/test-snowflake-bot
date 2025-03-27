import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseBillStreamPermission } from '../__mocks__/useBillStreamPermission';
import { useSEOfferTilePermission } from '../useSEOfferTilePermission';

describe('useSEOfferTilePermission', () => {
  beforeEach(() => {
    mockUseBillStreamPermission.mockReturnValue({ permission: true, isFetched: true });
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: false,
      },
    } as never;
  });

  it.each`
    permission | billStreamPermission | expected
    ${true}    | ${true}              | ${true}
    ${true}    | ${false}             | ${false}
    ${false}   | ${true}              | ${false}
    ${false}   | ${false}             | ${false}
  `('should work correctly', ({ billStreamPermission, expected, permission }) => {
    mockUseBillStreamPermission.mockReturnValue({ permission: billStreamPermission, isFetched: true });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      seOfferTiles: {
        view: permission,
      },
    } as never;
    const hook = renderHook(() => useSEOfferTilePermission());

    expect(hook.result.current.permission).toBe(expected);
  });
});
