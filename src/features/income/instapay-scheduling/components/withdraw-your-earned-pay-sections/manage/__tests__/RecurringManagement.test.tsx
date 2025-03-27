import React from 'react';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render, renderHook, waitFor } from '../../../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../../../mock-server/mockServerNode';
import {
  CurrencyType,
  mockCancelRecurringByDayMutation,
  mockCancelSchedulingSubscriptionMutation,
  mockGetBankAccountsForOrgQuery,
  RecurringSubscriptionStatus,
  Sign,
  Weekday,
} from '../../../../../../../new-graphql/generated';
import { anInstapayBankAccount } from '../../../../../../../new-graphql/mocks/generated-mocks';
import type { SchedulingSubscriptionWithOrgDetails } from '../../../../hooks/useCheckInstapaySchedulingPermission';
import { mockedSharedIPSchedulingEventProperties } from '../../../../hooks/useInstaPaySchedulingEventTracking';
import {
  CLICKED_ON_CANCEL_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
  CONFIRMED_RECURRING_WITHDRAWAL_CANCELLATION,
} from '../../../../mixpanelEvents';
import { useInstaPaySchedulingStore } from '../../../../stores/useInstaPaySchedulingStore';
import { RecurringManagement } from '../RecurringManagement';

jest.mock('@braze/react-native-sdk', () => ({
  setCustomUserAttribute: jest.fn(),
}));

describe('RecurringManagement', () => {
  const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());

  beforeEach(() => {
    schedulingStore.current.setCurrentSubscription({
      amount: {
        type: CurrencyType.CurrencyTypeAud,
        units: 50,
        subUnits: 0,
      },
    } as SchedulingSubscriptionWithOrgDetails);

    mockServerNode.use(
      mockGetBankAccountsForOrgQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              org: {
                instapay: {
                  bankAccounts: [
                    {
                      ...anInstapayBankAccount(),
                      isSSA: false,
                    },
                  ],
                },
              },
            },
          })
        );
      })
    );
  });

  it('should render correctly when not opened', async () => {
    const { queryByText } = render(<RecurringManagement open={false} onCloseBts={() => {}} />);

    expect(queryByText('Manage')).toBeFalsy();
    expect(queryByText('Confirmation')).toBeFalsy();
  });

  it('should render correctly when opened', async () => {
    const { queryByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

    expect(queryByText('Manage')).toBeTruthy();
    expect(queryByText('Confirmation')).toBeFalsy();
  });

  it('on clicked History should navigate to history screen', async () => {
    const { getByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

    fireEvent.press(getByText('Earned Pay history'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SupportStack', {
        screen: 'InstaPayHistory',
      });
    });
  });

  it('on clicked Push Notifications should navigate to EWA Push Notification management screen', async () => {
    const { getByText } = render(<RecurringManagement open onCloseBts={jest.fn()} />);

    fireEvent.press(getByText('Push Notifications'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('IncomeStack', {
        screen: 'EWAPushNotificationManagement',
        params: {},
      });
    });
  });

  describe('recurring withdrawal cancellation', () => {
    describe('on clicked Cancel', () => {
      it('should show correct cancel confirmation', async () => {
        const { getByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

        fireEvent.press(getByText('Cancel recurring withdrawal'));

        await waitFor(() => {
          expect(getByText('Confirmation')).toBeTruthy();
          expect(getByText('Are you sure you want to continue cancelling recurring withdrawal?')).toBeTruthy();
        });
      });

      describe('on by_amount flow', () => {
        describe('when confirmed', () => {
          beforeEach(() => {
            mockServerNode.use(
              mockCancelSchedulingSubscriptionMutation((_, res, ctx) => {
                return res(
                  ctx.data({
                    instapay: {
                      cancelSchedulingSubscription: {
                        success: true,
                      },
                    },
                  })
                );
              })
            );
          });

          it('api success and navigate to success screen', async () => {
            const { getByTestId, getByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

            fireEvent.press(getByText('Cancel recurring withdrawal'));

            await waitFor(() => {
              expect(getByTestId('scheduling-cancellation-confirmation-yes')).toBeTruthy();
              expect(mockedEventTracking).toHaveBeenCalledWith({
                ...mockedSharedIPSchedulingEventProperties({
                  amount: expect.anything(),
                }),
                event: CLICKED_ON_CANCEL_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
              });
            });

            fireEvent.press(getByTestId('scheduling-cancellation-confirmation-yes'));

            await waitFor(() => {
              expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
                screen: 'InstaPaySchedulingSuccess',
                params: {
                  formattedAmount: '$50.00',
                  action: 'cancellation',
                },
              });
              expect(mockedEventTracking).toHaveBeenCalledWith({
                ...mockedSharedIPSchedulingEventProperties(),
                event: CONFIRMED_RECURRING_WITHDRAWAL_CANCELLATION,
              });
            });
          });

          it('api error and navigate to error screen', async () => {
            mockServerNode.use(
              mockCancelSchedulingSubscriptionMutation((_, res, ctx) => {
                return res(
                  ctx.data({
                    instapay: {
                      cancelSchedulingSubscription: {
                        success: false,
                      },
                    },
                  })
                );
              })
            );
            const { getByTestId, getByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

            fireEvent.press(getByText('Cancel recurring withdrawal'));

            await waitFor(() => {
              expect(getByTestId('scheduling-cancellation-confirmation-yes')).toBeTruthy();
            });

            fireEvent.press(getByTestId('scheduling-cancellation-confirmation-yes'));

            await waitFor(() => {
              expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
                screen: 'InstaPaySchedulingError',
              });
            });
          });
        });
      });

      describe('when confirmed on by_day flow', () => {
        beforeEach(() => {
          schedulingStore.current.setCurrentSubscription(undefined);

          schedulingStore.current.setCurrentByDaySubscription({
            minimumPayAmount: { units: 100, type: CurrencyType.CurrencyTypeAud, subUnits: 0, sign: Sign.Positive },
            maximumPayAmount: { units: 150, type: CurrencyType.CurrencyTypeAud, subUnits: 0, sign: Sign.Positive },
            payDay: Weekday.Wednesday,
            bankAccountExternalId: '123',
            status: RecurringSubscriptionStatus.Active,
            minPayAmount: 100,
            maxPayAmount: 150,
            id: '1',
            organisationId: 'kpOrg1',
          });
          mockServerNode.use(
            mockCancelRecurringByDayMutation((_, res, ctx) => {
              return res(
                ctx.data({
                  recurringByDay: {
                    cancelRecurringByDay: {
                      success: true,
                    },
                  },
                })
              );
            })
          );
        });

        it('api success and navigate to success screen', async () => {
          const { getByTestId, getByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

          fireEvent.press(getByText('Cancel recurring withdrawal'));

          await waitFor(() => {
            expect(getByTestId('scheduling-cancellation-confirmation-yes')).toBeTruthy();
            expect(mockedEventTracking).toHaveBeenCalledWith({
              ...mockedSharedIPSchedulingEventProperties({
                amount: expect.anything(),
              }),
              event: CLICKED_ON_CANCEL_FROM_RECURRING_WITHDRAWAL_MODIFICATION,
            });
          });

          fireEvent.press(getByTestId('scheduling-cancellation-confirmation-yes'));

          await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
              screen: 'InstaPaySchedulingSuccess',
              params: {
                formattedAmount: '',
                action: 'cancellation',
              },
            });
            expect(mockedEventTracking).toHaveBeenCalledWith({
              ...mockedSharedIPSchedulingEventProperties(),
              event: CONFIRMED_RECURRING_WITHDRAWAL_CANCELLATION,
            });
          });
        });

        it('api error and navigate to error screen', async () => {
          mockServerNode.use(
            mockCancelRecurringByDayMutation((_, res, ctx) => {
              return res(
                ctx.data({
                  recurringByDay: {
                    cancelRecurringByDay: {
                      success: false,
                    },
                  },
                })
              );
            })
          );
          const { getByTestId, getByText } = render(<RecurringManagement open onCloseBts={() => {}} />);

          fireEvent.press(getByText('Cancel recurring withdrawal'));

          await waitFor(() => {
            expect(getByTestId('scheduling-cancellation-confirmation-yes')).toBeTruthy();
          });

          fireEvent.press(getByTestId('scheduling-cancellation-confirmation-yes'));

          await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
              screen: 'InstaPaySchedulingError',
            });
          });
        });
      });
    });
  });
});
