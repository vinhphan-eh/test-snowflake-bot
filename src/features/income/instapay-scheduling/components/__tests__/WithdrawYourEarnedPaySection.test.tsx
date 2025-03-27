import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { InstapayErrorCode, mockGetRecurringByAmountEligibilityQuery } from '../../../../../new-graphql/generated';
import * as useSeenRecurringHowItWorksBts from '../../../instapay/hooks/useSeenRecurringHowItWorksBts';
import { mockedSharedIPSchedulingEventProperties } from '../../hooks/useInstaPaySchedulingEventTracking';
import { SWITCHED_TO_RECURRING_TAB, SWITCHED_TO_NOW_TAB } from '../../mixpanelEvents';
import * as useInstaPaySchedulingStore from '../../stores/useInstaPaySchedulingStore';
import { WithdrawYourEarnedPaySection } from '../WithdrawYourEarnedPaySection';

describe('WithdrawYourEarnedPaySection', () => {
  const mockSetEligibilityDetails = jest.fn();
  const mockedUseInstaPaySchedulingStore = {
    setEligibilityDetails: mockSetEligibilityDetails,
    setShouldShowCTA: jest.fn(),
    setCurrentSubscription: jest.fn(),
    setMembership: jest.fn(),
    setCurrentByDaySubscription: jest.fn(),
  } as never;

  beforeEach(() => {
    jest.spyOn(useSeenRecurringHowItWorksBts, 'useSeenRecurringHowItWorksBts').mockReturnValue({
      isSeen: true,
      setSeen: jest.fn(),
      hasHydrate: true,
    });
    jest
      .spyOn(useInstaPaySchedulingStore, 'useInstaPaySchedulingStore')
      .mockReturnValue(mockedUseInstaPaySchedulingStore);
  });

  describe('Recurring section', () => {
    it('should render Recurring section if fulfilled the condition', async () => {
      const { getByTestId, getByText } = render(
        <WithdrawYourEarnedPaySection
          openHowItWorksForByAmount={jest.fn()}
          shouldShowRecurringTab
          availableBalance={547.2}
          isLoadingSchedulingPermission={false}
        />
      );

      await waitFor(() => {
        expect(getByTestId('withdraw-your-earned-pay-recurring-section')).toBeTruthy();

        // Should show balance if selected Recurring section
        expect(getByText('Current earned pay')).toBeTruthy();
        expect(getByText('$547.20')).toBeTruthy();
      });
    });

    it('should not render Recurring section if violated any of the conditions', async () => {
      const { queryByTestId } = render(
        <WithdrawYourEarnedPaySection
          openHowItWorksForByAmount={jest.fn()}
          shouldShowRecurringTab={false}
          availableBalance={100}
          isLoadingSchedulingPermission={false}
        />
      );

      await waitFor(() => {
        expect(queryByTestId('withdraw-your-earned-pay-recurring-section')).not.toBeTruthy();
      });
    });

    it('should track Mixpanel event if switched to Recurring tab', async () => {
      const { getByTestId } = render(
        <WithdrawYourEarnedPaySection
          openHowItWorksForByAmount={jest.fn()}
          shouldShowRecurringTab
          availableBalance={547.2}
          isLoadingSchedulingPermission={false}
          shouldShowNowTab
        />
      );

      // Since we are showing Now tab, it will be the defaultly loaded one.
      // This step trigger a switch from Now tab to Recurring tab
      fireEvent.press(getByTestId('header-tab-Recurring'));

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties(),
          event: SWITCHED_TO_RECURRING_TAB,
        });
      });
    });

    it('should request showing extended version of Recurring How it works bottom sheet if switched to Recurring tab for the first time', async () => {
      jest.spyOn(useSeenRecurringHowItWorksBts, 'useSeenRecurringHowItWorksBts').mockReturnValue({
        isSeen: false,
        setSeen: jest.fn(),
        hasHydrate: true,
      });

      const mockedOpenRecurringHowItWorksBts = jest.fn();

      const { getByTestId } = render(
        <WithdrawYourEarnedPaySection
          openHowItWorksForByAmount={mockedOpenRecurringHowItWorksBts}
          shouldShowRecurringTab
          availableBalance={547.2}
          isLoadingSchedulingPermission={false}
          shouldShowNowTab
        />
      );

      // Since we are showing Now tab, it will be the defaultly loaded one.
      // This step trigger a switch from Now tab to Recurring tab
      fireEvent.press(getByTestId('header-tab-Recurring'));

      await waitFor(() => {
        expect(mockedOpenRecurringHowItWorksBts).toHaveBeenCalledWith(true);
      });
    });

    it('should store the eligibility details to scheduling store if fetched sucecssfully', async () => {
      mockServerNode.use(
        mockGetRecurringByAmountEligibilityQuery((_, res, ctx) =>
          res(
            ctx.data({
              me: {
                orgs: [
                  {
                    id: 1,
                    uuid: 'HR Org UUID1',
                    kpBusinessId: 0,
                    name: 'HR Org',
                    instapay: {
                      recurringByAmountEligibility: {
                        isEligible: true,
                      },
                    },
                  },
                  {
                    id: 2,
                    uuid: '',
                    kpBusinessId: 223344,
                    name: 'KP Org',
                    instapay: {
                      recurringByAmountEligibility: {
                        isEligible: false,
                        errorCode: InstapayErrorCode.RecurringByAmountHavingEffectiveDailySub,
                      },
                    },
                  },
                ],
              },
            })
          )
        )
      );

      render(
        <WithdrawYourEarnedPaySection
          openHowItWorksForByAmount={jest.fn()}
          isRecurringByAmountVisible
          availableBalance={547.2}
          isLoadingSchedulingPermission={false}
          shouldShowNowTab
        />
      );

      await waitFor(() => {
        expect(mockSetEligibilityDetails).toHaveBeenCalledWith([
          {
            orgId: 'HR Org UUID1',
            isEligible: true,
          },
          {
            orgId: '223344',
            isEligible: false,
            errorCode: InstapayErrorCode.RecurringByAmountHavingEffectiveDailySub,
          },
        ]);
      });
    });
  });

  describe('Now section', () => {
    it('should track Mixpanel event if switched to Now tab', async () => {
      const { getByTestId } = render(
        <WithdrawYourEarnedPaySection
          openHowItWorksForByAmount={jest.fn()}
          availableBalance={123.45}
          isLoadingSchedulingPermission={false}
          shouldShowNowTab
          shouldShowRecurringTab
        />
      );

      /**
       * The expectation is not tracking the switch event on loaded. In order to verify the track when switched to Now tab,
       * we need to switch from Now (default tab) to another tab first then switching back
       */
      fireEvent.press(getByTestId('header-tab-Now'));

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties(),
          event: SWITCHED_TO_NOW_TAB,
        });
      });
    });
  });
});
