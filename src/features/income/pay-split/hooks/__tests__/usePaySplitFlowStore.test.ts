import { act, renderHook } from '../../../../../common/utils/testing';
import type { PayAllocation } from '../../../../../new-graphql/generated';
import { PaySplitType } from '../../../../../new-graphql/generated';
import { createAllocation, testEWallet, testOrg1, testOrg4 } from '../../screens/__tests__/store-utils.test';
import { usePaySplitFlowStore } from '../usePaySplitFlowStore';

const initStore = (allocations: PayAllocation[]) => {
  const {
    result: { current: store },
  } = renderHook(() => usePaySplitFlowStore());
  act(() =>
    store.initialise({
      allocations,
      eWallet: testEWallet,
      cardSetupDone: true,
    })
  );
  act(() => {
    const a = store.getAllocations();
    store.startEditing(a[0]);
  });
};

describe('usePaySplitFlowStore', () => {
  it('should enable only All My Pay option when having >1 non-eWallet account', () => {
    initStore([createAllocation(false, testOrg1, PaySplitType.Percentage, 50, 50)]);

    const { result } = renderHook(() => {
      return usePaySplitFlowStore().getOptions();
    });

    expect(result.current.isAllMyPayEnabled()).toBeTruthy();
    expect(result.current.isDollarEnabled()).toBeFalsy();
    expect(result.current.isPercentageEnabled()).toBeFalsy();
  });

  it('should enable only All My Pay option when having >1 non-eWallet account and 1 eWallet', () => {
    initStore([createAllocation(true, testOrg1, PaySplitType.Percentage, 50, 50, 50)]);

    const { result } = renderHook(() => {
      return usePaySplitFlowStore().getOptions();
    });

    expect(result.current.isAllMyPayEnabled()).toBeTruthy();
    expect(result.current.isDollarEnabled()).toBeFalsy();
    expect(result.current.isPercentageEnabled()).toBeFalsy();
  });

  it('should enable all options when having 1 non-eWallet account', () => {
    initStore([createAllocation(false, testOrg1, PaySplitType.Percentage, 50)]);

    const { result } = renderHook(() => {
      return usePaySplitFlowStore().getOptions();
    });

    expect(result.current.isAllMyPayEnabled()).toBeTruthy();
    expect(result.current.isDollarEnabled()).toBeTruthy();
    expect(result.current.isPercentageEnabled()).toBeTruthy();
  });

  it('should enable all options when having 1 non-eWallet account, and 1 eWallet', () => {
    initStore([createAllocation(true, testOrg1, PaySplitType.Percentage, 50, 50)]);

    const { result } = renderHook(() => {
      return usePaySplitFlowStore().getOptions();
    });

    expect(result.current.isAllMyPayEnabled()).toBeTruthy();
    expect(result.current.isDollarEnabled()).toBeTruthy();
    expect(result.current.isPercentageEnabled()).toBeTruthy();
  });

  it('should enable xero specific options', () => {
    initStore([createAllocation(true, testOrg4, PaySplitType.FixedAmount, 50, 50)]);

    const { result } = renderHook(() => {
      return usePaySplitFlowStore().getOptions();
    });

    expect(result.current.isAllMyPayEnabled()).toBeFalsy();
    expect(result.current.isDollarEnabled()).toBeTruthy();
    expect(result.current.isPercentageEnabled()).toBeFalsy();
  });
});
