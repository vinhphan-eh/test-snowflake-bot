import React from 'react';
import {
  INSTAPAY_TIMESHEET_POLICY_WARNING,
  INSTAPAY_TRANSACTION_BLOCKED_MESSAGE,
} from '../../../../common/constants/instapay';
import { mockReturnIncomeVisibility } from '../../../../common/hooks/__mocks__/useIncomeVisibility';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode as mockServer } from '../../../../mock-server/mockServerNode';
import { InstapayErrorCode, mockGetAllInstapayAvailableBalancesQuery } from '../../../../new-graphql/generated';
import * as useSeenEstimatedIncomeHowItWorksBts from '../../instapay/hooks/useSeenEstimatedIncomeHowItWorksBts';
import { useInstaPayDrawdownStore } from '../../instapay/stores/useInstaPayDrawdownStore';
import { TestInstaPayOrgKeyPayHasBalance } from '../../instapay/utils/test-objects';
import * as useCheckInstapaySchedulingPermission from '../../instapay-scheduling/hooks/useCheckInstapaySchedulingPermission';
import * as useSeenPaySplitIntro from '../../pay-split/hooks/useSeenPaySplitIntro';
import { IncomeDashboardScreen } from '../IncomeDashboardScreen';

jest.mock('@braze/react-native-sdk', () => ({
  setCustomUserAttribute: jest.fn(),
}));

describe('Income Dashboard V2 Screen', () => {
  beforeEach(() => {
    mockReturnIncomeVisibility({
      showIncomeTab: true,
      showInstapay: true,
      showInstapayNowUsageIncentiveV2: true,
      showInstapayEstimatedIncome: true,
    });

    jest.spyOn(useSeenPaySplitIntro, 'useSeenPaySplitIntro').mockReturnValue({
      hasUserSeenThis: async () => true,
      markSeen: async () => {},
    });

    jest.spyOn(useSeenEstimatedIncomeHowItWorksBts, 'useSeenEstimatedIncomeHowItWorksBts').mockReturnValue({
      isSeen: true,
      setSeen: jest.fn(),
      hasHydrate: true,
    });
  });

  describe('InstaPay title', () => {
    describe('Available balance description', () => {
      describe('Error message', () => {
        it.each`
          errorCode                                      | errorMessage
          ${InstapayErrorCode.ApprovedTimesheetNotFound} | ${INSTAPAY_TIMESHEET_POLICY_WARNING}
          ${InstapayErrorCode.TransactionBlocked}        | ${INSTAPAY_TRANSACTION_BLOCKED_MESSAGE}
        `('should render correct error message mapping for error $errorCode', async ({ errorCode, errorMessage }) => {
          mockServer.use(
            mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
              return res(
                ctx.data({
                  me: {
                    orgs: [
                      {
                        id: 1,
                        uuid: '1',
                        kpBusinessId: 0,
                        name: 'Org 1',
                        instapay: {
                          balance: {
                            __typename: 'InstapayError',
                            code: errorCode,
                          },
                          withdrawalLimit: {
                            __typename: 'InstapayWithdrawalLimit',
                            withdrawalMinLimit: 1,
                            withdrawalMaxLimit: 2,
                            schedulingWithdrawalMinLimit: 1,
                          },
                        },
                      },
                    ],
                  },
                })
              );
            })
          );
          const { findByText } = render(<IncomeDashboardScreen />);
          await act(() => jest.advanceTimersByTime(2000));

          const message = await findByText(errorMessage);
          expect(message).toBeTruthy();
        });

        it(
          'should show pay cycle warning alert when one org in pay cycle policy violation and ' +
            'show pay run instruction bottom sheet when user click learn more link in pay cycle warning alert',
          async () => {
            mockServer.use(
              mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
                return res(
                  ctx.data({
                    me: {
                      orgs: [
                        {
                          id: 1,
                          uuid: '1',
                          kpBusinessId: 0,
                          name: 'Org 1',
                          instapay: {
                            balance: {
                              __typename: 'InstapayError',
                              code: InstapayErrorCode.PaymentDateRestricted,
                            },
                            withdrawalLimit: {
                              __typename: 'InstapayWithdrawalLimit',
                              withdrawalMinLimit: 1,
                              withdrawalMaxLimit: 2,
                              schedulingWithdrawalMinLimit: 1,
                            },
                          },
                        },
                      ],
                    },
                  })
                );
              })
            );
            const { findByTestId } = render(<IncomeDashboardScreen />);
            await act(() => jest.advanceTimersByTime(2000));

            const learnMoreLinkInWarningAlert = await findByTestId('instapay-pay-cycle-learn-more');
            expect(learnMoreLinkInWarningAlert).toBeTruthy(); // warning alert exists

            fireEvent.press(learnMoreLinkInWarningAlert);
            const bsIPPayRunInstruction = await findByTestId('bs-ip-pay-run-instruction');
            expect(bsIPPayRunInstruction).toBeTruthy(); // bs's been showed
          }
        );
      });

      it('should show correct description when balance is below minimum amount', async () => {
        mockServer.use(
          mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  orgs: [
                    {
                      id: 0,
                      uuid: '0',
                      kpBusinessId: 2,
                      name: 'Org 1',
                      member: {
                        ehMemberUuid: '1',
                        kpEmployeeId: 0,
                        work_country: 'AU',
                      },
                      instapay: {
                        balance: {
                          __typename: 'InstapayBalance',
                          id: '1',
                          balance: 50,
                        },
                        withdrawalLimit: {
                          __typename: 'InstapayWithdrawalLimit',
                          withdrawalMaxLimit: 1000,
                          withdrawalMinLimit: 100,
                          schedulingWithdrawalMinLimit: 100,
                        },
                      },
                    },
                    {
                      id: 0,
                      uuid: '0',
                      kpBusinessId: 2,
                      name: 'Org 2',
                      instapay: {
                        balance: {
                          __typename: 'InstapayBalance',
                          id: '1',
                          balance: 40,
                        },
                        withdrawalLimit: {
                          __typename: 'InstapayWithdrawalLimit',
                          withdrawalMaxLimit: 1000,
                          withdrawalMinLimit: 100,
                          schedulingWithdrawalMinLimit: 100,
                        },
                      },
                    },
                  ],
                },
              })
            );
          })
        );

        const screen = render(<IncomeDashboardScreen />);
        const description = await screen.findByText('Your balance is still growing');
        expect(description).toBeTruthy();
      });

      it('should show correct description when balance is ready', async () => {
        mockServer.use(
          mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  orgs: [
                    {
                      id: 0,
                      uuid: '0',
                      kpBusinessId: 2,
                      name: 'Org 1',
                      member: {
                        ehMemberUuid: '1',
                        kpEmployeeId: 0,
                        work_country: 'AU',
                      },
                      instapay: {
                        balance: {
                          __typename: 'InstapayBalance',
                          id: '1',
                          balance: 110,
                        },
                        withdrawalLimit: {
                          __typename: 'InstapayWithdrawalLimit',
                          withdrawalMaxLimit: 1000,
                          withdrawalMinLimit: 100,
                          schedulingWithdrawalMinLimit: 100,
                        },
                      },
                    },
                    {
                      id: 0,
                      uuid: '0',
                      kpBusinessId: 2,
                      name: 'Org 2',
                      instapay: {
                        balance: {
                          __typename: 'InstapayBalance',
                          id: '1',
                          balance: 110,
                        },
                        withdrawalLimit: {
                          __typename: 'InstapayWithdrawalLimit',
                          withdrawalMaxLimit: 1000,
                          withdrawalMinLimit: 100,
                          schedulingWithdrawalMinLimit: 100,
                        },
                      },
                    },
                  ],
                },
              })
            );
          })
        );

        const screen = render(<IncomeDashboardScreen />);

        const expectedBalanceAmount = await screen.findByText('$110');
        expect(expectedBalanceAmount).toBeTruthy();
      });
    });
  });

  describe('InstaPay withdraw your earned pay section', () => {
    describe('Loading state', () => {
      it('should show spinner if loading for the visibility of different tiles', () => {
        mockReturnIncomeVisibility({ isLoading: true });

        jest.spyOn(useCheckInstapaySchedulingPermission, 'useCheckInstapaySchedulingPermission').mockReturnValue({
          isLoading: true,
          isRecurringByAmountVisible: false,
          activeSchedulingSubscriptions: [],
          shouldShowRecurringTab: false,
          showRecurringByDayOnboarding: false,
        });

        const { getByTestId } = render(<IncomeDashboardScreen />);
        expect(getByTestId('withdraw-your-earned-pay-section-spinner')).toBeTruthy();
      });
    });

    describe('Recurring tab', () => {
      it('should render if fulfill the condition to show Recurring tab', async () => {
        jest.spyOn(useCheckInstapaySchedulingPermission, 'useCheckInstapaySchedulingPermission').mockReturnValue({
          isLoading: false,
          isRecurringByAmountVisible: true,
          activeSchedulingSubscriptions: [],
          shouldShowRecurringTab: true,
          showRecurringByDayOnboarding: false,
        });

        const screen = render(<IncomeDashboardScreen />);
        expect(screen.getByTestId('header-tab-Recurring')).toBeTruthy();
      });

      it('should not render if not permitted for Recurring', async () => {
        jest.spyOn(useCheckInstapaySchedulingPermission, 'useCheckInstapaySchedulingPermission').mockReturnValue({
          isLoading: false,
          isRecurringByAmountVisible: true,
          activeSchedulingSubscriptions: [],
          shouldShowRecurringTab: false,
          showRecurringByDayOnboarding: false,
        });

        const screen = render(<IncomeDashboardScreen />);
        expect(screen.queryByTestId('header-tab-Recurring')).not.toBeTruthy();
      });
    });
  });

  describe('Estimated income bottom sheet not seen by user', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    beforeEach(async () => {
      jest.spyOn(useSeenEstimatedIncomeHowItWorksBts, 'useSeenEstimatedIncomeHowItWorksBts').mockReturnValue({
        isSeen: false,
        setSeen: jest.fn(),
        hasHydrate: true,
      });

      jest.spyOn(useCheckInstapaySchedulingPermission, 'useCheckInstapaySchedulingPermission').mockReturnValue({
        isLoading: true,
        isRecurringByAmountVisible: false,
        activeSchedulingSubscriptions: [],
        shouldShowRecurringTab: false,
        showRecurringByDayOnboarding: false,
      });
    });

    it('should automatically show the bottom sheet if user is eligible to see the estimated income tile', async () => {
      mockReturnIncomeVisibility({
        showIncomeTab: true,
        showInstapay: true,
        showInstapayNowUsageIncentiveV2: true,
        showInstapayEstimatedIncome: true,
      });

      const { getByTestId } = render(<IncomeDashboardScreen />);

      await act(() => jest.advanceTimersByTime(2000));

      expect(getByTestId('estimated-income-tile-bts')).toBeTruthy();
    });

    it('should not automatically show the bottom sheet if user is not eligible to see estimated income tile', async () => {
      mockReturnIncomeVisibility({
        showIncomeTab: true,
        showInstapay: true,
        showInstapayNowUsageIncentiveV2: true,
        showInstapayEstimatedIncome: false,
      });

      const { queryByTestId } = render(<IncomeDashboardScreen />);

      await act(() => jest.advanceTimersByTime(1000));

      expect(queryByTestId('estimated-income-tile-bts')).not.toBeTruthy();
    });
  });

  describe('Update work country on switching org', () => {
    it('should update currency when switching org', async () => {
      jest.spyOn(useCheckInstapaySchedulingPermission, 'useCheckInstapaySchedulingPermission').mockReturnValue({
        isLoading: true,
        isRecurringByAmountVisible: false,
        activeSchedulingSubscriptions: [],
        shouldShowRecurringTab: false,
        showRecurringByDayOnboarding: false,
      });

      const org2 = {
        ...TestInstaPayOrgKeyPayHasBalance,
        member: {
          ehMemberUuid: '3',
          kpEmployeeId: 0,
          work_country: 'GB',
        },
      };
      mockServer.use(
        mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                orgs: [
                  {
                    id: 0,
                    uuid: '0',
                    kpBusinessId: 2,
                    name: 'Org 1',
                    member: {
                      ehMemberUuid: '1',
                      kpEmployeeId: 0,
                      work_country: 'AU',
                    },
                    instapay: {
                      balance: {
                        __typename: 'InstapayBalance',
                        id: '1',
                        balance: 110,
                      },
                      withdrawalLimit: {
                        __typename: 'InstapayWithdrawalLimit',
                        withdrawalMaxLimit: 1000,
                        withdrawalMinLimit: 100,
                        schedulingWithdrawalMinLimit: 100,
                      },
                    },
                  },
                  org2,
                ],
              },
            })
          );
        })
      );
      const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());

      const screen = render(<IncomeDashboardScreen />);
      await act(() => jest.advanceTimersByTime(2000));

      expect(screen.queryByText('$110')).toBeTruthy();
      drawdownStore.current.setMembership(org2);
      await waitFor(() => {
        expect(screen.getByText('£110.00')).toBeTruthy();
      });
    });
  });
});
