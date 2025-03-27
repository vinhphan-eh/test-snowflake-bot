import React from 'react';
import { createAllocation, initFlowStore, testEWallet, testOrg1 } from './store-utils.test';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import * as usePermissionStore from '../../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { PaySplitType } from '../../../../../new-graphql/generated';
import { usePaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import { PaySplitPercentageAllocationScreen } from '../PaySplitPercentageAllocationScreen/PaySplitPercentageAllocationScreen';

jest.mock('../../../../../common/stores/useSessionStore');

describe('Percentage Allocation Screen', () => {
  const setup = ({
    mockPermission = { ebenPaySplitExpGroupA: { view: true } },
    isRebrand = false,
  }: {
    mockPermission?: Partial<usePermissionStore.PermissionData>;
    isRebrand?: boolean;
  }) => {
    const mockUsePermissionStore = jest.spyOn(usePermissionStore, 'usePermissionStore');
    mockUsePermissionStore.mockImplementation(selector =>
      selector({ permissions: mockPermission as usePermissionStore.PermissionData })
    );

    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: isRebrand,
      mixpanelTracking: {
        eventTracking: () => {},
        screenTracking: () => {},
      },
    });
  };

  describe('Flow A and flow B', () => {
    it.each<[number, Partial<usePermissionStore.PermissionData>]>([
      // Flow A
      [15, { ebenPaySplitExpGroupA: { view: true } }],
      [10, { ebenPaySplitExpGroupA: { view: true } }],
      [5, { ebenPaySplitExpGroupA: { view: true } }],
      // Flow B
      [50, { ebenPaySplitExpGroupB: { view: true } }],
      [30, { ebenPaySplitExpGroupB: { view: true } }],
      [10, { ebenPaySplitExpGroupB: { view: true } }],
    ])('should navigate to confirmation page when selecting allocation', async (amount, mockFlag) => {
      setup({ mockPermission: mockFlag });

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
      const screen = render(<PaySplitPercentageAllocationScreen />);

      const amountOption = screen.getByTestId(`paysplit-${amount}%`);
      fireEvent.press(amountOption);

      // bottom sheet
      const gotIt = screen.getByText('Got it!');
      fireEvent.press(gotIt);

      await waitFor(() => {
        expect(mockedNavigate).toBeCalledWith('PaySplitOrgList');
      });
      screen.unmount();

      // check state of the store
      const { result: store, unmount: storeUnmount } = renderHook(() => usePaySplitFlowStore());
      expect(store.current.active).toBeNull();
      expect(store.current.allocations[0].amount).toEqual(amount);
      storeUnmount();
    });

    it('should open percentage input screen when select custom option', () => {
      setup({});
      // Mock useState before rendering your component
      const screen = render(<PaySplitPercentageAllocationScreen />);

      const amountOption = screen.getByTestId('paysplit-custom%');
      fireEvent.press(amountOption);

      expect(mockedNavigate).toBeCalledWith('PaySplitPercentageInput');
    });
  });

  describe('Flow C', () => {
    describe('when rebranding is enabled', () => {
      it('should render correctly', () => {
        setup({ mockPermission: { ebenPaySplitExpGroupC: { view: true } }, isRebrand: true });

        const { getByText } = render(<PaySplitPercentageAllocationScreen />);
        expect(
          getByText('Use your Swag Spend account for all daily purchases and use it in our Perks Store.')
        ).toBeTruthy();
        expect(getByText('Maximise your Employment Hero benefits with this options')).toBeTruthy();
      });
    });

    describe('when rebranding is disabled', () => {
      it('should render correctly', () => {
        setup({ mockPermission: { ebenPaySplitExpGroupC: { view: true } } });

        const { getByText } = render(<PaySplitPercentageAllocationScreen />);
        expect(
          getByText('Use your Swag Spend account for all daily purchases and use it in our Swag Store.')
        ).toBeTruthy();
        expect(getByText('Maximise your Swag benefits with this options')).toBeTruthy();
      });
    });
  });
});
