import React from 'react';
import { renderHook } from '../../../../common/utils/testing';
import { useSubmitSuperContributionStore } from '../../store/useSubmitSuperContributionStore';
import { useContributionTabs } from '../useContributionTabs';

describe('useContributionTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display badge status when new contribution has been created', async () => {
    const setSelectedTabKey = jest.fn();
    const mockStore = renderHook(() => useSubmitSuperContributionStore());
    mockStore.result.current.isCreatedOrUpdatedContribution = true; // new contribution created
    mockStore.result.current.setCreatedOrUpdatedContribution = jest.fn();

    jest.spyOn(React, 'useState').mockImplementation(() => ['active', setSelectedTabKey]);

    const {
      result: { current },
    } = renderHook(() => useContributionTabs());

    const { isShowPendingBadge, onPressTab, selectedTabKey } = current;

    expect(isShowPendingBadge).toBeTruthy();
    expect(selectedTabKey).toEqual('active');

    onPressTab('pending');
    expect(setSelectedTabKey).toBeCalledWith('pending');
  });

  // it("should display badge status when user hasn't seen pending tab", async () => {
  //   const mockStore = renderHook(() => useSubmitSuperContributionStore());
  //   mockStore.result.current.isCreatedOrUpdatedContribution = false; // new contribution created

  //   jest.spyOn(React, 'useState').mockImplementation(() => [false, () => {}]);

  //   const {
  //     result: { current },
  //   } = renderHook(() => useContributionTabs());

  //   const { isShowPendingBadge } = current;
  //   expect(isShowPendingBadge).toBeTruthy();
  // });
});
