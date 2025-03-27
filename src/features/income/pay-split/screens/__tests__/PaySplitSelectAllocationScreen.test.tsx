import React from 'react';
import type { RenderAPI } from '@testing-library/react-native';
import { createAllocation, initFlowStore, testEWallet, testOrg1 } from './store-utils.test';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import * as usePermissionStore from '../../../../../common/stores/usePermissionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { PaySplitType } from '../../../../../new-graphql/generated';
import { usePaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import { PaySplitSelectAllocationScreen } from '../PaySplitSelectAllocationScreen';

describe('SelectAllocationScreen', () => {
  beforeEach(async () => {
    await initFlowStore(
      {
        allocations: [createAllocation(false, testOrg1, PaySplitType.Percentage, 100)],
        eWallet: testEWallet,
        cardSetupDone: true,
      },
      () => {
        // simulate what should have happened in previous screen (OrgListScreen)
        const { getAllocations, startEditing } = usePaySplitFlowStore();
        const a = getAllocations();
        startEditing(a[0]);
      }
    );
  });

  it('should render correctly', async () => {
    const { getByText } = render(<PaySplitSelectAllocationScreen />);
    expect(getByText(`How would you like to split your pay from ${testOrg1.orgName}?`)).toBeTruthy();
  });

  it('should navigate to dollar allocation screen', async () => {
    const screen = render(<PaySplitSelectAllocationScreen />);
    const btn = screen.getByTestId('allocDol');
    fireEvent.press(btn);
    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('PaySplitDollarAllocation');
    });
    screen.unmount();

    // check state of the store
    const { result: store, unmount: storeUnmount } = renderHook(() => usePaySplitFlowStore());
    expect(store.current.active).toBeTruthy();
    expect(store.current.active?.membership.orgId).toEqual(testOrg1.orgId);
    expect(store.current.active?.type).toEqual(PaySplitType.FixedAmount);
    storeUnmount();
  });

  it('should navigate to percentage allocation screen', async () => {
    const screen = render(<PaySplitSelectAllocationScreen />);
    const btn = screen.getByTestId('allocPc');
    fireEvent.press(btn);
    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('PaySplitPercentageAllocation');
    });
    screen.unmount();

    // check state of the store
    const { result: store, unmount: storeUnmount } = renderHook(() => usePaySplitFlowStore());
    expect(store.current.active).toBeTruthy();
    expect(store.current.active?.membership.orgId).toEqual(testOrg1.orgId);
    expect(store.current.active?.type).toEqual(PaySplitType.Percentage);
    storeUnmount();
  });

  describe('Allocate all money option & confirm', () => {
    let screenAPI: RenderAPI;
    beforeEach(() => {
      screenAPI = render(<PaySplitSelectAllocationScreen />);
      const allocateAllBtn = screenAPI.getByTestId('allocateAll');
      fireEvent.press(allocateAllBtn);

      const confirmBtn = screenAPI.getByText('Got it!');
      fireEvent.press(confirmBtn);
    });

    it('should set allocate value to 100%', () => {
      const {
        result: {
          current: { getAllocations },
        },
      } = renderHook(() => usePaySplitFlowStore());
      const [editingAllocation] = getAllocations();
      expect(editingAllocation.amount).toEqual(100);
      expect(editingAllocation.type).toEqual(PaySplitType.Percentage);
    });

    it('should navigate to Org list', () => {
      expect(mockedNavigate).toBeCalledWith('PaySplitOrgList');
    });
  });

  it('should able to go back', async () => {
    const screen = render(<PaySplitSelectAllocationScreen />);

    const button = screen.getByTestId('topbar-back-icon');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedGoBack).toBeCalled();
    });
  });

  describe('Testing group C', () => {
    it('should open percentage input when select percentage', () => {
      const mockUsePermissionStore = jest.spyOn(usePermissionStore, 'usePermissionStore');
      const mockPermission: Partial<usePermissionStore.PermissionData> = {
        ebenPaySplitExpGroupC: { view: true },
      };
      mockUsePermissionStore.mockImplementation(selector =>
        selector({ permissions: mockPermission as usePermissionStore.PermissionData })
      );
      const screen = render(<PaySplitSelectAllocationScreen />);

      const percentageOption = screen.getByTestId('allocPc');
      fireEvent.press(percentageOption);

      expect(mockedNavigate).toBeCalledWith('PaySplitPercentageInput');
    });
  });
});
