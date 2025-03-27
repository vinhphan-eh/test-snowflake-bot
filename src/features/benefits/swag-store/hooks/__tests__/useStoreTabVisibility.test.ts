import { mockUseHasPurchaseHistory } from '../../../../../common/hooks/__mocks__/useHasPurchaseHistory';
import { renderHook } from '../../../../../common/utils/testing';
import { mockUseSwagStorePermission } from '../__mocks__/useSwagStorePermission';
import { useStoreTabVisibility } from '../useStoreTabVisibility';

describe('useStoreTabVisibility', () => {
  it.each`
    hasPurchaseHistory | swagStorePermission | expected
    ${true}            | ${true}             | ${true}
    ${false}           | ${true}             | ${true}
    ${true}            | ${false}            | ${true}
    ${false}           | ${false}            | ${false}
  `('should work correct', ({ expected, hasPurchaseHistory, swagStorePermission }) => {
    mockUseHasPurchaseHistory.mockReturnValue({
      hasPurchaseHistory,
      isFetched: true,
      isLoading: false,
      isError: false,
    });
    mockUseSwagStorePermission.mockReturnValue({
      permission: swagStorePermission,
      isLoading: false,
      isFetched: true,
    });

    const { result } = renderHook(() => useStoreTabVisibility());

    expect(result.current.permission).toBe(expected);
  });

  it.each`
    fetchedHistory | fetchedPermission | expected
    ${true}        | ${true}           | ${true}
    ${false}       | ${true}           | ${false}
    ${true}        | ${false}          | ${false}
    ${false}       | ${false}          | ${false}
  `('loading should work correct', ({ expected, fetchedHistory, fetchedPermission }) => {
    mockUseHasPurchaseHistory.mockReturnValue({
      hasPurchaseHistory: true,
      isFetched: fetchedHistory,
      isLoading: false,
      isError: false,
    });
    mockUseSwagStorePermission.mockReturnValue({
      permission: true,
      isLoading: false,
      isFetched: fetchedPermission,
    });

    const { result } = renderHook(() => useStoreTabVisibility());

    expect(result.current.isFetched).toBe(expected);
  });
});
