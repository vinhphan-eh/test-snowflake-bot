import { mockUseHasPurchaseHistory } from '../../../../../common/hooks/__mocks__/useHasPurchaseHistory';
import { mockUseIsAccountAU } from '../../../../../common/hooks/__mocks__/useIsAccountAU';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseHasActiveBillSubscription } from '../../../../bill-management/hooks/__mocks__/useHasActiveBillSubscription';
import { mockUseBillStreamPermission } from '../../../bill-streaming/hooks/__mocks__/useBillStreamPermission';
import { mockUseCheckCompletelyOnboardCashback } from '../../../cash-back/hooks/__mocks__/useCheckCompletelyOnboardCashback';
import { mockUseSwagStorePermission } from '../../../swag-store/hooks/__mocks__/useSwagStorePermission';
import { mockUseCashbackPermission } from '../__mocks__/useCashbackPermission';
import { usePurchaseTabVisibility } from '../usePurchaseTabVisibility';

describe('usePurchaseTabVisibility', () => {
  beforeEach(() => {
    mockUseBillStreamPermission.mockReturnValue({
      permission: true,
      isFetched: true,
    });
    mockUseCashbackPermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: true,
    });
    mockUseIsAccountAU.mockReturnValue(true);

    mockUseHasActiveBillSubscription.mockReturnValue({
      hasBillSubscription: false,
      isFetched: true,
      isError: false,
    });

    mockUseCheckCompletelyOnboardCashback.mockReturnValue({
      isCompleted: false,
      isFetched: true,
      isError: false,
      isLoading: false,
    });

    mockUseHasPurchaseHistory.mockReturnValue({
      hasPurchaseHistory: false,
      isFetched: true,
      isError: false,
      isLoading: false,
    });

    mockUseSwagStorePermission.mockReturnValue({
      permission: false,
      isLoading: false,
      isFetched: true,
    });
  });

  describe('Bill tab', () => {
    it.each`
      isAU     | billStreamPermission | hasBillSubscription | expected
      ${false} | ${true}              | ${true}             | ${false}
      ${false} | ${true}              | ${false}            | ${false}
      ${false} | ${false}             | ${true}             | ${false}
      ${false} | ${false}             | ${false}            | ${false}
      ${true}  | ${true}              | ${true}             | ${true}
      ${true}  | ${true}              | ${false}            | ${true}
      ${true}  | ${false}             | ${true}             | ${true}
      ${true}  | ${false}             | ${false}            | ${false}
    `('should work correctly', ({ billStreamPermission, expected, hasBillSubscription, isAU }) => {
      mockUseHasActiveBillSubscription.mockReturnValue({
        hasBillSubscription,
        isFetched: true,
        isError: false,
      });

      mockUseBillStreamPermission.mockReturnValue({
        permission: billStreamPermission,
        isFetched: true,
      });

      mockUseIsAccountAU.mockReturnValue(isAU);

      const { result } = renderHook(() => usePurchaseTabVisibility());

      expect(result.current.billTabVisibility).toBe(expected);
    });
  });

  describe('Cashback tab', () => {
    it.each`
      isAU     | cashbackPermission | isCompleted | expected
      ${false} | ${true}            | ${true}     | ${false}
      ${false} | ${true}            | ${false}    | ${false}
      ${false} | ${false}           | ${true}     | ${false}
      ${false} | ${false}           | ${false}    | ${false}
      ${true}  | ${true}            | ${true}     | ${true}
      ${true}  | ${true}            | ${false}    | ${false}
      ${true}  | ${false}           | ${true}     | ${false}
    `('should work correctly', ({ cashbackPermission, expected, isAU, isCompleted }) => {
      mockUseCashbackPermission.mockReturnValue({
        permission: cashbackPermission,
        isLoading: false,
        isFetched: true,
      });

      mockUseCheckCompletelyOnboardCashback.mockReturnValue({
        isCompleted,
        isFetched: true,
        isError: false,
        isLoading: false,
      });

      mockUseIsAccountAU.mockReturnValue(isAU);

      const { result } = renderHook(() => usePurchaseTabVisibility());

      expect(result.current.cashbackTabVisibility).toBe(expected);
    });
  });

  describe('Store tab', () => {
    it.each`
      swagStorePermission | hasPurchaseHistory | expected
      ${true}             | ${true}            | ${true}
      ${true}             | ${false}           | ${true}
      ${false}            | ${true}            | ${true}
      ${false}            | ${false}           | ${false}
    `('should work correctly', ({ expected, hasPurchaseHistory, swagStorePermission }) => {
      mockUseHasPurchaseHistory.mockReturnValue({
        hasPurchaseHistory,
        isFetched: true,
        isError: false,
        isLoading: false,
      });

      mockUseSwagStorePermission.mockReturnValue({
        permission: swagStorePermission,
        isLoading: false,
        isFetched: true,
      });

      const { result } = renderHook(() => usePurchaseTabVisibility());

      expect(result.current.storeTabVisibility).toBe(expected);
    });
  });
});
