import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { useIsCandidateV2 } from '../../../../../common/hooks/useIsCandidate';
import { useWorkzonePermission } from '../../../../../common/hooks/useWorkzonePermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { Pid } from '../../../../../new-graphql/generated';
import { useBenefitsPillarAccess } from '../../../common/hooks/useBenefitsPillarAccess';
import { useBillStreamPermission, useBillStreamPermissionByProvider } from '../useBillStreamPermission';

const mockUseIsCandidate = useIsCandidateV2 as jest.MockedFn<typeof useIsCandidateV2>;
const mockUseWorkzonePermission = useWorkzonePermission as jest.MockedFn<typeof useWorkzonePermission>;
const mockUseBenefitsPillarAccess = useBenefitsPillarAccess as jest.MockedFn<typeof useBenefitsPillarAccess>;

jest.mock('../../../../../common/hooks/useIsCandidate');
jest.mock('../../../../../common/hooks/useWorkzonePermission');
jest.mock('../../../common/hooks/useBenefitsPillarAccess');

describe('useBillStreamingPermission', () => {
  beforeEach(() => {
    mockUseIsCandidate.mockReturnValue(false);
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: false,
      },
    } as never;

    mockUseWorkzonePermission.mockReturnValue({
      benefitsPermission: true,
      isFetched: true,
      moneyPermission: true,
      isFetching: false,
    });

    mockUseBenefitsPillarAccess.mockReturnValue({
      isAccessible: true,
      isFetched: true,
      isFetching: false,
    });
  });

  it.each`
    pillarAccess | permission | isAU     | expected
    ${true}      | ${true}    | ${true}  | ${true}
    ${true}      | ${true}    | ${false} | ${false}
    ${true}      | ${false}   | ${true}  | ${false}
    ${true}      | ${false}   | ${false} | ${false}
    ${false}     | ${true}    | ${true}  | ${false}
    ${false}     | ${false}   | ${false} | ${false}
  `('should work correctly', ({ expected, isAU, permission, pillarAccess }) => {
    mockUseIsAccountAU.mockReturnValue(isAU);

    mockUseBenefitsPillarAccess.mockReturnValue({
      isAccessible: pillarAccess,
      isFetched: true,
      isFetching: false,
    });

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillStreaming: {
        view: permission,
      },
    } as never;
    const hook = renderHook(() => useBillStreamPermission());

    expect(hook.result.current.permission).toBe(expected);
  });

  it('should not restrict access for candidate', () => {
    mockUseIsAccountAU.mockReturnValue(true);
    mockUseIsCandidate.mockReturnValue(true);

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillStreaming: {
        view: true,
      },
    } as never;
    const hook = renderHook(() => useBillStreamPermission());

    expect(hook.result.current.permission).toBe(true);
  });

  it('should grant access for terminated users', () => {
    mockUseIsAccountAU.mockReturnValue(true);

    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      attributes: {
        terminated: true,
      },
    } as never;
    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsBillStreaming: {
        view: true,
      },
    } as never;
    const hook = renderHook(() => useBillStreamPermission());

    expect(hook.result.current.permission).toBe(true);
  });

  it.each`
    billPermission | provider            | ahmFlag  | medibankFlag | expected
    ${true}        | ${Pid.Ahm}          | ${true}  | ${false}     | ${true}
    ${true}        | ${Pid.Medibank}     | ${false} | ${true}      | ${true}
    ${true}        | ${Pid.SimplyEnergy} | ${false} | ${false}     | ${true}
    ${false}       | ${Pid.Ahm}          | ${true}  | ${false}     | ${false}
    ${false}       | ${Pid.Medibank}     | ${false} | ${true}      | ${false}
    ${false}       | ${Pid.SimplyEnergy} | ${false} | ${false}     | ${false}
    ${true}        | ${Pid.Ahm}          | ${false} | ${true}      | ${false}
    ${true}        | ${Pid.Medibank}     | ${true}  | ${false}     | ${false}
  `(
    'should work correctly with useBillStreamPermissionByProvider',
    ({ ahmFlag, billPermission, expected, medibankFlag, provider }) => {
      mockUseIsAccountAU.mockReturnValue(true);

      mockUseBenefitsPillarAccess.mockReturnValue({
        isAccessible: true,
        isFetched: true,
        isFetching: false,
      });

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        benefitsBillStreaming: {
          view: billPermission,
        },
        benefitsBillAhmPromoTile: {
          view: ahmFlag,
        },
        benefitsBillMedibankPromoTile: {
          view: medibankFlag,
        },
      } as never;
      const hook = renderHook(() => useBillStreamPermissionByProvider(provider));

      expect(hook.result.current.permission).toBe(expected);
    }
  );
});
