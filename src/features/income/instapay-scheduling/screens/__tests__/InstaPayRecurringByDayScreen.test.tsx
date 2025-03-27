import React from 'react';

import { useRoute, type ParamListBase, type RouteProp } from '@react-navigation/native';
import dayjs from 'dayjs';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render, renderHook, waitFor, fireEvent, act } from '../../../../../common/utils/testing';
import {
  CurrencyType,
  PayCycle,
  RecurringByDayPayCycle,
  RecurringSubscriptionStatus,
  Sign,
  useGetInstaPayRecurringByDayPreviewQuery,
  Weekday,
} from '../../../../../new-graphql/generated';
import { useInstaPayAvailableBalances } from '../../../instapay/hooks/useInstaPayAvailableBalances';
import { MAX_RECURRING_BY_DAY_AMOUNT } from '../../constants';
import { useGetCreatableOrgs } from '../../hooks/useGetCreatableOrgs';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import { InstaPayRecurringByDayScreen } from '../InstaPayRecurringByDayScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetInstaPayRecurringByDayPreviewQuery: jest.fn(),
}));

jest.mock('../../../instapay/hooks/useInstaPayAvailableBalances', () => ({
  useInstaPayAvailableBalances: jest.fn(),
}));

jest.mock('../../hooks/useGetCreatableOrgs', () => ({
  useGetCreatableOrgs: jest.fn(),
}));

describe('InstaPayRecurringByDayScreen', () => {
  beforeEach(() => {
    act(() => {
      mockedUseRoute.mockReturnValue({
        params: { action: 'creation' },
      } as RouteProp<ParamListBase, 'string'>);
      const mockOrgs = [{ getId: () => 'kpOrg1' }, { getId: () => 'ehOrg2' }, { getId: () => 'ableToCreateOrg' }];

      (useInstaPayAvailableBalances as jest.Mock).mockReturnValue({ isLoading: false, orgs: mockOrgs });

      (useGetCreatableOrgs as jest.Mock).mockReturnValue({
        isLoading: false,
        creatableOrgIds: ['ableToCreateOrg'],
      });

      (useGetInstaPayRecurringByDayPreviewQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            org: {
              recurringByDay: {
                preview: {
                  __typename: 'RecurringByDayPreview',
                  estimatedBalances: [
                    {
                      date: '2023-10-10T00:00:00Z',
                      amount: {
                        units: 13,
                        subUnits: 0,
                        type: 'CURRENCY_TYPE_AUD',
                        sign: 'POSITIVE',
                      },
                    },
                  ],
                  payPeriod: {
                    starting: '2023-10-10',
                    ending: '2023-10-10',
                    paymentDate: '2023-10-10', // Tuesday
                  },
                },
              },
            },
          },
        },
        isLoading: false,
      });
    });
  });

  describe('NOT MONTHLY employee', () => {
    it('renders correctly', async () => {
      const { getByTestId, getByText, queryByTestId } = render(<InstaPayRecurringByDayScreen />);
      await waitFor(() => {
        expect(getByText('Confirm'));
        expect(queryByTestId('pay-cycle-selection')).toBeFalsy();
      });

      fireEvent.press(getByTestId('day-selection'));

      await waitFor(() => {
        expect(getByTestId('Tuesday-recommended'));
        expect(getByText('$13 Available'));
      });
    });

    it('sets the correct day', async () => {
      const { result: scheduledStore } = renderHook(() => useInstaPaySchedulingStore());
      const { getByTestId } = render(<InstaPayRecurringByDayScreen />);

      await waitFor(() => {
        expect(getByTestId('day-selection'));
      });

      fireEvent.press(getByTestId('day-selection'));
      fireEvent.press(getByTestId('Monday-option'));

      await waitFor(() => {
        expect(scheduledStore.current.payDay).toBe(Weekday.Monday);
      });
    });

    it('sets the correct default value on create flow', async () => {
      const { result: scheduledStore } = renderHook(() => useInstaPaySchedulingStore());

      render(<InstaPayRecurringByDayScreen />);

      await waitFor(() => {
        expect(scheduledStore.current.minAmount).toBe(0);
        expect(scheduledStore.current.maxAmount).toBe(MAX_RECURRING_BY_DAY_AMOUNT);
        expect(scheduledStore.current.payDay).toBe(Weekday.Monday);
        expect(scheduledStore.current.membership?.getId()).toBe('ableToCreateOrg');
      });
    });
  });

  describe('MONTHLY employee', () => {
    beforeEach(() => {
      (useGetInstaPayRecurringByDayPreviewQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            org: {
              recurringByDay: {
                preview: {
                  __typename: 'RecurringByDayPreview',
                  memberPayCycleV2: PayCycle.Monthly,
                  supportedPayCycles: [
                    RecurringByDayPayCycle.RecurringByDayFortnightly,
                    RecurringByDayPayCycle.RecurringByDayWeekly,
                  ],
                  estimatedBalances: [
                    {
                      date: '2023-10-10T00:00:00Z',
                      amount: {
                        units: 13,
                        subUnits: 0,
                        type: 'CURRENCY_TYPE_AUD',
                        sign: 'POSITIVE',
                      },
                    },
                  ],
                  payPeriod: {
                    starting: '2023-10-10',
                    ending: '2023-10-10',
                    paymentDate: '2023-10-10', // Tuesday
                  },
                },
              },
            },
          },
        },
        isLoading: false,
      });
    });

    it('renders correctly', async () => {
      const { getByTestId, getByText, queryByTestId } = render(<InstaPayRecurringByDayScreen />);
      await waitFor(() => {
        expect(getByTestId('pay-cycle-selection'));
        expect(getByTestId('starting-date-selection'));
        expect(queryByTestId('day-selection')).toBeFalsy();
        expect(
          getByText(
            "We recommend scheduling for Tuesday, as that's typically when your employer pays you. Please note only weekdays are allowed."
          )
        );
      });
    });

    it('sets the correct default value on create flow', async () => {
      const { result: scheduledStore } = renderHook(() => useInstaPaySchedulingStore());

      render(<InstaPayRecurringByDayScreen />);
      const nextDay = dayjs().add(1, 'day');

      await waitFor(() => {
        expect(scheduledStore.current.minAmount).toBe(0);
        expect(scheduledStore.current.maxAmount).toBe(MAX_RECURRING_BY_DAY_AMOUNT);
        expect(scheduledStore.current.membership?.getId()).toBe('ableToCreateOrg');
        expect(scheduledStore.current.payDay).toBe(nextDay.format('dddd').toUpperCase());
      });
    });
  });

  it('navigates to error screen on error', async () => {
    (useGetCreatableOrgs as jest.Mock).mockImplementation(options => {
      options.onError(new Error('Mock error'));
      return { data: null, error: new Error('Mock error'), isLoading: false };
    });

    render(<InstaPayRecurringByDayScreen />);
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingError');
    });
  });

  it('navigates to bank account selection on submit', async () => {
    const { getByText } = render(<InstaPayRecurringByDayScreen />);
    await waitFor(() => {
      expect(getByText('Confirm'));
    });
    fireEvent.press(getByText('Confirm'));
    expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
      screen: 'InstaPaySchedulingBankAccountSelection',
    });
  });

  it('navigates back', async () => {
    const { getByTestId, getByText } = render(<InstaPayRecurringByDayScreen />);
    await waitFor(() => {
      expect(getByText('Confirm'));
    });
    fireEvent.press(getByTestId('topbar-back-icon'));
    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('sets the correct amount', async () => {
    const { result: scheduledStore } = renderHook(() => useInstaPaySchedulingStore());
    const { getByTestId, getByText } = render(<InstaPayRecurringByDayScreen />);

    await waitFor(() => {
      expect(getByTestId('amount-selection'));
    });

    fireEvent.press(getByTestId('amount-selection'));
    fireEvent.press(getByText('$100-$150'));

    await waitFor(() => {
      expect(scheduledStore.current.minAmount).toBe(100);
      expect(scheduledStore.current.maxAmount).toBe(150);
    });
  });

  it('sets the correct default value on edit flow', async () => {
    mockedUseRoute.mockReturnValue({
      params: { action: 'modification' },
    } as RouteProp<ParamListBase, 'string'>);

    const { result: scheduledStore } = renderHook(() => useInstaPaySchedulingStore());
    const mockCurrentSubscription = {
      minimumPayAmount: { units: 100, type: CurrencyType.CurrencyTypeAud, subUnits: 0, sign: Sign.Positive },
      maximumPayAmount: { units: 150, type: CurrencyType.CurrencyTypeAud, subUnits: 0, sign: Sign.Positive },
      payDay: Weekday.Wednesday,
      bankAccountExternalId: '123',
      status: RecurringSubscriptionStatus.Active,
      minPayAmount: 100,
      maxPayAmount: 150,
      id: '1',
      organisationId: 'kpOrg1',
    };

    act(() => {
      scheduledStore.current.setCurrentByDaySubscription(mockCurrentSubscription);
    });

    render(<InstaPayRecurringByDayScreen />);

    await waitFor(() => {
      expect(scheduledStore.current.minAmount).toBe(100);
      expect(scheduledStore.current.maxAmount).toBe(150);
      expect(scheduledStore.current.payDay).toBe(Weekday.Wednesday);
      expect(scheduledStore.current.membership?.getId()).toBe('kpOrg1');
    });
  });
});
