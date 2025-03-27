import React from 'react';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { render, renderHook, userEvent, waitFor } from '../../../../../../../common/utils/testing';
import { CurrencyType } from '../../../../../../../new-graphql/generated';
import type { SchedulingSubscriptionWithOrgDetails } from '../../../../hooks/useCheckInstapaySchedulingPermission';
import { useInstaPaySchedulingStore } from '../../../../stores/useInstaPaySchedulingStore';
import {
  useWithdrawYourEarnedPaySectionStore,
  WithdrawYourEarnedPaySectionKey,
} from '../../../../stores/useWithdrawYourEarnedPaySectionStore';
import { WithdrawYourEarnedPayManagement } from '../WithdrawYourEarnedPayManagement';

describe('WithdrawYourEarnedPayManagement', () => {
  describe('Now', () => {
    beforeEach(() => {
      const { result: sectionStore } = renderHook(() => useWithdrawYourEarnedPaySectionStore());
      sectionStore.current.setSelectedTabKey(WithdrawYourEarnedPaySectionKey.NOW);
    });

    it('on clicked should navigate to History screen', async () => {
      const { getByTestId } = render(<WithdrawYourEarnedPayManagement />);

      await userEvent.press(getByTestId('ewa-manage'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('SupportStack', {
          screen: 'InstaPayHistory',
        });
      });
    });
  });

  describe('Recurring', () => {
    beforeEach(() => {
      const { result: sectionStore } = renderHook(() => useWithdrawYourEarnedPaySectionStore());
      sectionStore.current.setSelectedTabKey(WithdrawYourEarnedPaySectionKey.RECURRING);
    });

    it('on clicked should navigate to History screen', async () => {
      const { getByTestId } = render(<WithdrawYourEarnedPayManagement />);

      await userEvent.press(getByTestId('ewa-manage'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('SupportStack', {
          screen: 'InstaPayHistory',
        });
      });
    });

    describe('when having subscription', () => {
      beforeEach(() => {
        const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
        schedulingStore.current.setCurrentSubscription({
          amount: {
            type: CurrencyType.CurrencyTypeAud,
            units: 50,
            subUnits: 0,
          },
        } as SchedulingSubscriptionWithOrgDetails);
      });

      it('on clicked should display Recurring management', async () => {
        const { getByTestId, getByText } = render(<WithdrawYourEarnedPayManagement />);

        await userEvent.press(getByTestId('ewa-manage'));
        await waitFor(() => {
          expect(getByText('Cancel recurring withdrawal')).toBeTruthy();
        });
      });
    });
  });
});
