import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { useBillStreamingWaitlistPermission } from '../useBillStreamingWaitlistPermission';

describe('useBillStreamingWaitlistPermission', () => {
  it.each`
    permission | isEhPayroll | expected
    ${true}    | ${true}     | ${true}
    ${true}    | ${false}    | ${false}
    ${false}   | ${true}     | ${false}
    ${false}   | ${false}    | ${false}
  `('should work correctly', ({ expected, isEhPayroll, permission }) => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      isEhPayroll,
      userID: '1',
      loginProvider: 'eh',
    };

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      billStreamingWaitlist: {
        view: permission,
      },
    } as never;
    const hook = renderHook(() => useBillStreamingWaitlistPermission());

    expect(hook.result.current.havingPermission).toBe(expected);
  });
});
