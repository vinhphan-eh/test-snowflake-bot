import React from 'react';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  CurrencyType,
  FeeType,
  InstapayBankAccountSource,
  mockCreateSchedulingSubscriptionMutation,
  mockSubscribeRecurringByDayMutation,
  mockUpdateRecurringByDayMutation,
  mockUpdateSchedulingSubscriptionMutation,
  RecurringSubscriptionStatus,
  Sign,
  Weekday,
} from '../../../../../new-graphql/generated';
import { TestInstaPayOrgKeyPayHasBalance } from '../../../instapay/utils/test-objects';
import { INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL, MAX_RECURRING_BY_DAY_AMOUNT } from '../../constants';
import { mockedSharedIPSchedulingEventProperties } from '../../hooks/useInstaPaySchedulingEventTracking';
import { CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN } from '../../mixpanelEvents';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import { InstaPaySchedulingConfirmationScreen } from '../InstaPaySchedulingConfirmationScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseInAppBrowser = useInAppBrowser as jest.MockedFn<typeof useInAppBrowser>;
jest.mock('../../../../../common/shared-hooks/useInAppBrowser');
const mockedOpenUrl = jest.fn();

jest.mock('@braze/react-native-sdk', () => ({
  setCustomUserAttribute: jest.fn(),
}));

describe('InstaPaySchedulingConfirmationScreen', () => {
  beforeEach(() => {
    mockUseInAppBrowser.mockReturnValue({
      openUrl: mockedOpenUrl,
    });

    const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
    act(() => {
      schedulingStore.current.setAmount(400);
      schedulingStore.current.setBankAccount({
        accountNumber: '1234567890',
        bsb: '246579',
        accountName: 'Account Name',
        bankAccountSource: InstapayBankAccountSource.Eh,
        feeV2: {
          type: FeeType.Percentage,
          percentage: 1.5,
        },
        externalId: '0',
        isSSA: false,
      });
      schedulingStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
    });

    mockedUseRoute.mockReturnValue({
      key: '',
      name: '',
    });
  });

  describe('on recurring by day flow', () => {
    beforeEach(() => {
      mockUseInAppBrowser.mockReturnValue({
        openUrl: mockedOpenUrl,
      });

      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      act(() => {
        schedulingStore.current.setAmount(undefined);
        schedulingStore.current.setMaxAmount(400);
        schedulingStore.current.setPayDay(Weekday.Monday);

        schedulingStore.current.setBankAccount({
          accountNumber: '1234567890',
          bsb: '246579',
          accountName: 'Account Name',
          bankAccountSource: InstapayBankAccountSource.Eh,
          feeV2: {
            type: FeeType.Percentage,
            percentage: 1.5,
          },
          externalId: '0',
          isSSA: false,
        });
        schedulingStore.current.setMembership(TestInstaPayOrgKeyPayHasBalance);
      });

      mockServerNode.use(
        mockSubscribeRecurringByDayMutation((_, res, ctx) => {
          return res(
            ctx.data({
              recurringByDay: {
                subscribeRecurringByDay: {
                  success: true,
                },
              },
            })
          );
        })
      );
    });

    describe('when input fixed amount', () => {
      it('should render correctly', async () => {
        const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);
        await waitFor(() => {
          expect(getByText('You’ll receive')).toBeTruthy();
          expect(getByText('$400')).toBeTruthy();
          expect(getByText(`Weekly on Monday at 9pm`)).toBeTruthy();

          expect(getByText('Into this account')).toBeTruthy();
          expect(getByText('Account Name\n246-579 1234567890')).toBeTruthy();

          expect(
            getByText(`You’ll pay a $6.00 fee, a total of $406.00 will be deducted from your payslip.`)
          ).toBeTruthy();
          expect(
            getByText(
              'By confirming, you agree to our Perks and Earned Wage Access Terms and Conditions for scheduled withdrawals. These transactions will show as a deduction on your payslip from Test Org.'
            )
          ).toBeTruthy();
          expect(getByText('Confirm')).toBeTruthy();
        });
      });
    });

    describe('when input any available balance', () => {
      beforeEach(() => {
        const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
        act(() => {
          schedulingStore.current.setAmount(undefined);
          schedulingStore.current.setMaxAmount(MAX_RECURRING_BY_DAY_AMOUNT);
        });
      });
      it('should render correctly', async () => {
        const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);
        await waitFor(() => {
          expect(getByText('You’ll receive')).toBeTruthy();
          expect(getByText('Any available balance')).toBeTruthy();
          expect(getByText(`Weekly on Monday at 9pm`)).toBeTruthy();

          expect(getByText('Into this account')).toBeTruthy();
          expect(getByText('Account Name\n246-579 1234567890')).toBeTruthy();

          expect(getByText(` You'll pay a 1.5% fee which will be deducted from your payslip.`)).toBeTruthy();
          expect(
            getByText(
              'By confirming, you agree to our Perks and Earned Wage Access Terms and Conditions for scheduled withdrawals. These transactions will show as a deduction on your payslip from Test Org.'
            )
          ).toBeTruthy();
          expect(getByText('Confirm')).toBeTruthy();
        });
      });
    });

    describe('when input first payment date', () => {
      const today = new Date();

      beforeEach(() => {
        const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
        act(() => {
          schedulingStore.current.setAmount(undefined);
          schedulingStore.current.setMaxAmount(MAX_RECURRING_BY_DAY_AMOUNT);
          schedulingStore.current.setFirstPaymentDate(today);
        });
      });
      it('should render correctly', async () => {
        const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);
        await waitFor(() => {
          expect(getByText('You’ll receive')).toBeTruthy();
          expect(getByText('Any available balance')).toBeTruthy();
          expect(getByText(`Weekly on Monday at 9pm starting ${dayjs(today).format('DD/MM/YYYY')}`)).toBeTruthy();
        });
      });
    });

    describe('when created successfully', () => {
      it('should navigate to success screen', async () => {
        const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

        fireEvent.press(getByText('Confirm'));

        await waitFor(() => {
          expect(mockedEventTracking).toHaveBeenCalledWith({
            ...mockedSharedIPSchedulingEventProperties({
              amount: 400,
              recurringType: 'by_day',
            }),
            event: CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN,
          });
          expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingSuccess', {
            formattedAmount: '$400',
            action: 'byDayCreation',
            orgId: '123',
            payDay: 'Monday',
          });
        });
      });
    });

    describe('when update successfully', () => {
      it('should navigate to success screen', async () => {
        const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
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
          mockUpdateRecurringByDayMutation((_, res, ctx) => {
            return res(
              ctx.data({
                recurringByDay: {
                  updateRecurringByDay: {
                    success: true,
                  },
                },
              })
            );
          })
        );

        const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

        fireEvent.press(getByText('Confirm'));

        await waitFor(() => {
          expect(mockedEventTracking).toHaveBeenCalledWith({
            ...mockedSharedIPSchedulingEventProperties({
              amount: 400,
              recurringType: 'by_day',
            }),
            event: CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN,
          });
          expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingSuccess', {
            formattedAmount: '$400',
            orgId: '123',
            action: 'byDayModification',
            payDay: 'Monday',
          });
        });
      });
    });
  });

  describe('should render page properly on recurring by amount flow', () => {
    it('if not requested to show IPD subscription pending warning', async () => {
      const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

      await waitFor(() => {
        expect(getByText('Please confirm your ongoing withdrawal request.')).toBeTruthy();
        expect(getByText('You’ll receive')).toBeTruthy();
        expect(getByText('$400.00')).toBeTruthy();
        expect(getByText(`Whenever it's ready, at 9pm.`)).toBeTruthy();

        expect(getByText('Into this account')).toBeTruthy();
        expect(getByText('Account Name\n246-579 1234567890')).toBeTruthy();

        expect(
          getByText(`You’ll pay a $6.00 fee, a total of $406.00 will be deducted from your payslip.`)
        ).toBeTruthy();
        expect(
          getByText(
            'By confirming, you agree to our Perks and Earned Wage Access Terms and Conditions for scheduled withdrawals. These transactions will show as a deduction on your payslip from Test Org.'
          )
        ).toBeTruthy();
        expect(getByText('Confirm')).toBeTruthy();
      });
    });
  });

  it('should open the T&C page if pressed on the text link', async () => {
    const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

    await waitFor(() => {
      fireEvent.press(getByText('Perks and Earned Wage Access Terms and Conditions'));
    });

    expect(mockedOpenUrl).toHaveBeenCalledWith(INSTAPAY_WITHDRAW_BY_AMOUNT_TNC_URL);
  });

  describe('successful scheduling subscription creation', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockCreateSchedulingSubscriptionMutation((_, res, ctx) => {
          return res(
            ctx.data({
              instapay: {
                createSchedulingSubscription: {
                  success: true,
                },
              },
            })
          );
        })
      );
    });

    it('should navigate to success screen', async () => {
      const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

      fireEvent.press(getByText('Confirm'));

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties({
            amount: 400,
            recurringType: 'by_amount',
          }),
          event: CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN,
        });
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingSuccess', {
          formattedAmount: '$400.00',
          orgId: '123',
          action: 'creation',
          payDay: '',
        });
      });
    });
  });

  describe('successful scheduling subscription modification', () => {
    beforeEach(() => {
      const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
      schedulingStore.current.setSubscriptionId('123');
      mockServerNode.use(
        mockUpdateSchedulingSubscriptionMutation((_, res, ctx) => {
          return res(
            ctx.data({
              instapay: {
                updateSchedulingSubscription: {
                  success: true,
                },
              },
            })
          );
        })
      );
    });

    it('should navigate to success screen', async () => {
      const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

      fireEvent.press(getByText('Confirm'));

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          ...mockedSharedIPSchedulingEventProperties({
            amount: 400,
            recurringType: 'by_amount',
          }),
          event: CLICKED_ON_CONFIRM_FROM_RECURRING_CREATION_CONFIRMATION_SCREEN,
        });
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingSuccess', {
          formattedAmount: '$400.00',
          action: 'byAmountModification',
          orgId: '123',
          payDay: '',
        });
      });
    });
  });

  describe('failed scheduling subscription creation', () => {
    it('should navigate to error screen if received 200 response but the success is set by server to be false', async () => {
      mockServerNode.use(
        mockCreateSchedulingSubscriptionMutation((_, res, ctx) => {
          return res(
            ctx.data({
              instapay: {
                createSchedulingSubscription: {
                  success: false,
                },
              },
            })
          );
        })
      );

      const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

      fireEvent.press(getByText('Confirm'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingError');
      });
    });

    it('should navigate to error screen if received failed status code while requesting creation', async () => {
      mockServerNode.use(
        mockCreateSchedulingSubscriptionMutation((_, res, ctx) => {
          return res(ctx.status(400), ctx.errors([{ message: 'Something went wrong' }]));
        })
      );

      const { getByText } = render(<InstaPaySchedulingConfirmationScreen />);

      fireEvent.press(getByText('Confirm'));

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingError');
      });
    });
  });
});
