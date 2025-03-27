import React from 'react';
import { mockedNavigate, mockedUseIsFocused } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../common/utils/testing';
import {
  BillStatus,
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  TxnType,
} from '../../../../../new-graphql/generated';
import { BillManagementDashboard } from '../BillManagementDashboard';

const mockTracking = jest.fn();
const mockTrackingPageVisit = jest.fn();
jest.mock('../../../hooks/useMoneyBillMgmtTracking', () => ({
  useMoneyBillMgmtTracking: () => ({
    trackClickBillSubscription: mockTracking,
    trackVisitMoneyBillPage: mockTrackingPageVisit,
  }),
}));

mockedUseIsFocused.mockReturnValue(true);

const mockFilteredData = [
  {
    node: {
      id: '123455',
      createdAt: '2023-05-24T00:00:00.000Z',
      updatedAt: '2023-05-24T00:00:00.000Z',
      status: SubscriptionStatus.Active,
      subscriptionType: SubscriptionType.Electricity,
      provider: {
        id: Pid.SimplyEnergy,
        name: 'ENGIE',
      },
      totalSaved: {
        amount: 96,
        currency: Currency.Aud,
      },
    },
  },
  {
    node: {
      id: '123456',
      createdAt: '2023-05-24T00:00:00.000Z',
      updatedAt: '2023-05-24T00:00:00.000Z',
      status: SubscriptionStatus.Active,
      subscriptionType: SubscriptionType.Gas,
      provider: {
        id: Pid.SimplyEnergy,
        name: 'ENGIE',
      },
      totalSaved: {
        amount: 96,
        currency: Currency.Aud,
      },
    },
  },
];

const mockFilteredDataWithOverdue = [
  {
    node: {
      id: '123455',
      createdAt: '2023-05-24T00:00:00.000Z',
      updatedAt: '2023-05-24T00:00:00.000Z',
      status: SubscriptionStatus.Active,
      subscriptionType: SubscriptionType.Electricity,
      provider: {
        id: Pid.SimplyEnergy,
        name: 'ENGIE',
      },
      latestBill: {
        id: '123',
        createdAt: '123',
        amount: {
          amount: 123,
          currency: Currency.Aud,
        },
        issueDate: '',
        dateFrom: '',
        dateTo: '',
        dueDate: '',
        status: BillStatus.Overdue,
        type: TxnType.Bill,
        transactionDate: '',
      },
      totalSaved: {
        amount: 96,
        currency: Currency.Aud,
      },
    },
  },
];

describe('BillManagementDashboard', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BillManagementDashboard filteredData={mockFilteredData} />);

    expect(getByText('Electricity')).toBeTruthy();
    expect(getByText('Gas')).toBeTruthy();
  });

  it('should render correctly with overdue alert', () => {
    const { getByTestId, getByText } = render(<BillManagementDashboard filteredData={mockFilteredDataWithOverdue} />);

    expect(getByText('You have 1 overdue payment')).toBeTruthy();
    expect(getByTestId('overdue-alert')).toBeTruthy();
  });

  it('should work correctly when clicking onto a subscription', () => {
    const { getByTestId } = render(<BillManagementDashboard filteredData={mockFilteredData} />);

    fireEvent.press(getByTestId('123456'));

    expect(mockTracking).toBeCalledWith({
      planType: 'GAS',
      provider: 'ENGIE',
    });
    expect(mockedNavigate).toBeCalledWith('BillManagementMoney', {
      screen: 'BillingActivity',
      params: {
        subscription: expect.anything(),
      },
    });
  });
});
