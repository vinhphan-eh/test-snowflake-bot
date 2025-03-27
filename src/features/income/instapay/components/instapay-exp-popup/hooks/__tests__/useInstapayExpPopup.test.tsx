import React, { useEffect } from 'react';
import { mockReturnIncomeVisibility } from '../../../../../../../common/hooks/__mocks__/useIncomeVisibility';
import { mockUsePureMoneyPillarPermission } from '../../../../../../../common/hooks/__mocks__/usePureMoneyPillarPermission';
import { usePermissionStore } from '../../../../../../../common/stores/usePermissionStore';
import { render, renderHook } from '../../../../../../../common/utils/testing';
import { mockUsePrefetchInstapayBalance } from '../__mocks__/usePrefetchInstapayBalance';
import { useGetInstapayExpPopupContext } from '../useGetInstapayExpPopupContext';
import { useInstapayExpPopup } from '../useInstapayExpPopup';

const mockUseGetInstapayExpPopupContext = useGetInstapayExpPopupContext as jest.MockedFn<
  typeof useGetInstapayExpPopupContext
>;

jest.mock('../useGetInstapayExpPopupContext', () => ({
  useGetInstapayExpPopupContext: jest.fn(),
}));

const TestRostersComponent = () => {
  const { showPopupForRosters } = useInstapayExpPopup();

  useEffect(() => {
    showPopupForRosters();
  }, []);
  return null;
};

const TestPayslipsComponent = () => {
  const { showPopupForPayslips } = useInstapayExpPopup();

  useEffect(() => {
    showPopupForPayslips();
  }, []);
  return null;
};

const TestLeaveComponent = () => {
  const { showPopupForLeave } = useInstapayExpPopup();

  useEffect(() => {
    showPopupForLeave();
  }, []);
  return null;
};

describe('useInstapayExpPopup', () => {
  const mockOpenPopup = jest.fn();

  beforeEach(() => {
    mockUseGetInstapayExpPopupContext.mockReturnValue({
      open: mockOpenPopup,
      close: jest.fn(),
    });
  });

  describe('test showPopupForRosters', () => {
    it.each`
      hasBalance | flag     | instapayAccess | moneyAccess | expected
      ${true}    | ${true}  | ${true}        | ${true}     | ${true}
      ${true}    | ${true}  | ${false}       | ${true}     | ${false}
      ${true}    | ${true}  | ${true}        | ${false}    | ${false}
      ${true}    | ${true}  | ${false}       | ${false}    | ${false}
      ${true}    | ${false} | ${true}        | ${true}     | ${false}
      ${true}    | ${false} | ${false}       | ${true}     | ${false}
      ${true}    | ${false} | ${true}        | ${false}    | ${false}
      ${true}    | ${false} | ${false}       | ${false}    | ${false}
      ${false}   | ${true}  | ${true}        | ${true}     | ${false}
    `(
      'should return $expected when hasBalance is $hasBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess',
      ({ expected, flag, hasBalance, instapayAccess, moneyAccess }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayExpPopupRosters: {
            view: flag,
          },
        } as never;

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
        });

        render(<TestRostersComponent />);

        if (expected) {
          expect(mockOpenPopup).toHaveBeenCalledTimes(1);
        } else {
          expect(mockOpenPopup).not.toHaveBeenCalled();
        }
      }
    );

    it.each`
      hasZeroBalance | flag     | instapayAccess | moneyAccess | expected
      ${true}        | ${true}  | ${true}        | ${true}     | ${true}
      ${true}        | ${false} | ${true}        | ${true}     | ${false}
      ${true}        | ${true}  | ${false}       | ${true}     | ${false}
      ${true}        | ${true}  | ${true}        | ${false}    | ${false}
      ${false}       | ${true}  | ${true}        | ${false}    | ${false}
    `(
      'should return $expected when hasZeroBalance is $hasZeroBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess',
      ({ expected, flag, hasZeroBalance, instapayAccess, moneyAccess }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayExpPopupRosters: {
            view: flag,
          },
        } as never;

        mockUsePrefetchInstapayBalance.mockReturnValue({
          hasBalance: false,
          hasZeroBalance,
        });

        mockUsePureMoneyPillarPermission.mockReturnValue({
          permission: moneyAccess,
          isFetched: true,
        });

        mockReturnIncomeVisibility({
          showInstapay: instapayAccess,
          showIncomeTab: true,
        });

        render(<TestRostersComponent />);

        if (expected) {
          expect(mockOpenPopup).toHaveBeenCalledTimes(1);
        } else {
          expect(mockOpenPopup).not.toHaveBeenCalled();
        }
      }
    );
  });

  describe('test showPopupForPayslips', () => {
    it.each`
      hasBalance | flag     | instapayAccess | moneyAccess | expected
      ${true}    | ${true}  | ${true}        | ${true}     | ${true}
      ${true}    | ${true}  | ${false}       | ${true}     | ${false}
      ${true}    | ${true}  | ${true}        | ${false}    | ${false}
      ${true}    | ${true}  | ${false}       | ${false}    | ${false}
      ${true}    | ${false} | ${true}        | ${true}     | ${false}
      ${true}    | ${false} | ${false}       | ${true}     | ${false}
      ${true}    | ${false} | ${true}        | ${false}    | ${false}
      ${true}    | ${false} | ${false}       | ${false}    | ${false}
      ${false}   | ${true}  | ${true}        | ${true}     | ${false}
    `(
      'should return $expected when hasBalance is $hasBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess',
      ({ expected, flag, hasBalance, instapayAccess, moneyAccess }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayExpPopupPayslips: {
            view: flag,
          },
        } as never;

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
        });

        render(<TestPayslipsComponent />);

        if (expected) {
          expect(mockOpenPopup).toHaveBeenCalledTimes(1);
        } else {
          expect(mockOpenPopup).not.toHaveBeenCalled();
        }
      }
    );

    it.each`
      hasZeroBalance | flag     | instapayAccess | moneyAccess | expected
      ${true}        | ${true}  | ${true}        | ${true}     | ${true}
      ${true}        | ${false} | ${true}        | ${true}     | ${false}
      ${true}        | ${true}  | ${false}       | ${true}     | ${false}
      ${true}        | ${true}  | ${true}        | ${false}    | ${false}
      ${false}       | ${true}  | ${true}        | ${false}    | ${false}
    `(
      'should return $expected when hasZeroBalance is $hasZeroBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess',
      ({ expected, flag, hasZeroBalance, instapayAccess, moneyAccess }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayExpPopupPayslips: {
            view: flag,
          },
        } as never;

        mockUsePrefetchInstapayBalance.mockReturnValue({
          hasBalance: false,
          hasZeroBalance,
        });

        mockUsePureMoneyPillarPermission.mockReturnValue({
          permission: moneyAccess,
          isFetched: true,
        });

        mockReturnIncomeVisibility({
          showInstapay: instapayAccess,
          showIncomeTab: true,
        });

        render(<TestPayslipsComponent />);

        if (expected) {
          expect(mockOpenPopup).toHaveBeenCalledTimes(1);
        } else {
          expect(mockOpenPopup).not.toHaveBeenCalled();
        }
      }
    );
  });

  describe('test showPopupForLeave', () => {
    it.each`
      hasBalance | flag     | instapayAccess | moneyAccess | expected
      ${true}    | ${true}  | ${true}        | ${true}     | ${true}
      ${true}    | ${true}  | ${false}       | ${true}     | ${false}
      ${true}    | ${true}  | ${true}        | ${false}    | ${false}
      ${true}    | ${true}  | ${false}       | ${false}    | ${false}
      ${true}    | ${false} | ${true}        | ${true}     | ${false}
      ${true}    | ${false} | ${false}       | ${true}     | ${false}
      ${true}    | ${false} | ${true}        | ${false}    | ${false}
      ${true}    | ${false} | ${false}       | ${false}    | ${false}
      ${false}   | ${true}  | ${true}        | ${true}     | ${false}
    `(
      'should return $expected when hasBalance is $hasBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess',
      ({ expected, flag, hasBalance, instapayAccess, moneyAccess }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayExpPopupLeave: {
            view: flag,
          },
        } as never;

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
        });

        render(<TestLeaveComponent />);

        if (expected) {
          expect(mockOpenPopup).toHaveBeenCalledTimes(1);
        } else {
          expect(mockOpenPopup).not.toHaveBeenCalled();
        }
      }
    );

    it.each`
      hasZeroBalance | flag     | instapayAccess | moneyAccess | expected
      ${true}        | ${true}  | ${true}        | ${true}     | ${true}
      ${true}        | ${false} | ${true}        | ${true}     | ${false}
      ${true}        | ${true}  | ${false}       | ${true}     | ${false}
      ${true}        | ${true}  | ${true}        | ${false}    | ${false}
      ${false}       | ${true}  | ${true}        | ${false}    | ${false}
    `(
      'should return $expected when hasZeroBalance is $hasZeroBalance, flag is $flag, instapayAccess is $instapayAccess, moneyAccess is $moneyAccess',
      ({ expected, flag, hasZeroBalance, instapayAccess, moneyAccess }) => {
        const permissionStore = renderHook(() => usePermissionStore());
        permissionStore.result.current.permissions = {
          instapayExpPopupLeave: {
            view: flag,
          },
        } as never;

        mockUsePrefetchInstapayBalance.mockReturnValue({
          hasBalance: false,
          hasZeroBalance,
        });

        mockUsePureMoneyPillarPermission.mockReturnValue({
          permission: moneyAccess,
          isFetched: true,
        });

        mockReturnIncomeVisibility({
          showInstapay: instapayAccess,
          showIncomeTab: true,
        });

        render(<TestLeaveComponent />);

        if (expected) {
          expect(mockOpenPopup).toHaveBeenCalledTimes(1);
        } else {
          expect(mockOpenPopup).not.toHaveBeenCalled();
        }
      }
    );
  });
});
