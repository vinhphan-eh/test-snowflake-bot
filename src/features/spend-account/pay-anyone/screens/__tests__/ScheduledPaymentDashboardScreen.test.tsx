import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { regionLocalisationMockUtil } from '../../../../../../test-setup/utils/regionLocalisationMockUtil';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import type { ScheduledPayment } from '../../../../../new-graphql/generated';
import {
  ScheduledPaymentFrequency,
  ScheduledPaymentType,
  mockCancelScheduledPaymentMutation,
  mockGetActiveScheduledPaymentsQuery,
} from '../../../../../new-graphql/generated';
import { ScheduledPaymentDashboardScreen } from '../ScheduledPaymentDashboardScreen';

const mockScheduledPayment = {
  externalId: '123',
  type: ScheduledPaymentType.Recurring,
  description: 'Test Description', // Add description property
  startDate: '2022-01-01',
  endDate: '2022-12-31',
  frequency: ScheduledPaymentFrequency.Monthly,
  amount: {
    currency: 'AUD',
    units: 100,
  },
  createdAt: '2021-01-01',
  recipient: {
    accountName: 'John Doe',
    bsb: '123456',
    accountNumber: '123456789',
  },
} as ScheduledPayment;
describe('ScheduledPaymentDashboardScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    regionLocalisationMockUtil('AU');
  });
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<ScheduledPaymentDashboardScreen />);
    expect(getByTestId('scheduled-payment-list')).toBeDefined();
    expect(getByText('Managed scheduled payments')).toBeDefined();
  });

  it('should go back previous screen by using back chevron', async () => {
    const { getByTestId } = render(<ScheduledPaymentDashboardScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    await waitFor(() => {
      expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
    });
  });

  it('should render a message when there are no scheduled payments', async () => {
    mockServerNode.use(
      mockGetActiveScheduledPaymentsQuery((_, res, ctx) =>
        res(ctx.data({ me: { wallet: { auActiveScheduledPayments: [] } } }))
      )
    );
    const { getByTestId } = render(<ScheduledPaymentDashboardScreen />);

    await waitFor(() => {
      expect(getByTestId('no-scheduled-payments-message')).toBeDefined();
    });
  });

  it('should show warning when cancel a payment', async () => {
    mockServerNode.use(
      mockGetActiveScheduledPaymentsQuery((_, res, ctx) =>
        res(
          ctx.data({
            me: {
              wallet: {
                auActiveScheduledPayments: [mockScheduledPayment],
              },
            },
          })
        )
      )
    );

    const { getByTestId } = render(<ScheduledPaymentDashboardScreen />);

    await waitFor(() => {
      const cancelBtn = getByTestId('cancel-scheduled-payment');
      expect(cancelBtn).toBeDefined();
      fireEvent.press(cancelBtn);
    });

    await waitFor(() => {
      expect(getByTestId('confirm-cancelling-text')).toBeDefined();
      expect(getByTestId('cancelConfirm')).toBeDefined();
    });
  });

  it('should go to error screen if can not cancel a payment', async () => {
    mockServerNode.use(
      mockGetActiveScheduledPaymentsQuery((_, res, ctx) =>
        res(
          ctx.data({
            me: {
              wallet: {
                auActiveScheduledPayments: [mockScheduledPayment],
              },
            },
          })
        )
      ),
      mockCancelScheduledPaymentMutation((_, res, ctx) => res(ctx.errors([{ message: 'error' }])))
    );

    const { getByTestId } = render(<ScheduledPaymentDashboardScreen />);

    await waitFor(() => {
      const cancelBtn = getByTestId('cancel-scheduled-payment');
      expect(cancelBtn).toBeDefined();
      fireEvent.press(cancelBtn);
    });

    await waitFor(() => {
      const confirmBtn = getByTestId('cancelConfirm');
      fireEvent.press(confirmBtn);
      expect(mockedNavigate).toBeCalledWith('Error');
    });
  });
});
