import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { mockUseIsAccountNZWithLoadingState } from '../../../../../common/hooks/__mocks__/useIsAccountNZ';
import { mockUseIsAccountUK } from '../../../../../common/hooks/__mocks__/useIsAccountUK';
import { useIsCandidateV2 } from '../../../../../common/hooks/useIsCandidate';
import { useIsWorkzone } from '../../../../../common/hooks/useIsWorkzone';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { useBenefitsPillarAccess } from '../../../common/hooks/useBenefitsPillarAccess';
import { useSwagStorePermission } from '../useSwagStorePermission';

const mockUseIsCandidateV2 = useIsCandidateV2 as jest.MockedFn<typeof useIsCandidateV2>;
const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;
const mockUseBenefitsPillarAccess = useBenefitsPillarAccess as jest.MockedFn<typeof useBenefitsPillarAccess>;

jest.mock('../../../../../common/hooks/useIsCandidate');
jest.mock('../../../../../common/hooks/useIsWorkzone');
jest.mock('../../../common/hooks/useBenefitsPillarAccess');

describe('useSwagStorePermission', () => {
  it.each`
    pillarAccess | isAU     | isUK     | isNZ     | isWorkzone | isCandidate | benefitsPermission | storeAppUKPermission | storeAppNZPermission | isTerminated | expected
    ${true}      | ${true}  | ${false} | ${false} | ${false}   | ${false}    | ${true}            | ${false}             | ${false}             | ${false}     | ${true}
    ${true}      | ${true}  | ${false} | ${false} | ${true}    | ${false}    | ${true}            | ${false}             | ${false}             | ${false}     | ${false}
    ${true}      | ${true}  | ${false} | ${false} | ${false}   | ${true}     | ${true}            | ${false}             | ${false}             | ${false}     | ${false}
    ${true}      | ${false} | ${true}  | ${false} | ${false}   | ${false}    | ${false}           | ${false}             | ${false}             | ${false}     | ${false}
    ${true}      | ${false} | ${true}  | ${false} | ${true}    | ${false}    | ${true}            | ${true}              | ${false}             | ${false}     | ${false}
    ${true}      | ${false} | ${true}  | ${false} | ${false}   | ${false}    | ${true}            | ${true}              | ${false}             | ${false}     | ${true}
    ${true}      | ${false} | ${false} | ${true}  | ${false}   | ${false}    | ${false}           | ${false}             | ${false}             | ${false}     | ${false}
    ${true}      | ${false} | ${false} | ${true}  | ${true}    | ${false}    | ${true}            | ${false}             | ${true}              | ${false}     | ${false}
    ${true}      | ${false} | ${false} | ${true}  | ${false}   | ${false}    | ${true}            | ${false}             | ${true}              | ${false}     | ${true}
    ${true}      | ${false} | ${false} | ${false} | ${false}   | ${false}    | ${true}            | ${true}              | ${true}              | ${false}     | ${false}
    ${true}      | ${true}  | ${false} | ${false} | ${false}   | ${false}    | ${true}            | ${false}             | ${false}             | ${true}      | ${false}
    ${true}      | ${false} | ${true}  | ${false} | ${false}   | ${false}    | ${true}            | ${true}              | ${false}             | ${true}      | ${false}
    ${true}      | ${false} | ${false} | ${true}  | ${false}   | ${false}    | ${true}            | ${false}             | ${true}              | ${true}      | ${false}
    ${false}     | ${true}  | ${false} | ${false} | ${false}   | ${false}    | ${true}            | ${false}             | ${false}             | ${false}     | ${false}
    ${false}     | ${false} | ${true}  | ${false} | ${false}   | ${false}    | ${true}            | ${true}              | ${false}             | ${false}     | ${false}
    ${false}     | ${false} | ${true}  | ${false} | ${false}   | ${false}    | ${true}            | ${true}              | ${false}             | ${false}     | ${false}
    ${false}     | ${false} | ${false} | ${true}  | ${false}   | ${false}    | ${true}            | ${false}             | ${true}              | ${false}     | ${false}
    ${false}     | ${false} | ${false} | ${true}  | ${false}   | ${false}    | ${true}            | ${false}             | ${true}              | ${false}     | ${false}
  `(
    'should work correctly',
    ({
      benefitsPermission,
      expected,
      isAU,
      isCandidate,
      isNZ,
      isTerminated,
      isUK,
      isWorkzone,
      pillarAccess,
      storeAppNZPermission,
      storeAppUKPermission,
    }) => {
      mockUseIsCandidateV2.mockReturnValue(isCandidate);
      mockUseIsWorkzone.mockReturnValue(isWorkzone);
      mockUseIsAccountAU.mockReturnValue(isAU);
      mockUseIsAccountUK.mockReturnValue(isUK);
      mockUseIsAccountNZWithLoadingState.mockReturnValue({ isNZaccount: isNZ, isFetched: true, isLoading: false });
      mockUseBenefitsPillarAccess.mockReturnValue({
        isAccessible: pillarAccess,
        isFetched: true,
        isFetching: false,
      });

      const sessionStore = renderHook(() => useSessionStore());
      sessionStore.result.current.currentUser = {
        userID: '0',
        loginProvider: 'eh',
        attributes: {
          terminated: isTerminated,
        },
      };

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        superAppBenefits: {
          view: benefitsPermission,
        },
        benefitsStoreAppUK: {
          view: storeAppUKPermission,
        },
        benefitsStoreAppNZ: {
          view: storeAppNZPermission,
        },
      } as never;

      const hook = renderHook(() => useSwagStorePermission());

      expect(hook.result.current.permission).toBe(expected);
    }
  );
});
