import { useBrazeStore } from '../../../../../common/braze/stores/useBrazeStore';
import { mockUseFetchEmploymentHistory } from '../../../../../common/hooks/__mocks__/useFetchEmploymentHistory';
import { mockReturnIncomeVisibility } from '../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUsePrefetchInstapayBalance } from '../../components/instapay-exp-popup/hooks/__mocks__/usePrefetchInstapayBalance';
import { useInstapayExpForTimesheet } from '../useInstapayExpForTimesheet';

describe('showTileAtSubmitTimesheet', () => {
  it.each`
    haveBrazeCard | isUnderMaintenance | hasBalance | flag     | instapayAccess | moneyAccess | hasZeroBalance | expected
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${true}
    ${true}       | ${false}           | ${false}   | ${true}  | ${true}        | ${true}     | ${true}        | ${true}
    ${true}       | ${false}           | ${true}    | ${true}  | ${false}       | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${true}        | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${true}  | ${false}       | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${false} | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${false} | ${false}       | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${false} | ${true}        | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${true}    | ${false} | ${false}       | ${false}    | ${false}       | ${false}
    ${true}       | ${false}           | ${false}   | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${true}            | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${false}      | ${false}           | ${true}    | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
    ${true}       | ${false}           | ${false}   | ${true}  | ${true}        | ${true}     | ${false}       | ${false}
  `(
    'should return $expected when haveBrazeCard is $haveBrazeCard, isUnderMaintenance is $isUnderMaintenance, hasBalance is $hasBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess, hasZeroBalance is $hasZeroBalance',
    ({
      expected,
      flag,
      hasBalance,
      hasZeroBalance,
      haveBrazeCard,
      instapayAccess,
      isFulltime,
      isUnderMaintenance,
      moneyAccess,
    }) => {
      const brazeStore = renderHook(() => useBrazeStore());

      if (haveBrazeCard) {
        brazeStore.result.current.cards = [
          {
            extras: {
              id: 'instapay_exp_submit_timesheet',
            },
          },
          {
            extras: {
              id: 'instapay_exp_submit_timesheet_zero_balance',
            },
          },
        ] as never;
      } else {
        brazeStore.result.current.cards = [] as never;
      }

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        instapayBrazeSubmitTimesheets: {
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

      const hook = renderHook(() => useInstapayExpForTimesheet());

      expect(hook.result.current.showTileAtSubmitTimesheet).toBe(expected);
    }
  );
});
