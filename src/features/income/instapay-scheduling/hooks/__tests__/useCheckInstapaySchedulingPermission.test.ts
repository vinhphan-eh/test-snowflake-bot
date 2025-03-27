import { renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  InstapayErrorCode,
  mockGetAllInstapayRecurringByDaySubscriptionQuery,
  mockGetRecurringByDayVisibilityQuery,
  mockGetSchedulingSubscriptionsQuery,
} from '../../../../../new-graphql/generated';
import { aGetSchedulingSubscription } from '../../../../../new-graphql/mocks/generated-mocks';
import { TestInstaPayOrgKeyPayHasBalance } from '../../../instapay/utils/test-objects';
import { useCheckInstapaySchedulingPermission } from '../useCheckInstapaySchedulingPermission';

const mockedActiveSchedulingSubscription = aGetSchedulingSubscription();

describe('useCheckInstapaySchedulingPermission', () => {
  beforeEach(() => {
    mockServerNode.use(
      mockGetRecurringByDayVisibilityQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              featureVisibility: {
                recurringByDay: {
                  showRecurringByDay: false,
                },
              },
            },
          })
        );
      }),
      mockGetAllInstapayRecurringByDaySubscriptionQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              orgs: [
                {
                  uuid: 'testOrgUUID',
                  kpBusinessId: 0,
                  recurringByDay: {
                    currentSubscription: {
                      __typename: 'InstapayError',
                      code: InstapayErrorCode.Unspecified,
                    },
                  },
                },
              ],
            },
          })
        );
      })
    );
  });

  it('should return proper loading state if any of the check are pending', async () => {
    const result = renderHook(() =>
      useCheckInstapaySchedulingPermission({
        isLoadingOrgs: true,
        isErrorOrgs: false,
        visibilityCheckDetails: {
          isEligible: false,
          isLoading: true,
        },
      })
    );

    await waitFor(() => {
      expect(result.result.current.isLoading).toBeTruthy();
      expect(result.result.current.isRecurringByAmountVisible).toBeFalsy();
      expect(result.result.current.shouldShowRecurringTab).toBeFalsy();
    });
  });

  it('should return proper result for error state', async () => {
    const result = renderHook(() =>
      useCheckInstapaySchedulingPermission({
        isLoadingOrgs: true,
        isErrorOrgs: true,
        visibilityCheckDetails: {
          isEligible: false,
          isLoading: true,
        },
      })
    );

    await waitFor(() => {
      expect(result.result.current.isLoading).toBeFalsy();
      expect(result.result.current.isRecurringByAmountVisible).toBeFalsy();
      expect(result.result.current.shouldShowRecurringTab).toBeFalsy();
    });
  });

  describe('finished all the checks', () => {
    describe('check for Recurring tab visibility', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockGetSchedulingSubscriptionsQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  orgs: [],
                },
              })
            );
          })
        );
      });

      it('should show Recurring tab if user is eligible for Scheduling and not opted in', async () => {
        mockGetSchedulingSubscriptionsQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                orgs: [
                  {
                    uuid: TestInstaPayOrgKeyPayHasBalance.uuid,
                    kpBusinessId: TestInstaPayOrgKeyPayHasBalance.kpBusinessId,
                    instapay: {
                      schedulingSubscriptions: mockedActiveSchedulingSubscription,
                    },
                    id: 0,
                  },
                ],
              },
            })
          );
        });

        const result = renderHook(() =>
          useCheckInstapaySchedulingPermission({
            isLoadingOrgs: false,
            isErrorOrgs: false,
            visibilityCheckDetails: {
              isEligible: true,
              isLoading: false,
            },
          })
        );

        await waitFor(() => {
          expect(result.result.current.isRecurringByAmountVisible).toBeTruthy();
          expect(result.result.current.shouldShowRecurringTab).toBeTruthy();
        });
      });

      // Assumming if users' org is blacklisted from Recurring somehow after they successfully opted in to one,
      // we should still allow them to view the tab so they could interact to the existing subscription
      it('should show Recurring tab if user is having active Scheduling subscriptions even somehow ineligible through feature flag', async () => {
        mockServerNode.use(
          mockGetSchedulingSubscriptionsQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  orgs: [
                    {
                      uuid: TestInstaPayOrgKeyPayHasBalance.uuid,
                      kpBusinessId: TestInstaPayOrgKeyPayHasBalance.kpBusinessId,
                      instapay: {
                        schedulingSubscriptions: mockedActiveSchedulingSubscription,
                      },
                      id: 0,
                    },
                  ],
                },
              })
            );
          })
        );

        const result = renderHook(() =>
          useCheckInstapaySchedulingPermission({
            isLoadingOrgs: false,
            isErrorOrgs: false,
            visibilityCheckDetails: {
              isEligible: false,
              isLoading: false,
            },
          })
        );

        await waitFor(() => {
          expect(result.result.current.isRecurringByAmountVisible).toBeTruthy();
          expect(result.result.current.shouldShowRecurringTab).toBeTruthy();
        });
      });

      it('should not show Recurring if user is not eligible through feature flag and also having no active subscriptions', async () => {
        mockGetSchedulingSubscriptionsQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                orgs: [],
              },
            })
          );
        });

        const result = renderHook(() =>
          useCheckInstapaySchedulingPermission({
            isLoadingOrgs: false,
            isErrorOrgs: false,
            visibilityCheckDetails: {
              isEligible: false,
              isLoading: false,
            },
          })
        );

        await waitFor(() => {
          expect(result.result.current.isRecurringByAmountVisible).toBeFalsy();
          expect(result.result.current.shouldShowRecurringTab).toBeFalsy();
        });
      });
    });
  });
});
