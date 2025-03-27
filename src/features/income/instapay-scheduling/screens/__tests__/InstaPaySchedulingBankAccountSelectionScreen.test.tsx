import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockGetBankAccountsForOrgQuery, Weekday } from '../../../../../new-graphql/generated';
import { InstaPayIntroSource } from '../../../instapay/navigation/navigationTypes';
import { TestInstaPayOrgKeyPayHasBalance } from '../../../instapay/utils/test-objects';
import { mockedSharedIPSchedulingEventProperties } from '../../hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_ON_NEXT_FROM_RECURRING_BANK_SELECTION_SCREEN } from '../../mixpanelEvents';
import { mockedNonSSABankAccount, mockedSSABankAccount } from '../../mocks/bankAccountEntriesMocks';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import { InstaPaySchedulingBankAccountSelectionScreen } from '../InstaPaySchedulingBankAccountSelectionScreen';

describe('InstaPaySchedulingConfirmationScreen', () => {
  describe('successfully loaded bank accounts list', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockGetBankAccountsForOrgQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                org: {
                  instapay: {
                    bankAccounts: [mockedSSABankAccount, mockedNonSSABankAccount],
                  },
                },
              },
            })
          );
        })
      );

      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      act(() => {
        schedulingStore.current.setAmount(123.45);
        schedulingStore.current.setBankAccount(mockedNonSSABankAccount);
        schedulingStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
      });
    });

    describe('On recurring by amount flow', () => {
      it('should render and handle navigation while pressed on Next properly if conditions are met', async () => {
        const { findAllByLabelText, getByText } = render(<InstaPaySchedulingBankAccountSelectionScreen />);

        const allBankAccountOptions = await findAllByLabelText('radio-card-item');
        expect(allBankAccountOptions).toHaveLength(2);

        await waitFor(() => {
          expect(getByText("You've selected to withdraw every $123.45 you earn."));
        });

        fireEvent.press(getByText('Next'));

        await waitFor(() => {
          expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
            screen: 'InstaPaySchedulingConfirmation',
          });
          expect(mockedEventTracking).toHaveBeenCalledWith({
            ...mockedSharedIPSchedulingEventProperties({
              amount: 123.45,
              recurringType: 'by_amount',
            }),
            event: CLICKED_ON_NEXT_FROM_RECURRING_BANK_SELECTION_SCREEN,
          });
        });
      });
    });

    describe('On recurring by day flow', () => {
      beforeEach(() => {
        const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());

        act(() => {
          schedulingStore.current.setPayDay(Weekday.Monday);
          schedulingStore.current.setMaxAmount(100);
          schedulingStore.current.setAmount(undefined);
        });
      });

      it('should render and handle navigation while pressed on Next properly if conditions are met', async () => {
        const { findAllByLabelText, getByText } = render(<InstaPaySchedulingBankAccountSelectionScreen />);

        const allBankAccountOptions = await findAllByLabelText('radio-card-item');
        expect(allBankAccountOptions).toHaveLength(2);

        await waitFor(() => {
          expect(getByText("You've selected to withdraw $100.00 weekly."));
        });

        fireEvent.press(getByText('Next'));

        await waitFor(() => {
          expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
            screen: 'InstaPaySchedulingConfirmation',
          });
          expect(mockedEventTracking).toHaveBeenCalledWith({
            ...mockedSharedIPSchedulingEventProperties({
              amount: 100,
              recurringType: 'by_day',
            }),
            event: CLICKED_ON_NEXT_FROM_RECURRING_BANK_SELECTION_SCREEN,
          });
        });
      });
    });

    it('should navigate properly to carousel if pressed on Info icon', async () => {
      const { findAllByLabelText, getByTestId } = render(<InstaPaySchedulingBankAccountSelectionScreen />);

      const allBankAccountOptions = await findAllByLabelText('radio-card-item');
      expect(allBankAccountOptions).toHaveLength(2);

      fireEvent.press(getByTestId('topbar-right-icon'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('IncomeStack', {
          screen: 'InstaPayIntroV2',
          params: {
            source: InstaPayIntroSource.WITHDRAW_RECURRING,
          },
        });
      });
    });
  });

  /**
   * Note: There are multiple scenarios when this condition could be achieved (loading, error while fetching, receiving an empty
   * bank accounts list), however the test for each scenario would be covered inside the test suite for the Bank Accounts listing
   * component. Within the scope of this test suite, only verify the case of not being able to store first bank account by default
   */
  it('should disable Next button and not navigating on pressed if failed to set first bank account to store by default', async () => {
    // Mock one of the scenarios
    mockServerNode.use(
      mockGetBankAccountsForOrgQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              org: {
                instapay: {
                  bankAccounts: [],
                },
              },
            },
          })
        );
      })
    );

    const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
    act(() => {
      schedulingStore.current.setAmount(123.45);
      schedulingStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
    });

    const { getByText } = render(<InstaPaySchedulingBankAccountSelectionScreen />);

    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
