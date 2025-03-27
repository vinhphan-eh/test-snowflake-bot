import { mockReturnIncomeVisibility } from '../../../../common/hooks/__mocks__/useIncomeVisibility';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../common/utils/testing';
import { useIsShowInstapayTile } from '../useIsShowInstapayTile';

describe('useIsShowInstapayTile', () => {
  describe('when payslips experiment instapay permission is available', () => {
    beforeEach(() => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: true,
        },
        payslipsExperimentInstapay: {
          view: true,
        },
      } as never;
    });
    it.each`
      isLoading | expected
      ${true}   | ${true}
      ${false}  | ${false}
    `('should return isShowInstapayTile: $expected when isLoading is $isLoading', ({ expected, isLoading }) => {
      mockReturnIncomeVisibility({ isLoading });
      const { result } = renderHook(() => useIsShowInstapayTile());
      expect(result.current.isShowInstapayTile).toBe(expected);
    });

    it.each`
      showIncomeTab | showInstapay | isError  | expected
      ${false}      | ${true}      | ${false} | ${false}
      ${true}       | ${false}     | ${false} | ${false}
      ${true}       | ${true}      | ${true}  | ${false}
      ${true}       | ${true}      | ${false} | ${true}
    `(
      'should return isShowInstapayTile: $expected when showIncomeTab is $showIncomeTab, showInstapay is $showInstapay, isError is $isError',
      ({ expected, isError, showIncomeTab, showInstapay }) => {
        mockReturnIncomeVisibility({ showInstapay, showIncomeTab, isError });

        const { result } = renderHook(() => useIsShowInstapayTile());
        expect(result.current.isShowInstapayTile).toBe(expected);
      }
    );
  });

  describe('when payslips experiment instapay permission is not available', () => {
    beforeEach(() => {
      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = {
        payslipsExperimentBudgeting: {
          view: true,
        },
        payslipsExperimentInstapay: {
          view: false,
        },
      } as never;
    });
    it('should return isShowInstapayTile false', () => {
      mockReturnIncomeVisibility({ showInstapay: true, showIncomeTab: true });

      const { result } = renderHook(() => useIsShowInstapayTile());
      expect(result.current.isShowInstapayTile).toBe(false);
    });
  });
});
