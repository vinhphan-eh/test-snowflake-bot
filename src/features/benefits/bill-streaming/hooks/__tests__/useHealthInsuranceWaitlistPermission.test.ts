import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { useHealthInsuranceWaitlistPermission } from '../useHeathInsuranceWaitlistPermission';

jest.mock('../../../../../common/hooks/useIsCandidate');
jest.mock('../../../../../common/hooks/useWorkzonePermission');

describe('useHealthInsuranceWaitlistPermission', () => {
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: false,
      },
    } as never;
  });

  it.each`
    permission | isAU     | expected
    ${true}    | ${true}  | ${true}
    ${true}    | ${false} | ${false}
    ${false}   | ${true}  | ${false}
    ${false}   | ${false} | ${false}
  `('should work correctly', ({ expected, isAU, permission }) => {
    mockUseIsAccountAU.mockReturnValue(isAU);

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillHealthInsuranceWaitlist: {
        view: permission,
      },
    } as never;
    const hook = renderHook(() => useHealthInsuranceWaitlistPermission());

    expect(hook.result.current.permission).toBe(expected);
  });

  it('should restrict access for terminated', () => {
    mockUseIsAccountAU.mockReturnValue(true);

    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: true,
      },
    } as never;
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillHealthInsuranceWaitlist: {
        view: true,
      },
    } as never;
    const hook = renderHook(() => useHealthInsuranceWaitlistPermission());

    expect(hook.result.current.permission).toBe(false);
  });
});
