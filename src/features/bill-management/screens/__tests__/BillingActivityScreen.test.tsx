import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../common/types/react-query';
import { render, fireEvent } from '../../../../common/utils/testing';
import type { GetSubscriptionDetailQuery, GetSubscriptionTransactionsQuery } from '../../../../new-graphql/generated';
import {
  BillStatus,
  Currency,
  Pid,
  SubscriptionStatus,
  SubscriptionType,
  TxnType,
  useGetSubscriptionDetailQuery,
  useInfiniteGetSubscriptionTransactionsQuery,
} from '../../../../new-graphql/generated';
import { BillingActivityScreen } from '../BillingActivityScreen';

const mockUseGetSubscriptionTransactionQuery = useInfiniteGetSubscriptionTransactionsQuery as unknown as jest.Mock<
  MockQueryResult<{ pages: Array<GetSubscriptionTransactionsQuery> }>
>;

const mockUseGetSubscriptionDetailQuery = useGetSubscriptionDetailQuery as unknown as jest.Mock<
  MockQueryResult<GetSubscriptionDetailQuery>
>;
(mockUseGetSubscriptionTransactionQuery as unknown as { getKey: () => string }).getKey = jest.fn();
(mockUseGetSubscriptionDetailQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

jest.mock('../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../new-graphql/generated'),
  useInfiniteGetSubscriptionTransactionsQuery: jest.fn(),
  useGetSubscriptionDetailQuery: jest.fn(),
}));

const mockOpenUrl = jest.fn();
jest.mock('../../../../common/shared-hooks/useInAppBrowser', () => ({
  useInAppBrowser: () => ({
    openUrl: mockOpenUrl,
  }),
}));

const mockTracking = jest.fn();
const mockTrackingPayment = jest.fn();

jest.mock('../../hooks/useMoneyBillMgmtTracking', () => ({
  useMoneyBillMgmtTracking: () => ({
    trackVisitBillingInfoPage: mockTracking,
    trackClickMakePayment: mockTrackingPayment,
  }),
}));

jest.mock('../../../../common/stores/useSessionStore');

const mockSubscriptionDetailQueryData = {
  id: '123455',
  createdAt: '2023-05-24T00:00:00.000Z',
  updatedAt: '2023-05-24T00:00:00.000Z',
  status: SubscriptionStatus.Active,
  subscriptionType: SubscriptionType.Electricity,
  provider: {
    id: Pid.SimplyEnergy,
    name: 'Simply Energy',
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
};

const mockSubscriptionDetailWithoutLastBillData = {
  id: '123455',
  createdAt: '2023-05-24T00:00:00.000Z',
  updatedAt: '2023-05-24T00:00:00.000Z',
  status: SubscriptionStatus.Active,
  subscriptionType: SubscriptionType.Electricity,
  provider: {
    id: Pid.SimplyEnergy,
    name: 'Simply Energy',
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
};

const mockUseGetSubscriptionTransactionQueryData: GetSubscriptionTransactionsQuery = {
  me: {
    billManagement: {
      subscription: {
        transactions: {
          pageInfo: {
            hasNextPage: false,
          },
          edges: [
            {
              node: {
                id: '',
                createdAt: '2023-05-24T00:00:00.000Z',
                type: TxnType.Bill,
                issueDate: '2023-05-24T00:00:00.000Z',
                dateFrom: '2023-05-23T00:00:00.000Z',
                dateTo: '2023-05-24T00:00:00.000Z',
                dueDate: '2023-05-24T00:00:00.000Z',
                status: BillStatus.Due,
                transactionDate: '2023-05-24T00:00:00.000Z',
                amount: {
                  amount: 2.2,
                  currency: Currency.Aud,
                },
              },
            },
          ],
        },
      },
    },
  },
};

describe('BillingActivityScreen', () => {
  beforeEach(() => {
    mockUseGetSubscriptionTransactionQuery.mockReturnValue({
      data: { pages: [mockUseGetSubscriptionTransactionQueryData] },
    });

    mockUseGetSubscriptionDetailQuery.mockReturnValue({
      data: {
        me: {
          billManagement: {
            subscription: mockSubscriptionDetailQueryData,
          },
        },
      },
      isLoading: false,
      isError: false,
    });

    mockUseRoute.mockReturnValue({
      params: {
        subscription: mockSubscriptionDetailQueryData,
      },
      key: '',
      name: '',
    });
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<BillingActivityScreen />);

    expect(getByText('Total saved')).toBeTruthy();
    expect(getByText('Contact ENGIE')).toBeTruthy();
    expect(getByText('$123')).toBeTruthy();
    expect(getByText('$96')).toBeTruthy();
    expect(getByText('$2.20')).toBeTruthy();
    expect(getByText('Bill period: 23 May 2023 - 24 May 2023')).toBeTruthy();
  });

  it('should render correctly without last bill', () => {
    mockUseRoute.mockReturnValue({
      params: {
        subscription: mockSubscriptionDetailWithoutLastBillData,
      },
      key: '',
      name: '',
    });
    mockUseGetSubscriptionDetailQuery.mockReturnValue({
      data: {
        me: {
          billManagement: {
            subscription: mockSubscriptionDetailWithoutLastBillData,
          },
        },
      },
      isLoading: false,
      isError: false,
    });
    const { getByText } = render(<BillingActivityScreen />);

    expect(getByText('Total saved')).toBeTruthy();
    expect(getByText('Contact ENGIE')).toBeTruthy();
  });

  it('should track visit page', () => {
    render(<BillingActivityScreen />);
    expect(mockTracking).toBeCalledWith({
      planType: 'ELECTRICITY',
      provider: 'Simply Energy',
    });
  });

  it('should work correctly when making payment', () => {
    const { getByText } = render(<BillingActivityScreen />);

    fireEvent.press(getByText('Make Payment'));

    expect(mockOpenUrl).toBeCalledWith('https://www.engie.com.au/help-centre/pay-my-bill');
    expect(mockTrackingPayment).toBeCalledWith({
      planType: 'ELECTRICITY',
      provider: 'Simply Energy',
    });
  });

  it('should open url when click on FAQs', () => {
    const { getByText } = render(<BillingActivityScreen />);

    fireEvent.press(getByText('Visit our FAQs'));

    expect(mockOpenUrl).toHaveBeenCalledWith('https://swagapp.zendesk.com/hc/en-au/articles/7336570246543');
  });

  it('should open url when click on FAQs with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<BillingActivityScreen />);

    fireEvent.press(getByText('Visit our FAQs'));

    expect(mockOpenUrl).toHaveBeenCalledWith(
      'https://workhelp.employmenthero.com/hc/en-au/articles/7336570246543-Bill-Management-FAQs-via-benefits'
    );
  });
});
