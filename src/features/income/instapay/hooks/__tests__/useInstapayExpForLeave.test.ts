import { useBrazeStore } from '../../../../../common/braze/stores/useBrazeStore';
import { mockUseFetchEmploymentHistory } from '../../../../../common/hooks/__mocks__/useFetchEmploymentHistory';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUsePrefetchInstapayBalance } from '../../components/instapay-exp-popup/hooks/__mocks__/usePrefetchInstapayBalance';
import { useInstapayExpForLeave } from '../useInstapayExpForLeave';

describe('test showTileAtSubmitLeave', () => {
  it.each`
    haveBrazeCard | isUnderMaintenance | isFulltime | isAnnual | hasBalance | flag     | instapayAccess | moneyAccess | hasZeroBalance | expected
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${true}
    ${true}       | ${false}           | ${true}    | ${true}  | ${false}   | ${true}  | ${true}        | ${true}     | ${true}        | ${true}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${false}       | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${false}       | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${false}       | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${true}        | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${false}       | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${false}   | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${false}   | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${false} | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${true}            | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${false}      | ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${false}   | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
  `(
    'should work correctly',
    ({
      expected,
      flag,
      hasBalance,
      hasZeroBalance,
      haveBrazeCard,
      instapayAccess,
      isAnnual,
      isFulltime,
      isUnderMaintenance,
      moneyAccess,
    }) => {
      const brazeStore = renderHook(() => useBrazeStore());

      if (haveBrazeCard) {
        brazeStore.result.current.cards = [
          {
            extras: {
              id: 'instapay_exp_submit_leave',
            },
          },
        ] as never;
      } else {
        brazeStore.result.current.cards = [] as never;
      }

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        instapayBrazeSubmitLeave: {
          view: flag,
        },
      } as never;

      mockUseFetchEmploymentHistory.mockReturnValue({
        data: [{ employment_type: isFulltime ? 'Full-time' : 'Part-time' }] as never,
        isError: false,
        isLoading: false,
      });

      mockUsePrefetchInstapayBalance.mockReturnValue({
        hasBalance,
        hasZeroBalance,
      });

      mockUsePureMoneyPillarPermission.mockReturnValue({
        permission: moneyAccess,
        isFetched: true,
      });

      mockReturnIncomeVisibility({
        showInstapay: instapayAccess,
        showIncomeTab: true,
        instapayNowUnderMaintenance: isUnderMaintenance,
      });

      const hook = renderHook(() => useInstapayExpForLeave({ isAnnualLeave: isAnnual }));

      expect(hook.result.current.showTileAtSubmitLeave).toBe(expected);
    }
  );
});

describe('test showTileAtApprovedLeave', () => {
  it.each`
    isUnderMaintenance | isFulltime | isAnnual | hasBalance | flag     | instapayAccess | moneyAccess | expected
    ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${true}
    ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${false}       | ${true}     | ${false}
    ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${false}    | ${false}
    ${false}           | ${true}    | ${true}  | ${true}    | ${true}  | ${false}       | ${false}    | ${false}
    ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${true}        | ${true}     | ${false}
    ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${false}       | ${true}     | ${false}
    ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${true}        | ${false}    | ${false}
    ${false}           | ${true}    | ${true}  | ${true}    | ${false} | ${false}       | ${false}    | ${false}
    ${false}           | ${true}    | ${true}  | ${false}   | ${true}  | ${true}        | ${true}     | ${false}
    ${false}           | ${false}   | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${false}
    ${false}           | ${true}    | ${false} | ${true}    | ${true}  | ${true}        | ${true}     | ${false}
    ${true}            | ${true}    | ${true}  | ${true}    | ${true}  | ${true}        | ${true}     | ${false}
  `(
    'should work correctly',
    ({ expected, flag, hasBalance, instapayAccess, isAnnual, isFulltime, isUnderMaintenance, moneyAccess }) => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        instapayBrazeLeaveApproved: {
          view: flag,
        },
      } as never;

      mockUseFetchEmploymentHistory.mockReturnValue({
        data: [{ employment_type: isFulltime ? 'Full-time' : 'Part-time' }] as never,
        isError: false,
        isLoading: false,
      });

      mockUsePrefetchInstapayBalance.mockReturnValue({
        hasBalance,
        hasZeroBalance: false,
      });

      mockUsePureMoneyPillarPermission.mockReturnValue({
        permission: moneyAccess,
        isFetched: true,
      });

      mockReturnIncomeVisibility({
        showInstapay: instapayAccess,
        showIncomeTab: true,
        instapayNowUnderMaintenance: isUnderMaintenance,
      });
      const hook = renderHook(() => useInstapayExpForLeave({ isAnnualLeave: isAnnual }));

      expect(hook.result.current.showTileAtApprovedLeave).toBe(expected);
    }
  );
});
